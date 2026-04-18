from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str
    ANTHROPIC_API_KEY: str
    ELEVENLABS_API_KEY: str
    ELEVENLABS_VOICE_ID: str = "21m00Tcm4TlvDq8ikWAM"
    REDIS_URL: str = "redis://localhost:6379"
    DATABASE_URL: str = "sqlite:///./reelforge.db"
    DAILY_PUBLISH_TIME: str = "18:00"
    MEDIA_DIR: str = "./media"
    OUTPUT_DIR: str = "./output"
    MAX_REELS_PER_DAY: int = 3
    TREND_INTERVAL_MINUTES: int = 15

    class Config:
        env_file = ".env"

settings = Settings()