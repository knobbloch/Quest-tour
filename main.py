from typing import List

from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
from starlette.staticfiles import StaticFiles
import pickle
from question import Question

app = FastAPI()

object = Question("Ты gay?", ["yes", "yess", "yess", "no", "?"], [0, 1, 2])  # первый обьект
# pickled_object = pickle.dumps(object)  # сереализация к виду x80\\x04\\x95j\\x00\\x00\\x00\\x00\\x00\\x00
# unpickled_object = pickle.loads(pickled_object)  # десереализация
object2 = Question("your mama gay?", ["yes", "yess", "-", "no", "?"], [0, 1])  # второй обьект
object3 = Question("Am I gay?", ["of course", "why", "14"], [2])

list_object = [object, object2, object3]  # список

file = open("data/test.txt", "wb")  # запись в файл
pickle.dump(list_object, file)  # сереализация
file.close()


class List_of_str(BaseModel):
    sections: List[str]


@app.get("/script")
async def root():
    return {"message": "Hello World"}


@app.post("/script/write_to_file")
async def write_to_file():
    return {"message": "Hello World"}


# @app.get("/script/read_from_file")
# async def read_file():
#     file2 = open("data/test.txt", "rb")
#     readed_list = pickle.load(file2)  # десереализация
#     file2.close()
#     return {"message": readed_list[0].question, "message2": readed_list[1].question}


def read_file_test(path: str):
    file2 = open(path, "rb")
    readed_list = pickle.load(file2)  # десереализация
    file2.close()
    return readed_list


@app.get("/script/read_test_from_file")
async def read():
    questions = read_file_test("data/test.txt")
    for i in questions:
        i.right_answers = []
    return questions


@app.post("/script/test_post")
async def test(text: List_of_str):
    return text


@app.post("/script/send_answers", response_model=int)
async def send_answer(answer_list: List_of_str):
    right_answer_list = []
    counter = 0
    questions = read_file_test("data/test.txt")
    new_answers = []
    print(answer_list.sections)
    for i in answer_list.sections:
        answer = i.split(", ")
        for j in range(0, len(answer)):
            answer[j] = int(answer[j])
        new_answers.append(answer)
    print(new_answers)

    for i in questions:
        right_answer_list.append(i.right_answers)

    for i in range(0, len(right_answer_list)):
        if new_answers[i] == right_answer_list[i]:
            counter += 1

    return counter


app.mount("/", StaticFiles(directory="front", html=True), name="front")
