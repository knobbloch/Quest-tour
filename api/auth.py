from fastapi import APIRouter, Depends, HTTPException, status, Header, Response, Cookie
import secrets
from typing import Annotated

from pydantic import BaseModel
from starlette.staticfiles import StaticFiles
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi import Request
from typing import Annotated, Any
import uuid
from time import time
from api.db_main import get_auth, new_token, check_token, delete_token
from enum import Enum

auth_router = APIRouter(prefix="/auth", tags=["Basic auth"])
security = HTTPBasic()

COOKIE_SESSION_ID_KEY = "auth-session-id"

class Access(Enum):
    ADM = 0
    USR = 1

def get_current_username(
    credentials: Annotated[HTTPBasicCredentials, Depends(security)],
):
    unauthed_exc = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    password = get_auth(credentials.username)
    print(password)
    if not(password == []):
        correct_password_bytes = password[1].encode("utf8")
    else:
        correct_password_bytes = "".encode("utf8")
    current_password_bytes = credentials.password.encode("utf8")
    is_correct_password = secrets.compare_digest(
        current_password_bytes, correct_password_bytes
    )

    if not (is_correct_password):
        raise unauthed_exc
    return {"username": credentials.username,
            "admornot": password[2]}

def generate_session_id() -> str:
    return uuid.uuid4().hex

def get_session_data(
    session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY),
) -> dict:
    check = check_token(session_id)
    if not check:
        print("not in cookies")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="not authenticated",
        )

    return check #COOKIES[session_id]

@auth_router.post("/login-cookie")
async def auth_login_set_cookie(
    response: Response,
    auth_username: dict = Depends(get_current_username),
    #username: str = Depends(get_username_by_static_auth_token),
):
    print("login-cookie: authenticated")
    session_id = str(auth_username["admornot"]) + generate_session_id()
    new_token(session_id, auth_username["username"])
    response.set_cookie(COOKIE_SESSION_ID_KEY, session_id)
    return {"result": "ok"}

@auth_router.get("/check-cookie")
def auth_check_cookie(
    user_session_data: dict = Depends(get_session_data)
):
    print("check-cookie: in cookies")
    username = user_session_data["user"]
    return {
        "message": f"Hello, {username}!",
        **user_session_data,
    }


@auth_router.get("/logout-cookie")
def auth_logout_cookie(
    response: Response,
    session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY),
    user_session_data: dict = Depends(get_session_data),
):
    delete_token(session_id)
    response.delete_cookie(COOKIE_SESSION_ID_KEY)
    username = user_session_data["user"]
    return {
        "message": f"Bye, {username}!",
    }


def is_accessible(
    access_type: Access,
    session_id: str = Cookie(alias=COOKIE_SESSION_ID_KEY)
):
    if not ((session_id[0]=="0" and access_type==Access.ADM) or (session_id[0]=="1" and access_type==Access.USR)):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden",
        )
    check = check_token(session_id)
    if not check:
        print("not in cookies")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="not authenticated",
        )

    return check["user"]