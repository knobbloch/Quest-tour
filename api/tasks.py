import pickle
import os

from fastapi import APIRouter, Cookie

from api.auth import COOKIE_SESSION_ID_KEY, is_accessible, Access
from api.db_main import edit_practice_res
from api.models import Question, ListOfStr

task_router = APIRouter(prefix="/script", tags=["Task functions (for test practices)"])


# object = Question(question="Ты gay?", answers=["yes", "yess", "yess", "no", "?"],
#                   right_answers=[0, 1, 2])  # первый обьект
# object2 = Question(question="your mama gay?", answers=["yes", "yess", "-", "no", "?"],
#                    right_answers=[0, 1])  # второй обьект
# object3 = Question(question="Am I gay?", answers=["of course", "why", "14"], right_answers=[2])
#
# list_object = [object, object2, object3]  # список


def write_new_in_file(path: str, question: Question):
    q_list = read_file_test(path)
    q_list.append(question)
    file = open(path, "wb")  # запись в файл
    pickle.dump(q_list, file)  # сереализация
    file.close()
    return


def delete_from_file(path: str, num: int):
    q_list = read_file_test(path)
    q_list.pop(num)
    file = open(path, "wb")  # запись в файл
    pickle.dump(q_list, file)  # сереализация
    file.close()
    return


# file = open("data/files/test.txt", "wb")  # запись в файл
# pickle.dump(list_object, file)  # сереализация
# file.close()


def read_file_test(path: str):
    file2 = open(path, "rb")
    if os.stat(path).st_size == 0:
        readed_list = []
    else:
        readed_list = pickle.load(file2)  # десереализация
    file2.close()
    return readed_list


# @task_router.post("/script/write_to_file")
# async def write_to_file():
#     return {"message": "Hello World"}


@task_router.get("/read_test_from_file")
async def read(p_id: int, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    print(session_id)
    email = is_accessible(Access.ALL, session_id)
    print(email)
    if email == "":
        return {"status": 401, "Message": "Unauthorized"}
    questions = read_file_test("data/test/practice_" + str(p_id) + ".txt")
    for i in questions:
        i.right_answers = []
    return questions


@task_router.post("/add_question")
async def add_question(new_question: Question, p_id: int, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    write_new_in_file("data/test/practice_" + str(p_id) + ".txt", new_question)
    return {"status": 201, "Message": "new question added"}


@task_router.delete("/delete_question")
async def delete_question(num: int, p_id: int, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    delete_from_file("data/test/practice_" + str(p_id) + ".txt", num)
    return {"status": 205, "Message": "question deleted"}


@task_router.post("/send_answers")
async def send_answer(p_id: int, answer_list: ListOfStr, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ALL, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    right_answer_list = []
    counter = 0
    questions = read_file_test("data/test/practice_" + str(p_id) + ".txt")
    new_answers = []
    for i in answer_list.sections:
        answer = i.split(", ")
        for j in range(0, len(answer)):
            answer[j] = int(answer[j])
        new_answers.append(answer)

    for i in questions:
        right_answer_list.append(i.right_answers)

    for i in range(0, len(right_answer_list)):
        if new_answers[i] == right_answer_list[i]:
            counter += 1

    total_counter = len(right_answer_list)
    grade1 = int(counter / total_counter * 100)
    if edit_practice_res(p_id, email, grade1):
        return {'status': 202, 'Message': 'answers sent'}
    else:
        return {'status': 500, 'Message': 'an error occurred!'}

# @task_router.get("/script/get_result", response_model=int)
# async def get_result(practice_id: int):
#     #зову функцию по поиску записи о задании
#     #вычленяю оценку из списочка
#     #отдаю оценочку
#     return 1
