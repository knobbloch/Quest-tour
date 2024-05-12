from datetime import date

from fastapi import APIRouter, Cookie

from api.auth import COOKIE_SESSION_ID_KEY, is_accessible, Access
from api.db_main import get_map, get_course_res
from api.models import Flower, Dead

map_router = APIRouter(prefix="/script", tags=["Map"])


def get_flowers_for_map(email: str):
    flower = Flower
    entity_list = get_map(email)
    # print(entity_list)
    flower_list = []
    for entity in entity_list:
        if entity[2] == 1 and entity[3] is None:
            flower = Flower(title=entity[1], flower_stage=0, type=entity[2], entity_id=entity[0])
        elif entity[2] == 1 and entity[3] < 60:
            flower = Flower(title=entity[1], flower_stage=0, type=entity[2], entity_id=entity[0])
        elif entity[2] == 1 and entity[3] >= 60:
            flower = Flower(title=entity[1], flower_stage=1, type=entity[2], entity_id=entity[0])
        elif entity[2] == 0:
            flower = Flower(title=entity[1], flower_stage=entity[3], type=entity[2], entity_id=entity[0])
        flower_list.append(flower)
    return flower_list


@map_router.get("/get_flowers", response_model=list[Flower])
async def get_flowers(session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ALL, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    flower_list = get_flowers_for_map(email)
    return flower_list


@map_router.get("/course_percent_self", response_model=int)
async def course_percent_self(session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ALL, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    flower_list = get_flowers_for_map(email)
    total = len(flower_list)
    done = 0
    for flower in flower_list:
        if flower.flower_stage == 1:
            done += 1
    percent = int(done / total * 100)
    return percent


@map_router.get("/course_percent", response_model=int)
async def course_percent(target_email: str, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    flower_list = get_flowers_for_map(target_email)
    total = len(flower_list)
    done = 0
    for flower in flower_list:
        if flower.flower_stage == 1:
            done += 1
    percent = int(done / total * 100)
    return percent


@map_router.get("/deadline_self")
async def deadline_self(session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ALL, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    inf = get_course_res(email)
    print(inf[2])
    cur_date = str(inf[1])
    cur_date = cur_date.split("-")
    cur_deadline = date(int(cur_date[0]), int(cur_date[1]), int(cur_date[2])).strftime("%d.%m.%Y")
    if inf[2] is not None:
        cur_date = str(inf[2])
        cur_date = cur_date.split("-")
        cur_complete = date(int(cur_date[0]), int(cur_date[1]), int(cur_date[2])).strftime("%d.%m.%Y")
        dead = Dead(id=inf[0], email=inf[3], deadline=cur_deadline, complete=cur_complete)
    else:
        dead = Dead(id=inf[0], email=inf[3], deadline=cur_deadline, complete=inf[2])
    return dead


@map_router.get("/deadline")
async def deadline(target_email: str, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    inf = get_course_res(target_email)
    cur_date = str(inf[1])
    cur_date = cur_date.split("-")
    cur_deadline = date(int(cur_date[0]), int(cur_date[1]), int(cur_date[2])).strftime("%d.%m.%Y")
    if inf[2] is not None:
        cur_date = str(inf[2])
        cur_date = cur_date.split("-")
        cur_complete = date(int(cur_date[0]), int(cur_date[1]), int(cur_date[2])).strftime("%d.%m.%Y")
        dead = Dead(id=inf[0], email=inf[3], deadline=cur_deadline, complete=cur_complete)
    else:
        dead = Dead(id=inf[0], email=inf[3], deadline=cur_deadline, complete=inf[2])
    return dead
