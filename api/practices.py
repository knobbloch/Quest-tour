from fastapi import APIRouter

from api import db_main
import os

from api.db_main import get_practice_res, edit_practice_res
from api.debugging import get_all_practices
from api.models import Practice, Grade

practice_router = APIRouter()


@practice_router.post("/script/create_practice")
async def create_practice(practice: Practice):
    p_id = db_main.new_practice(practice.title, practice.orderc, practice.testornot, practice.description)
    if p_id:
        if practice.testornot:
            file = open("data/test/practice_" + str(p_id) + ".txt", 'wb')
            file.close()
        return {'status': 200, 'Message': f'new practice added'}
    else:
        return {'status': 500, 'Message': 'an error occurred'}


@practice_router.get("/script/get_practice")
async def get_practice(p_id: int):
    practice = db_main.get_practice(p_id)
    if practice == [] or not practice:
        return {'Message': 'practice not found'}
    else:
        practice_obj = Practice(id=practice[0], title=practice[1], description=practice[2], testornot=practice[3],
                                orderc=practice[4])
        return practice_obj


@practice_router.put("/script/edit_practice")
async def edit_practice(p_id: int, new_title: str = None, new_description: str = None):
    if db_main.edit_practice(p_id, new_title, new_description):
        return {'status': 200, 'Message': f'practice №{p_id} edited'}
    else:
        return {'status': 500, 'Message': 'an error occurred'}


@practice_router.delete("/script/delete_practice")
async def delete_practice(p_id: int):
    practice_info = db_main.get_practice(p_id)
    print(practice_info)
    if db_main.delete_practice(p_id):
        if practice_info[3] == 1:
            path = os.path.abspath(os.getcwd())
            print(path)
            os.remove(f"{path}\\data\\test\\practice_{p_id}.txt")
        return {'status': 200, 'Message': f'practice №{p_id} deleted'}
    else:
        return {'status': 500, 'Message': 'an error occurred'}


@practice_router.get("/script/get_all_practices")
async def practice_list():
    records = get_all_practices()
    list = []
    for record in records:
        practice = Practice(id=record[0], title=record[1], description=record[2], testornot=record[3], orderc=record[4])
        list.append(practice)
    return list


@practice_router.put("/script/edit_practice_result")
async def edit_practice_result(p_id: int, email: str, grade: Grade):
    if edit_practice_res(p_id, email, grade.result, grade.comment):
        return {'status': 200, 'Message': 'practice result edited'}
    else:
        return {'status': 500, 'Message': 'an error occurred!'}


@practice_router.get("/script/get_practice_result", response_model=Grade)
async def get_practice_result(p_id: int, email: str):
    result = get_practice_res(p_id, email)
    grade = Grade(result=result[1], comment=result[2])
    return grade
