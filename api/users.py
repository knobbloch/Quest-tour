from fastapi import APIRouter

from api.db_main import new_person, delete_person, get_person, edit_person, get_all_not_adms
#from api.debugging import get_all_persons
from api.models import Person, UserFIO, EditPerson

user_router = APIRouter(prefix="/script", tags=["User functions"])


@user_router.post("/test")
async def test(user: Person):
    return user


@user_router.get("/user_list", response_model=list[UserFIO])
async def user_list():
    records = get_all_not_adms()
    users = []
    for record in records:
        if record[3] is None:
            single_user = UserFIO(email=record[0], fio=str(record[1] + " " + record[2]))
        else:
            single_user = UserFIO(email=record[0], fio=str(record[1] + " " + record[2] + " " + record[3]))
        print(single_user)
        users.append(single_user)
    return users
    # return records


@user_router.get("/get_user")
async def get_user(email: str):
    person = get_person(email)
    if person == [] or not person:
        return {"Message": "user not found"}
    else:
        user = Person(email=person[0], namep=person[1], surname=person[2], admornot=person[7],
                      thirdname=person[3], division=person[4],
                      city=person[5], employment=person[6])
        return user


@user_router.post("/add_user")
async def add_user(user: Person):
    if new_person(user.email, user.surname, user.namep, user.admornot, user.thirdname, user.division,
                  user.city, user.employment):
        return {"status": 201, "Message": "user added"}
    else:
        return {"status": 500, "Message": "an error occurred :("}


@user_router.put("/edit_user")
async def edit_user(email: str, new_data: EditPerson):
    if edit_person(email, new_data.namep, new_data.surname, new_data.thirdname, new_data.division, new_data.city, new_data.employment):
        return {"status": 202, "Message": "user data changed"}
    else:
        return {"status": 500, "Message": "an error occurred!"}


@user_router.delete("/delete_user")
async def delete_user(email: str):
    if delete_person(email):
        return {"status": 205, "Message": "user deleted"}
    else:
        return {"status": 500, "Message": "an error occurred :("}
