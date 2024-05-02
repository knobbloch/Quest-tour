from fastapi import APIRouter

from api.db_main import get_map
from api.models import Flower

map_router = APIRouter(prefix="/script", tags=["Map"])


@map_router.get("/get_flowers", response_model=list[Flower])
async def get_flowers(email: str):
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
