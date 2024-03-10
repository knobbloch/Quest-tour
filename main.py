from fastapi import FastAPI
import uvicorn
from starlette.staticfiles import StaticFiles
import pickle
from question import Question

app = FastAPI()

object = Question("gay?", ["yes", "yess", "yess", "no", "?"], ["yes", "yess", "yess"]) #первый обьект
pickled_object = pickle.dumps(object)   #сереализация к виду x80\\x04\\x95j\\x00\\x00\\x00\\x00\\x00\\x00
unpickled_object = pickle.loads(pickled_object) #десереализация
object2 = Question("your mama gay?", ["yes", "yess", "-", "no", "?"], ["yes", "yess"])#второй обьект

list_object = [object, object2] #список

file = open("data/test.txt", "wb") #запись в файл
pickle.dump (list_object, file)#сереализация
file.close()

@app.get("/script")
async def root():
    return {"message": "Hello World"}

@app.post("/script/write_to_file")
async def root():
    return {"message": "Hello World"}

@app.get("/script/read_from_file")
async def root():
    file2 = open("data/test.txt", "rb")
    readed_list = pickle.load(file2)#десереализация
    file2.close()
    return {"message": readed_list[0].question, "message2": readed_list[1].question}

app.mount("/", StaticFiles(directory="front", html=True), name="front")
