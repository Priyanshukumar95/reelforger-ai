FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    ffmpeg imagemagick libmagic1 \
    fonts-dejavu-core \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN python -c "import whisper; whisper.load_model('base')"
COPY . .
EXPOSE 8000