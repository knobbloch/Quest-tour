from fastapi import APIRouter

from api.db_main import new_practice
from api.models import Practice

practice_router = APIRouter()


@practice_router.post("/script/create_practice")
async def create_practice(practice: Practice):
    if new_practice(practice.title, practice.orderc, practice.testornot, practice.description):
        if practice.testornot==True:
            file=open("data/test/"+practice.title+".txt", 'wb')
            file.close()
        return {'Message': 'new practice added'}
    else:
        return {'Message': 'an error occurred'}

