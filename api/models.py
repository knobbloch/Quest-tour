from datetime import date
from typing import List, Optional

from pydantic import BaseModel


class Question(BaseModel):
    radio: bool
    question: str
    answers: List[str]
    right_answers: List[int]
    description: Optional[str] = None


class ListOfStr(BaseModel):
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


class EditPerson(BaseModel):
    namep: Optional[str] = None
    surname: Optional[str] = None
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


class EditLecture(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


class Practice(BaseModel):
    id: Optional[int] = None
    title: str
    orderc: int
    testornot: bool
    description: Optional[str] = None


class PracticeRes(BaseModel):
    id: int
    grade: Optional[int] = None
    comment: Optional[str] = None
    user_email: str
    practice_id: int


class Grade(BaseModel):
    result: Optional[int] = None
    comment: Optional[str] = None


class LectureRes(BaseModel):
    id: int
    viewed: Optional[bool] = False
    user_email: str
    lecture_id: int


class Flower(BaseModel):
    title: str
    flower_stage: int  # 0 - bad, 1 - good
    type: int  # 0 - lecture, 1 - practice
    entity_id: int


class Dead(BaseModel):
    id: int
    email: str
    deadline: date
    complete: Optional[date] = None
