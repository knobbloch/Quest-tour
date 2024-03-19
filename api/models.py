from typing import List

from pydantic import BaseModel


class Question(BaseModel):
    # def __init__(self, question, answers, right_answers):
    #     self.question = question
    #     self.answers = answers
    #     self.right_answers = right_answers
    question: str
    answers: list
    right_answers: list


class List_of_str(BaseModel):
    sections: List[str]

