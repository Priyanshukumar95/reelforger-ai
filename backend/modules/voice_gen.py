# backend/modules/voice_gen.py
from elevenlabs.client import ElevenLabs
import pathlib, logging
from config import settings

log = logging.getLogger("VoiceGen")

_client = None

def get_client() -> ElevenLabs:
    global _client
    if _client is None:
        _client = ElevenLabs(api_key=settings.ELEVENLABS_API_KEY)
    return _client

def generate_voice(script: dict, job_id: str) -> str:
    """Convert script dict → MP3 file → return path."""
    text = " ".join([
        script.get("hook", ""),
        script.get("body", ""),
        script.get("cta", ""),
    ]).strip()

    if not text:
        raise ValueError("Script text is empty")

    out_dir = pathlib.Path(settings.MEDIA_DIR) / "audio"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"{job_id}.mp3"

    client = get_client()
    audio_gen = client.generate(
        text=text,
        voice=settings.ELEVENLABS_VOICE_ID,
        model="eleven_multilingual_v2",
    )

    with open(out_path, "wb") as f:
        for chunk in audio_gen:
            if chunk:
                f.write(chunk)

    log.info(f"[Voice] Saved: {out_path}")
    return str(out_path)