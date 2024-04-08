import pickle

from fastapi import APIRouter
from api.models import Question, List_of_str

task_router = APIRouter()

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
    readed_list = pickle.load(file2)  # десереализация
    file2.close()
    return readed_list


# @task_router.post("/script/write_to_file")
# async def write_to_file():
#     return {"message": "Hello World"}


@task_router.get("/script/read_test_from_file")
async def read():
    questions = read_file_test("data/files/test.txt")
    for i in questions:
        i.right_answers = []
    return questions


@task_router.post("/script/add_question")
async def add_question(new_question: Question):
    write_new_in_file("data/files/test.txt", new_question)
    return {"status": 200, "Message": "new question added"}


@task_router.post("/script/delete_question")
async def delete_question(num: int):
    delete_from_file("data/files/test.txt", num)
    return {"status": 200, "Message": "question deleted"}


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

    total_counter = len(right_answer_list)
    grade = counter / total_counter * 100
    # сразу записать в бд, тут не отдавать

    return grade

# @task_router.get("/script/get_result", response_model=int)
# async def get_result(practice_id: int):
#     #зову функцию по поиску записи о задании
#     #вычленяю оценку из списочка
#     #отдаю оценочку
#     return 1
