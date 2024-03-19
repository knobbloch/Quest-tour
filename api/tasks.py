import pickle

from fastapi import APIRouter
from api.models import Question, List_of_str

task_router = APIRouter()

object = Question(question="Ты gay?", answers=["yes", "yess", "yess", "no", "?"],
                  right_answers=[0, 1, 2])  # первый обьект
object2 = Question(question="your mama gay?", answers=["yes", "yess", "-", "no", "?"],
                   right_answers=[0, 1])  # второй обьект
object3 = Question(question="Am I gay?", answers=["of course", "why", "14"], right_answers=[2])

list_object = [object, object2, object3]  # список

file = open("data/files/test.txt", "wb")  # запись в файл
pickle.dump(list_object, file)  # сереализация
file.close()


def read_file_test(path: str):
    file2 = open(path, "rb")
    readed_list = pickle.load(file2)  # десереализация
    file2.close()
    return readed_list


@task_router.post("/script/write_to_file")
async def write_to_file():
    return {"message": "Hello World"}


@task_router.get("/script/read_test_from_file")
async def read():
    questions = read_file_test("data/files/test.txt")
    for i in questions:
        i.right_answers = []
    return questions


@task_router.post("/script/test_post")
async def test(text: List_of_str):
    return text


@task_router.post("/script/send_answers", response_model=int)
async def send_answer(answer_list: List_of_str):
    right_answer_list = []
    counter = 0
    questions = read_file_test("data/files/test.txt")
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
