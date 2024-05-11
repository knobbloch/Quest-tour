from fastapi import FastAPI, APIRouter
from starlette.staticfiles import StaticFiles
from starlette.responses import FileResponse
from api.auth import auth_router
from api.lectures import lecture_router
from api.map import map_router
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
main_router.include_router(lecture_router)
main_router.include_router(auth_router)
main_router.include_router(map_router)
app.include_router(main_router)

@app.get('/')
async def index():
    return FileResponse('front/auth.html')

app.mount("/", StaticFiles(directory="front", html=True), name="front")
