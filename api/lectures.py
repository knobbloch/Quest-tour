from fastapi import APIRouter

from api import db_main
from api.debugging import get_all_lections
from api.models import Lecture
import os

lecture_router = APIRouter(prefix="/script", tags=["Lecture functions"])


@lecture_router.post("/create_lecture")
async def create_lecture(lecture: Lecture):
    l_id = db_main.new_lection(lecture.title, lecture.orderc, lecture.description, lecture.pathto)
    if l_id:
        path=os.path.abspath(os.getcwd())
        if not os.path.isdir(f"{path}\\data\\lection\\lec_{l_id}"):
            os.mkdir(f"{path}\\data\\lection\\lec_{l_id}")
        return {'status': 201, 'Message': f'new lecture added'}
    else:
        return {'status': 500, 'Message': 'an error occurred'}


@lecture_router.get("/get_lecture")
async def get_lecture(l_id: int):
    lecture = db_main.get_lection(l_id)
    if lecture == [] or not lecture:
        return {'status': 404, 'Message': 'lecture not found'}
    else:
        lecture_obj = Lecture(id=lecture[0], title=lecture[1], description=lecture[2], pathto=lecture[3],
                                orderc=lecture[4])
        return lecture_obj


@lecture_router.put("/edit_lecture")
async def edit_lecture(l_id: int, new_title: str = None, new_description: str = None):
    if db_main.edit_lection(l_id, new_title, new_description):
        return {'status': 202, 'Message': f'lecture №{l_id} edited'}
    else:
        return {'status': 500, 'Message': 'an error occurred'}


@lecture_router.delete("/delete_lecture")
async def delete_lecture(l_id: int):
    lecture_info = db_main.get_lection(l_id)
    print(lecture_info)
    if db_main.delete_lection(l_id):
        path = os.path.abspath(os.getcwd())
        if os.path.isdir(f'{path}\\data\\lection\\lec_{l_id}'):
            files=os.listdir(f"{path}\\data\\lection\\lec_{l_id}")
            for name in files:
                os.remove(f"{path}\\data\\lection\\lec_{l_id}\\{name}")
            os.rmdir(f"{path}\\data\\lection\\lec_{l_id}")
        return {'status': 205, 'Message': f'lecture №{l_id} deleted'}
    else:
        return {'status': 500, 'Message': 'an error occurred'}


@lecture_router.get("/get_all_lectures")
async def lecture_list():
    records = get_all_lections()
    if not records or records == []:
        return {'status': 204, 'Message': 'No records found'}
    list = []
    for record in records:
        lecture = Lecture(id=record[0], title=record[1], description=record[2], pathto=record[3], orderc=record[4])
        list.append(lecture)
    return list
