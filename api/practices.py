from fastapi import APIRouter, UploadFile, Cookie
from fastapi.responses import FileResponse

from api import db_main
import os
import glob

from api.auth import COOKIE_SESSION_ID_KEY, is_accessible, Access
from api.db_main import get_practice_res, edit_practice_res, get_person
from api.debugging import get_all_practices
from api.models import Practice, Grade, PracticeRes, Answer, EditPractice

practice_router = APIRouter(prefix="/script", tags=["Practice functions"])


@practice_router.post("/create_practice")
async def create_practice(practice: Practice, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    p_id = db_main.new_practice(practice.title, practice.orderc, practice.testornot, practice.description)
    if p_id:
        if practice.testornot:
            file = open("data/test/practice_" + str(p_id) + ".txt", 'wb')
            file.close()
        return {'status': 201, 'Message': f'{p_id}'}
    else:
        return {'status': 500, 'Message': 'an error occurred'}


@practice_router.get("/get_practice")
async def get_practice(p_id: int, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ALL, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    practice = db_main.get_practice(p_id)
    if practice == [] or not practice:
        return {'status': 404, 'Message': 'practice not found'}
    else:
        practice_obj = Practice(id=practice[0], title=practice[1], description=practice[2], testornot=practice[3],
                                orderc=practice[4])
        return practice_obj


@practice_router.put("/edit_practice")
async def edit_practice(p_id: int, info: EditPractice,
                        session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if db_main.edit_practice(p_id, info.title, info.description):
        return {'status': 202, 'Message': f'practice №{p_id} edited'}
    else:
        return {'status': 500, 'Message': 'an error occurred'}


@practice_router.delete("/delete_practice")
async def delete_practice(p_id: int, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    practice_info = db_main.get_practice(p_id)
    # print(practice_info)
    if db_main.get_practice(p_id):
        db_main.delete_practice(p_id)
        if practice_info[3] == 1:
            path = os.path.abspath(os.getcwd())
            print(path)
            os.remove(f"{path}\\data\\test\\practice_{p_id}.txt")
        return {'status': 205, 'Message': f'practice №{p_id} deleted'}
    else:
        return {'status': 404, 'Message': 'practice not found'}


@practice_router.get("/get_all_practices")
async def practice_list():
    records = get_all_practices()
    if not records or records == []:
        return {'status': 204, 'Message': 'No records found'}
    p_list = []
    for record in records:
        practice = Practice(id=record[0], title=record[1], description=record[2], testornot=record[3], orderc=record[4])
        p_list.append(practice)
    return p_list


@practice_router.put("/edit_practice_result")
async def edit_practice_result(p_id: int, grade: Grade, target_email: str,
                               session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if edit_practice_res(p_id, target_email, grade.result, grade.comment):
        return {'status': 202, 'Message': 'practice result edited'}
    else:
        return {'status': 500, 'Message': 'an error occurred!'}


@practice_router.get("/get_practice_result")
async def get_practice_result(p_id: int, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ALL, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if not db_main.get_practice(p_id):
        return {'status': 404, 'Message': 'practice not found'}
    result = get_practice_res(p_id, email)
    p_res = PracticeRes(id=result[0], grade=result[1], comment=result[2], user_email=result[3], practice_id=result[4])
    grade = Grade(result=p_res.grade, comment=p_res.comment)
    print(grade)
    return grade


@practice_router.post("/add_answer_file")
async def add_answer_file(p_id: int, file: UploadFile, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.USR, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if not db_main.get_practice(p_id):
        return {'status': 404, 'Message': 'practice not found'}
    if db_main.get_practice(p_id)[3] == 1:
        return {'status': 400, 'Message': 'this practice is a test'}

    answer_id = get_practice_res(p_id, email)[0]
    content = await file.read()
    f_type = os.path.splitext(file.filename)[1]
    new_file = open(f"data/answers/practice_{answer_id}{f_type}", 'wb')
    new_file.write(content)
    new_file.close()
    return {'status': 201, 'Message': 'file added'}


@practice_router.get("/get_answer_file")
async def get_answer_file(p_id: int, target_email: str, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if not db_main.get_practice(p_id):
        return {'status': 404, 'Message': 'practice not found'}
    if db_main.get_practice(p_id)[3] == 1:
        return {'status': 400, 'Message': 'this practice is a test'}
    answer_id = get_practice_res(p_id, target_email)[0]
    username = get_person(target_email)[1]+'_'+get_person(target_email)[2]
    paths = glob.glob(f"data/answers/practice_{answer_id}.*")
    files = []
    for path in paths:
        name = path.split("\\")[-1]
        files.append(name)
    if not files or files == []:
        return {'status': 404, 'Message': 'file not found'}
    else:
        return [
            FileResponse(
                f"data/answers/{file}",
                media_type="application/octet-stream",
                filename=f"{username}_{file}",
            )
            for file in files
        ]


@practice_router.get("/get_answer_file_self")
async def get_answer_file_self(p_id: int, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.USR, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if not db_main.get_practice(p_id):
        return {'status': 404, 'Message': 'practice not found'}
    if db_main.get_practice(p_id)[3] == 1:
        return {'status': 400, 'Message': 'this practice is a test'}
    answer_id = get_practice_res(p_id, email)[0]
    paths = glob.glob(f"data/answers/practice_{answer_id}.*")
    files = []
    for path in paths:
        name = path.split("\\")[-1]
        files.append(name)
    if not files or files == []:
        return {'status': 404, 'Message': 'file not found'}
    else:
        return [
            FileResponse(
                f"data/answers/{file}",
                media_type="application/octet-stream",
                filename=f"{file}",
            )
            for file in files
        ]


@practice_router.delete("/delete_answers")
async def delete_answer_file(p_id: int, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ALL, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if not db_main.get_practice(p_id):
        return {'status': 404, 'Message': 'practice not found'}
    if db_main.get_practice(p_id)[3] == 1:
        return {'status': 400, 'Message': 'this practice is a test'}
    answer_id = get_practice_res(p_id, email)[0]
    paths = glob.glob(f"data/answers/practice_{answer_id}.*")
    for path in paths:
        os.remove(path)
    return {'status': 205, 'Message': 'files deleted'}


@practice_router.post("/add_answer")
async def add_answer(info: Answer, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.USR, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if not db_main.get_practice(info.p_id):
        return {'status': 404, 'Message': 'practice not found'}
    if db_main.get_practice(info.p_id)[3] == 1:
        return {'status': 400, 'Message': 'this practice is a test'}

    answer_id = get_practice_res(info.p_id, email)[0]
    new_file = open(f"data/answers/practice_{answer_id}.txt", 'wb')
    new_file.write(info.text.encode('utf-8'))
    new_file.close()
    return {'status': 201, 'Message': 'answer added'}

