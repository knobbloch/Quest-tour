from fastapi import APIRouter

from api.db_main import get_map
from api.models import Flower

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
async def get_flowers(email: str):
    flower_list = get_flowers_for_map(email)
    return flower_list


@map_router.get("/course_percent", response_model=int)
async def course_percent(email: str):
    flower_list = get_flowers_for_map(email)
    total = len(flower_list)
    done = 0
    for flower in flower_list:
        if flower.flower_stage == 1:
            done += 1
    percent = int(done / total * 100)
    return percent
