from fastapi import FastAPI
import uvicorn
from starlette.staticfiles import StaticFiles


app = FastAPI()


@app.get("/script")
async def root():
    return {"message": "Hello World"}

app.mount("/", StaticFiles(directory="front", html=True), name="front")

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)