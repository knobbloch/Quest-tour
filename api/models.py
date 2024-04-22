from typing import List, Optional

from pydantic import BaseModel


class Question(BaseModel):
    question: str
    answers: list
    right_answers: list


class List_of_str(BaseModel):
    sections: List[str]


class Person(BaseModel):
    email: str
    namep: str
    surname: str
    admornot: int
    thirdname: Optional[str] = None
    division: Optional[str] = None
    city: Optional[str] = None
    employment: Optional[str] = None


class UserFIO(BaseModel):
    email: str
    fio: str


class Lecture(BaseModel):
    id: Optional[int] = None
    title: str
    orderc: int
    description: Optional[str] = None
    pathto: Optional[str] = None


class Practice(BaseModel):
    id: Optional[int] = None
    title: str
    orderc: int
    testornot: bool
    description: Optional[str] = None

