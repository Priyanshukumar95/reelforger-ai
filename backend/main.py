from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import redis, json
from config import settings
from db.database import init_db, get_session
from modules.trend_hunter import fetch_all_trends


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="ReelForge API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
r = redis.from_url(settings.REDIS_URL, decode_responses=True)
clients: list[WebSocket] = []


@app.get("/api/stats")
async def get_stats():
    total = r.llen("review_queue") + r.llen("approved_queue")
    pending = r.llen("review_queue")
    published = r.llen("approved_queue")
    failed = 0
    return {
        "total": total,
        "pending": pending,
        "published": published,
        "failed": failed,
    }


@app.get("/api/queue")
async def get_queue():
    items = r.lrange("review_queue", 0, -1)
    return [json.loads(i) for i in items]


@app.post("/api/jobs/{job_id}/approve")
async def approve(job_id: str):
    items = r.lrange("review_queue", 0, -1)
    for item in items:
        j = json.loads(item)
        if j["id"] == job_id:
            j["status"] = "approved"
            r.lrem("review_queue", 0, item)
            r.lpush("approved_queue", json.dumps(j))
            await broadcast({"type": "approved", "id": job_id})
            return {"ok": True}
    return {"ok": False, "error": "Not found"}


@app.post("/api/jobs/{job_id}/reject")
async def reject(job_id: str):
    items = r.lrange("review_queue", 0, -1)
    for item in items:
        j = json.loads(item)
        if j["id"] == job_id:
            r.lrem("review_queue", 0, item)
            return {"ok": True}
    return {"ok": False}


@app.post("/api/pipeline/trigger")
async def trigger():
    import asyncio

    asyncio.create_task(asyncio.to_thread(fetch_all_trends))
    return {"ok": True, "msg": "Pipeline triggered"}


# --- Schedule endpoints (used by Member 3's Settings page) ---
from db.models import Schedule


@app.get("/api/schedule")
async def get_schedule():
    with get_session() as db:
        s = db.query(Schedule).first()
        return {
            "publish_time": s.publish_time,
            "max_per_day": s.max_per_day,
        }


@app.post("/api/schedule")
async def set_schedule(data: dict):
    with get_session() as db:
        s = db.query(Schedule).first()
        if data.get("publish_time"):
            s.publish_time = data["publish_time"]
        if data.get("max_per_day"):
            s.max_per_day = int(data["max_per_day"])
        db.commit()
    return {"ok": True}


@app.websocket("/ws")
async def ws_endpoint(ws: WebSocket):
    await ws.accept()
    clients.append(ws)
    try:
        while True:
            await ws.receive_text()
    except WebSocketDisconnect:
        clients.remove(ws)


async def broadcast(data: dict):
    dead = []
    for c in clients:
        try:
            await c.send_json(data)
        except:
            dead.append(c)
    for d in dead:
        clients.remove(d)


# Run with: uvicorn main:app --reload --port 8000
