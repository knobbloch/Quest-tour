from typing import List

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
    thirdname: str | None
    division: str | None
    city: str | None
    employment: str | None


class Lecture(BaseModel):
    id: int | None
    title: str
    orderc: int
    description: str | None
    pathto: str | None


class Practice(BaseModel):
    id: int | None
    title: str
    orderc: int
    testornot: bool
    description: str | None
    pathto: str | None

