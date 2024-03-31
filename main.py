from fastapi import FastAPI, APIRouter
from starlette.staticfiles import StaticFiles
from api.tasks import task_router
from api.db_main import db_router

app = FastAPI()

@app.get("/script")
async def root():
    return {"message": "Hello World"}

main_router = APIRouter()
main_router.include_router(task_router)
main_router.include_router(db_router)
app.include_router(main_router)

app.mount("/", StaticFiles(directory="front", html=True), name="front")
