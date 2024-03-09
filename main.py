from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
from starlette.staticfiles import StaticFiles

app = FastAPI()

file = open("data/test.txt", "r", encoding="UTF-8")

class Question(BaseModel):
    question: str
    answers: list
    right_answer: str

quests = []
for i in file:
    line = i[:-1].split(";%")
    quest = {"question": line[0], "answers": line[1:len(line) - 1], "right_answer": line[-1]}
    quests.append(quest)


@app.get("/script/meow")
async def root():
    return {"message": "meow"}


@app.get("/script/test/{q_id}", response_model=Question)
async def quest(id: int):
    return quests[id]


app.mount("/", StaticFiles(directory="front", html=True), name="front")

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
