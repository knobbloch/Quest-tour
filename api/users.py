from fastapi import APIRouter, Depends, Cookie

from api import db_main
from api.auth import is_accessible, Access, COOKIE_SESSION_ID_KEY
from api.db_main import new_person, delete_person, get_person, edit_person, get_all_not_adms, edit_auth
from api.debugging import get_all_auths, get_all_tokens
# from api.debugging import get_all_persons
from api.models import Person, UserFIO, EditPerson

user_router = APIRouter(prefix="/script", tags=["User functions"])


# @user_router.post("/test")
# async def test(user: Person):
#     return user


@user_router.get("/user_list", response_model=list[UserFIO])
async def user_list(session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    records = get_all_not_adms()
    users = []
    for record in records:
        if record[3] is None:
            single_user = UserFIO(email=record[0], fio=str(record[1] + " " + record[2]))
        else:
            single_user = UserFIO(email=record[0], fio=str(record[1] + " " + record[2] + " " + record[3]))
        users.append(single_user)
    return users
    # return records


@user_router.get("/get_user_self")
async def get_user_self(session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ALL, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    person = get_person(email)
    if person == [] or not person:
        return {"Message": "user not found"}
    else:
        user = Person(email=person[0], namep=person[2], surname=person[1], admornot=person[7],
                      thirdname=person[3], division=person[4],
                      city=person[5], employment=person[6])
        return user


@user_router.get("/get_user")
async def get_user(target_email: str, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    person = get_person(target_email)
    if person == [] or not person:
        return {"Message": "user not found"}
    else:
        user = Person(email=person[0], namep=person[2], surname=person[1], admornot=person[7],
                      thirdname=person[3], division=person[4],
                      city=person[5], employment=person[6])
        return user


@user_router.post("/add_user")
async def add_user(user: Person, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if new_person(user.email, user.surname, user.namep, user.admornot, user.thirdname, user.division,
                  user.city, user.employment):
        return {"status": 201, "Message": "user added"}
    else:
        return {"status": 500, "Message": "an error occurred :("}


@user_router.put("/edit_user_self")
async def edit_user_self(new_data: EditPerson, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ALL, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if is_accessible(Access.ADM, session_id) == email:
        if edit_person(email, new_data.surname, new_data.namep, new_data.thirdname, new_data.division, new_data.city):
            return {"status": 202, "Message": "user data changed"}
    if is_accessible(Access.USR, session_id) == email:
        if edit_person(email, new_data.surname, new_data.namep, new_data.thirdname, None, new_data.city):
            return {"status": 202, "Message": "user data changed"}
    else:
        return {"status": 500, "Message": "an error occurred!"}


@user_router.put("/edit_user")
async def edit_user(target_email: str, new_data: EditPerson, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if edit_person(target_email, new_data.surname, new_data.namep, new_data.thirdname, new_data.division, new_data.city, new_data.employment):
        return {"status": 202, "Message": "user data changed"}
    else:
        return {"status": 500, "Message": "an error occurred!"}


@user_router.delete("/delete_user")
async def delete_user(target_email: str, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if delete_person(target_email):
        return {"status": 205, "Message": "user deleted"}
    else:
        return {"status": 500, "Message": "an error occurred :("}


@user_router.put("/change_password")
async def change_password(new_password: str, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ALL, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if edit_auth(email, new_password):
        return {"status": 202, "Message": "password changed"}
    else:
        return {"status": 500, "Message": "an error occurred"}


@user_router.get("/get_user_auth")
async def get_user_auth(session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ALL, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    res = db_main.get_auth(email)
    if res:
        return res
    else:
        return {"status": 500, "Message": "an error occurred"}
