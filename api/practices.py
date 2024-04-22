from fastapi import APIRouter

from api import db_main
import os

from api.debugging import get_all_practices
# from api.db_main import new_practice
from api.models import Practice

practice_router = APIRouter()


@practice_router.post("/script/create_practice")
async def create_practice(practice: Practice):
    p_id=db_main.new_practice(practice.title, practice.orderc, practice.testornot, practice.description)
    if p_id:
        if practice.testornot == True:
            file = open("data/test/practice_" + str(p_id) + ".txt", 'wb')
            file.close()
        return {'Message': f'new practice added'}
    else:
        return {'Message': 'an error occurred'}


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
        return {'Message': f'practice №{p_id} edited'}
    else:
        return {'Message': 'an error occurred'}


@practice_router.delete("/script/delete_practice")
async def delete_practice(p_id:int):
    practice_info=db_main.get_practice(p_id)
    print(practice_info)
    if db_main.delete_practice(p_id):
        if practice_info[3]==1:
            os.remove(f"C:/Users/User/PycharmProjects/Quest-tour/data/test/practice_{p_id}.txt")
        return {'Message': f'practice №{p_id} deleted'}
    else:
        return {'Message': 'an error occurred'}

@practice_router.get("/script/get_all_practices")
async def practice_list():
    records=get_all_practices()
    list=[]
    for record in records:
        practice=Practice(id=record[0], title=record[1], description=record[2], testornot=record[3], orderc=record[4])
        list.append(practice)
    return list

