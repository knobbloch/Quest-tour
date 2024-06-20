import glob
import shutil
from typing import Annotated, Optional, Union

from fastapi import APIRouter, Cookie, UploadFile, File, Body
from fastapi.responses import FileResponse

from api import db_main
from api.auth import COOKIE_SESSION_ID_KEY, is_accessible, Access
from api.debugging import get_all_lections
from api.models import Lecture, LectureRes, EditLecture
import os

lecture_router = APIRouter(prefix="/script", tags=["Lecture functions"])


@lecture_router.post("/create_lecture")
async def create_lecture(lecture: Lecture, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    l_id = db_main.new_lection(lecture.title, lecture.orderc, lecture.description, lecture.pathto)
    if l_id:
        path = os.path.abspath(os.getcwd())
        if not os.path.isdir(f"{path}\\data\\lection\\lec_{l_id}"):
            os.mkdir(f"{path}\\data\\lection\\lec_{l_id}")
        return {'status': 201, 'Message': f'new lecture added'}
    else:
        return {'status': 500, 'Message': 'an error occurred'}


@lecture_router.post("/create_lecture_with_file")
async def create_lecture_with_file(lecture: Annotated[Lecture, Body(...)],
                                   file: Annotated[UploadFile, File(...)],
                                   session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    l_id = db_main.new_lection(lecture.title, lecture.orderc, lecture.description, lecture.pathto)
    if l_id:
        path = os.path.abspath(os.getcwd())
        if not os.path.isdir(f"{path}\\data\\lection\\lec_{l_id}"):
            os.mkdir(f"{path}\\data\\lection\\lec_{l_id}")
        # return {'status': 201, 'Message': f'new lecture added'}
    else:
        return {'status': 500, 'Message': 'an error while creation occurred'}
    if file is not None:
        if not file.content_type.startswith("video/mp4"):
            return {"status": 400, "Message": "Invalid file format"}
        content = await file.read()
        new_file = open(f"data/lection/lec_{l_id}/{file.filename}", 'wb')
        new_file.write(content)
        new_file.close()
        return {'status': 201, 'Message': 'new lecture added'}
    else:
        return {'status': 500, 'Message': 'an error occurred'}


@lecture_router.get("/get_lecture")
async def get_lecture(l_id: int, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ALL, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    lecture = db_main.get_lection(l_id)
    if lecture == [] or not lecture:
        return {'status': 404, 'Message': 'lecture not found'}
    else:
        lecture_obj = Lecture(id=lecture[0], title=lecture[1], description=lecture[2], pathto=lecture[3],
                              orderc=lecture[4])
        return lecture_obj


@lecture_router.put("/edit_lecture")
async def edit_lecture(l_id: int, new_data: Annotated[EditLecture, Body(...)], file: Optional[UploadFile] = File(None),
                       session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if not (db_main.edit_lection(l_id, new_data.title, new_data.description)):
        return {'status': 500, 'Message': 'an error occurred'}
    else:
        if file is not None:
            if not file.content_type.startswith("video/mp4"):
                return {"status": 400, "Message": "Invalid file format"}
            path = os.path.abspath(os.getcwd())
            if os.path.exists(f"{path}\\data\\lection\\lec_{l_id}"):
                shutil.rmtree(f"{path}\\data\\lection\\lec_{l_id}")
            content = await file.read()
            new_file = open(f"data/lection/lec_{l_id}/{file.filename}", 'wb')
            new_file.write(content)
            new_file.close()
            return {'status': 202, 'Message': 'lecture edited'}
        else:
            return {'status': 202, 'Message': 'lecture edited'}


@lecture_router.delete("/delete_lecture")
async def delete_lecture(l_id: int, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    lecture_info = db_main.get_lection(l_id)
    print(lecture_info)
    if db_main.get_lection(l_id):
        db_main.delete_lection(l_id)
        path = os.path.abspath(os.getcwd())
        if os.path.isdir(f'{path}\\data\\lection\\lec_{l_id}'):
            files = os.listdir(f"{path}\\data\\lection\\lec_{l_id}")
            for name in files:
                os.remove(f"{path}\\data\\lection\\lec_{l_id}\\{name}")
            os.rmdir(f"{path}\\data\\lection\\lec_{l_id}")
        return {'status': 205, 'Message': f'lecture №{l_id} deleted'}
    else:
        return {'status': 404, 'Message': 'lecture not found'}


@lecture_router.get("/get_all_lectures")
async def lecture_list():
    records = get_all_lections()
    if not records or records == []:
        return {'status': 204, 'Message': 'No records found'}
    lec_list = []
    for record in records:
        lecture = Lecture(id=record[0], title=record[1], description=record[2], pathto=record[3], orderc=record[4])
        lec_list.append(lecture)
    return lec_list


@lecture_router.put("/edit_lecture_result")
async def edit_lecture_result(l_id: int, viewed: bool, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.USR, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if db_main.edit_lection_res(l_id, email, viewed):
        return {'status': 202, 'Message': 'lecture result edited'}
    else:
        return {'status': 500, 'Message': 'an error occurred!'}


@lecture_router.get("/get_lecture_result")
async def get_lecture_result(l_id: int, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ALL, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if not db_main.get_lection(l_id):
        return {'status': 404, 'Message': 'lecture not found'}
    result = db_main.get_lection_res(l_id, email)
    lec_res = LectureRes(id=result[0], viewed=result[1], user_email=result[2], lecture_id=result[3])
    return lec_res.viewed


@lecture_router.put("/add_lecture_file")
async def add_lecture_file(l_id: int, file: UploadFile, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if not db_main.get_lection(l_id):
        return {'status': 404, 'Message': 'lecture not found'}
    path = os.path.abspath(os.getcwd())
    if not os.path.isdir(f'{path}\\data\\lection\\lec_{l_id}'):
        os.mkdir(f'{path}\\data\\lection\\lec_{l_id}')
    if not file.content_type.startswith("video/mp4"):
        return {"status": 400, "Message": "Invalid file format"}
    content = await file.read()
    new_file = open(f"data/lection/lec_{l_id}/{file.filename}", 'wb')
    new_file.write(content)
    new_file.close()
    return {'status': 201, 'Message': 'file added'}


@lecture_router.get("/get_lecture_file")
async def get_lecture_file(l_id: int, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ALL, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if not db_main.get_lection(l_id):
        return {'status': 404, 'Message': 'lecture not found'}
    path = os.path.abspath(os.getcwd())
    video_path = f"{path}\\data\\lection\\lec_{l_id}"
    print(video_path)
    if not os.path.isdir(video_path):
        return {'status': 404, 'Message': 'path is not found'}
    paths = glob.glob(f'{video_path}\\*.mp4')
    files = []
    for file_path in paths:
        file = file_path.split('\\')[-1]
        files.append(file)
    # files = os.listdir(f"{path}\\data\\lection\\lec_{l_id}")
    print(files)
    if not files or files == []:
        return {'status': 404, 'Message': 'files not found'}
    else:
        return [
            FileResponse(
                f"data/lection/lec_{l_id}/{file}",
                media_type="application/octet-stream",
                filename=f"{file}",
            )
            for file in files
        ]

@lecture_router.delete("/delete_lecture_file")
async def delete_lecture_file(l_id: int, file_name: str, session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)):
    email = is_accessible(Access.ADM, session_id)
    if email == "":
        return {"status": 401, "Message": "user unauthorized"}
    if not db_main.get_lection(l_id):
        return {'status': 404, 'Message': 'lecture not found'}
    path = os.path.abspath(os.getcwd())
    if os.path.isfile(f"{path}\\data\\lection\\lec_{l_id}\\{file_name}"):
        os.remove(f"{path}\\data\\lection\\lec_{l_id}\\{file_name}")
        return {'status': 202, 'Message': 'file deleted'}
    else:
        return {'status': 404, 'Message': 'file not found'}
