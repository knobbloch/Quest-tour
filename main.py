from fastapi import FastAPI, APIRouter
from starlette.staticfiles import StaticFiles

from api.practices import practice_router
from api.tasks import task_router
from api.db_main import db_router
from api.users import user_router

app = FastAPI()

@app.get("/script")
async def root():
    return {"message": "Hello World"}

main_router = APIRouter()
main_router.include_router(task_router)
main_router.include_router(db_router)
main_router.include_router(user_router)
main_router.include_router(practice_router)
app.include_router(main_router)

app.mount("/", StaticFiles(directory="front", html=True), name="front")
