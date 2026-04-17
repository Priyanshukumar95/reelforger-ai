# backend/modules/video_editor.py
from moviepy.editor import (
    ImageClip, AudioFileClip,
    concatenate_videoclips, CompositeVideoClip, TextClip
)
from moviepy.video.tools.subtitles import SubtitlesClip
import whisper, pathlib, logging
from config import settings

log = logging.getLogger("VideoEditor")

_whisper_model = None

def get_whisper():
    global _whisper_model
    if _whisper_model is None:
        _whisper_model = whisper.load_model("base")
    return _whisper_model

def add_captions(video, audio_path: str):
    model = get_whisper()
    result = model.transcribe(audio_path, fp16=False)
    subs = [
        (seg["start"], seg["end"], seg["text"].strip())
        for seg in result["segments"]
    ]

    def make_caption(txt):
        return TextClip(
            txt, fontsize=44, font="DejaVu-Sans-Bold",
            color="white", stroke_color="black",
            stroke_width=2, size=(900, None), method="caption",
        )

    sub_clip = SubtitlesClip(subs, make_caption)
    return CompositeVideoClip([
        video,
        sub_clip.set_pos(("center", 0.75), relative=True),
    ])

def create_reel(job: dict) -> str:
    images     = job["image_paths"]
    audio_path = job["audio_path"]
    job_id     = job["id"]
    duration   = 30

    audio    = AudioFileClip(audio_path)
    dur_each = duration / max(len(images), 1)
    clips    = []

    for img_path in images:
        c = (ImageClip(img_path)
             .set_duration(dur_each)
             .resize((1080, 1920))
             .fadein(0.3).fadeout(0.3))
        c = c.resize(lambda t: 1 + 0.02 * t)  # Ken Burns zoom effect
        clips.append(c)

    video = concatenate_videoclips(clips, method="compose")
    video = video.set_audio(audio.set_duration(duration))
    video = add_captions(video, audio_path)

    out = pathlib.Path(settings.OUTPUT_DIR)
    out.mkdir(exist_ok=True)
    out_path = str(out / f"{job_id}.mp4")

    video.write_videofile(
        out_path, fps=30, codec="libx264",
        audio_codec="aac", bitrate="4000k",
        logger=None,
    )
    log.info(f"[Editor] Done: {out_path}")
    return out_path