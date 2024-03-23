import sqlite3  # import psycopg2 #заменить при переезде на сервер

from fastapi import APIRouter

import api.db_creation
import api.debugging

db_router = APIRouter()

# Initialization
cursor = None
conn = None
try:
    # conn = psycopg2.connect("dbname=test user=postgres password=postgres") #заменить при переезде на сервер
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()
except Exception as error:
    print("AN ERROR OCCURED:", error)  # An error occurred: name 'x' is not defined


def new_person(email, namep, surname, admornot, thirdname=None, division=None, city=None, employment=None):
    try:
        cursor.execute("SELECT * FROM Practice")
        practice_records = cursor.fetchall()
        for record in practice_records:
            cursor.execute("INSERT INTO PracticeRes (idperson, idpractice) VALUES (?, ?)", (email, record[0]))
        cursor.execute("SELECT * FROM Lection")
        lection_records = cursor.fetchall()
        for record in lection_records:
            cursor.execute("INSERT INTO LectionRes (idperson, viewed, idlection) VALUES (?, ?, ?)",
                           (email, False, record[0]))
        cursor.execute(
            "INSERT INTO person (email, namep, surname, thirdname, division, city, employment, admornot) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (email, namep, surname, thirdname, division, city, employment, admornot))
        cursor.execute("INSERT INTO CourseRes (idperson) VALUES (?)", (email,))
        conn.commit()
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("new_person happened")
    return True


def new_lection(title, orderc, description=None, pathto=None):
    try:
        cursor.execute("UPDATE Practice SET orderc = orderc + 1 WHERE ? <= orderc", (orderc,))
        cursor.execute("UPDATE Lection SET orderc = orderc + 1 WHERE ? <= orderc", (orderc,))
        cursor.execute("INSERT INTO Lection (title, description, pathto, orderc) VALUES (?, ?, ?, ?)",
                       (title, description, pathto, orderc))
        cursor.execute("""SELECT * from person""")
        records_persons = cursor.fetchall()
        cursor.execute("""select seq from sqlite_sequence where name="Lection" """)
        increment = cursor.fetchall()
        if (len(increment) == 0):
            increment = [[1]]
        for record in records_persons:
            cursor.execute("INSERT INTO LectionRes (idperson, idlection, viewed) VALUES (?, ?, ?)",
                           (record[0], increment[0][0], False))
        conn.commit()
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("new_lection happened")
    return True


def new_practice(title, orderc, testornot, description=None, pathto=None):
    try:
        cursor.execute("UPDATE Practice SET orderc = orderc + 1 WHERE ? <= orderc", (orderc,))
        cursor.execute("UPDATE Lection SET orderc = orderc + 1 WHERE ? <= orderc", (orderc,))
        cursor.execute("INSERT INTO Practice (title, orderc, testornot, description, pathto) VALUES (?, ?, ?, ?, ?)",
                       (title, orderc, testornot, description, pathto))
        cursor.execute("""SELECT * from person""")
        records_persons = cursor.fetchall()
        cursor.execute("""select seq from sqlite_sequence where name="Practice" """)
        increment = cursor.fetchall()
        if (len(increment) == 0):
            increment = [[1]]
        for record in records_persons:
            cursor.execute("INSERT INTO PracticeRes (idperson, idpractice) VALUES (?, ?)", (record[0], increment[0][0]))
        conn.commit()
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("new_practice happened")
    return True


def edit_person(email, namep=None, surname=None, thirdname=None, division=None, city=None, employment=None):
    cursor.execute("""SELECT * from Person WHERE ? = email""", (email,))
    records = cursor.fetchall()
    noww = records[0]
    input = [email, namep, surname, thirdname, division, city, employment]
    changes = [elem_noww if elem_input is None else elem_input for elem_noww, elem_input in zip(noww, input)]
    cursor.execute("UPDATE person SET namep=?, surname=?, thirdname=?, division=?, city=?, employment=? WHERE email=?",
                   (changes[2], changes[1], changes[3], changes[4], changes[5], changes[6], email))

    try:
        conn.commit()
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("edit_person happened")
    return True


def edit_practice():
    print()


def get_all_not_adms():
    try:
        cursor.execute("""SELECT * from person WHERE admornot = 0""")
        records = cursor.fetchall()
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("get_all_not_adms happened")
    return records


def get_all_practices():
    try:
        cursor.execute("""SELECT * from Practice""")
        records = cursor.fetchall()
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("get_all_practices happened")
    return records


def get_all_lections():
    try:
        cursor.execute("""SELECT * from Lection""")
        records = cursor.fetchall()
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("get_all_lections happened")
    return records


# new_practice("meowmeow", 1  , testornot=False)
# new_lection("blabla", 1, "HALO")
# g = new_person("lox@gmail.com", "lox", "xol", 0, division = "fdsafdfa")
# g = new_person("debil@gmail.com", "debil", "libed", 1, division = "division by zero")
# new_practice("meowmeow", 1  , testornot=False)
# new_lection("blabla", 1, "HALO")
print(api.debugging.get_all_persons())
print(api.debugging.get_all_CourseRes())
print(get_all_not_adms())
print(get_all_practices())
print(get_all_lections())
print(api.debugging.get_all_PracticeRes_byemail("lox@gmail.com"))
print(api.debugging.get_all_LectionRes_byemail("lox@gmail.com"))


# edit_person("lox@gmail.com", division="qwertyuio", thirdname ="Петрович", employment="старший стражер")
# print(debugging.get_all_persons())

