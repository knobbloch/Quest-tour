import sqlite3  # import psycopg2 #заменить при переезде на сервер
from fastapi import APIRouter
import api.db_creation
import api.debugging
import datetime

db_router = APIRouter()

ANSWERS = 'data/answers'
TEST = 'data/test'
LECTION = 'data/lection'

# Initialization
cursor = None
conn = None
try:
    # conn = psycopg2.connect("dbname=test user=postgres password=postgres") #заменить при переезде на сервер
    conn = sqlite3.connect('db.db')
    cursor = conn.cursor()
except Exception as error:
    print("AN ERROR OCCURED:", error)  # An error occurred: name 'x' is not defined

###########NEW########### returns True if all okay

def new_person(email, surname, namep, admornot, thirdname=None, division=None, city=None, employment=None):
    current_datetime = datetime.datetime.now()
    current_date = current_datetime.date()
    future_date = datetime.datetime.today() + datetime.timedelta(days=30)
    current_date_str = future_date.strftime("%Y-%m-%d")
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
        cursor.execute("INSERT INTO CourseRes (idperson, deadline) VALUES (?, ?)", (email,current_date_str))
        conn.commit()
    except Exception as error:
        conn.rollback()
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("new_person happened")
    return True

#returns id of new lection or -1
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
        conn.rollback()
        print("An error occurred:", error)  # An error occurred: name 'x'
        return -1
    print("new_lection happened")
    return increment[0][0]

#returns id of new practice or -1
def new_practice(title, orderc, testornot, description=None):
    try:
        cursor.execute("UPDATE Practice SET orderc = orderc + 1 WHERE ? <= orderc", (orderc,))
        cursor.execute("UPDATE Lection SET orderc = orderc + 1 WHERE ? <= orderc", (orderc,))
        cursor.execute("INSERT INTO Practice (title, orderc, testornot, description) VALUES (?, ?, ?, ?)",
                       (title, orderc, testornot, description))
        cursor.execute("""SELECT * from person""")
        records_persons = cursor.fetchall()
        cursor.execute("""select seq from sqlite_sequence where name="Practice" """)
        increment = cursor.fetchall()
        if (len(increment) == 0):
            increment = [[1]]
        print(increment[0][0])
        for record in records_persons:
            cursor.execute("INSERT INTO PracticeRes (idperson, idpractice) VALUES (?, ?)", (record[0], increment[0][0]))
        conn.commit()
    except Exception as error:
        conn.rollback()
        print("An error occurred:", error)  # An error occurred: name 'x'
        return -1
    print("new_practice happened")
    return increment[0][0]

###########EDIT########### returns True if all okay

def edit_person(email, namep=None, surname=None, thirdname=None, division=None, city=None, employment=None):
    try:
        cursor.execute("""SELECT * from Person WHERE ? = email""", (email,))
        records = cursor.fetchall()
        noww = records[0]
        input = [email, namep, surname, thirdname, division, city, employment]
        changes = [elem_noww if elem_input is None else elem_input for elem_noww, elem_input in zip(noww, input)]
        cursor.execute("UPDATE person SET namep=?, surname=?, thirdname=?, division=?, city=?, employment=? WHERE email=?",
        (changes[2], changes[1], changes[3], changes[4], changes[5], changes[6], email))
        conn.commit()
    except Exception as error:
        conn.rollback()
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("edit_person happened")
    return True

def edit_practice(id, title=None, description=None):
    try:
        cursor.execute("""SELECT * from Practice p WHERE p.id = ?""", (id, ))
        records = cursor.fetchall()
        noww = [records[0][1], records[0][2]]
        input = [title, description]
        changes = [elem_noww if elem_input is None else elem_input for elem_noww, elem_input in zip(noww, input)]
        cursor.execute("UPDATE Practice SET title=?, description=? WHERE id=?",
        (changes[0], changes[1], id))
        conn.commit()
    except Exception as error:
        conn.rollback()
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("edit_practice happened")
    return True

def edit_lection(id, title=None, description=None):
    try:
        cursor.execute("""SELECT * from Lection l WHERE l.id = ?""", (id, ))
        records = cursor.fetchall()
        noww = [records[0][1], records[0][2]]
        input = [title, description]
        changes = [elem_noww if elem_input is None else elem_input for elem_noww, elem_input in zip(noww, input)]
        cursor.execute("UPDATE Lection SET title=?, description=? WHERE id=?",
        (changes[0], changes[1], id))
        conn.commit()
    except Exception as error:
        conn.rollback()
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("edit_lection happened")
    return True

def edit_practice_res(id_practice, email, grade=None, commentp=None):
    try:
        cursor.execute("""SELECT * from PracticeRes WHERE idpractice = ? AND idperson = ?""", (id_practice, email))
        records = cursor.fetchall()
        noww = [records[0][1], records[0][2]]
        print(noww)
        input = [grade, commentp]
        changes = [elem_noww if elem_input is None else elem_input for elem_noww, elem_input in zip(noww, input)]
        cursor.execute("UPDATE PracticeRes SET grade=?, commentp=? WHERE idpractice = ? AND idperson = ?",
        (changes[0], changes[1], id_practice, email))
        if not is_all_course_completed(email):
            raise Exception("is_all_course_completed not happened")
        conn.commit()
    except Exception as error:
        conn.rollback()
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("edit_lection happened")
    return True

def edit_lection_res(id_lection, email, viewed):
    try:
        cursor.execute("UPDATE LectionRes SET viewed=? WHERE idlection = ? AND idperson = ?",
        (viewed, id_lection, email))
        if not is_all_course_completed(email):
            raise Exception("is_all_course_completed not happened")
        conn.commit()
    except Exception as error:
        conn.rollback()
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("edit_lection_res happened")
    return True

###########GET###########

#email, name, surname, thirdname, division, city, employment, admornot
def get_all_not_adms():
    try:
        cursor.execute("""SELECT * from person p WHERE admornot = 0 ORDER BY p.surname, p.namep, p.thirdname""")
        records = cursor.fetchall()
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("get_all_not_adms happened")
    return records

#email, name, surname, thirdname, division, city, employment, admornot
def get_person(email):
    try:
        cursor.execute("""SELECT * from person p WHERE p.email = ?""", (email, ))
        records = cursor.fetchall()
        records.append([])
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("get_person happened")
    return records[0]

#title; 0-lection, 1-practice; (0-not viewed, 1-viewed) - lection, (None-no grade) - practice; order on map на всяки случай
def get_map():
    try:
        cursor.execute("""SELECT l.title, 0, lr.viewed, l.orderc
        FROM Lection l
        LEFT JOIN LectionRes lr
        ON l.id = lr.idlection
        UNION ALL
        SELECT p.title, 1, pr.grade, p.orderc
        FROM Practice p
        LEFT JOIN PracticeRes pr
        ON p.id = pr.idpractice
        ORDER BY l.orderc, p.orderc
        """)
        records = cursor.fetchall()
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("get_map happened")
    return records

#id, title, description, testornot, orderc
def get_practice(id_practice):
    try:
        cursor.execute("""SELECT * from Practice p WHERE p.id = ?""", (id_practice, ))
        records = cursor.fetchall()
        records.append([])
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("get_practice happened")
    return records[0]

#id, title, description, pathto, orderc
def get_lection(id_lection):
    try:
        cursor.execute("""SELECT * from Lection l WHERE l.id = ?""", (id_lection, ))
        records = cursor.fetchall()
        records.append([])
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("get_lection happened")
    return records[0]

#id, grade, commentp, idperson, idlection
def get_practice_res(id_practice, email):
    try:
        cursor.execute("""SELECT * from PracticeRes pr WHERE pr.idpractice = ? AND pr.idperson = ?""", (id_practice, email))
        records = cursor.fetchall()
        records.append([])
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("get_practice_res happened")
    return records[0]

#id, viewed, idperson, idlection
def get_lection_res(id_lection, email):
    try:
        cursor.execute("""SELECT * from LectionRes lr WHERE lr.idlection = ? AND lr.idperson = ?""", (id_lection, email))
        records = cursor.fetchall()
        records.append([])
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("get_lection_res happened")
    return records[0]

#id, deadline, endate, email
def get_course_res (email):
    try:
        cursor.execute("""SELECT * from CourseRes cr WHERE cr.idperson = ?""", (email,))
        records = cursor.fetchall()
        records.append([])
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("get_course_res happened")
    return records[0]

###########DELETE###########

def delete_person(email):
    try:
        cursor.execute("""DELETE FROM LectionRes WHERE idperson = ?""", (email, ))
        cursor.execute("""DELETE FROM PracticeRes WHERE idperson = ? """, (email, ))
        cursor.execute("""DELETE FROM Person WHERE email = ?""", (email, ))
        conn.commit()
    except Exception as error:
        conn.rollback()
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("delete_person happened")
    return True

def delete_lection(id):
    try:
        cursor.execute("""DELETE FROM LectionRes WHERE idlection = ?""", (id, ))
        print("bebebbeb")
        cursor.execute("""DELETE FROM Lection WHERE id = ?""", (id, ))
        print("bbbabaab")
        conn.commit()
    except Exception as error:
        conn.rollback()
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("delete_lection happened")
    return True

def delete_practice(id):
    try:
        cursor.execute("""DELETE FROM PracticeRes WHERE idpractice = ?""", (id, ))
        print("bebebbeb")
        cursor.execute("""DELETE FROM Practice WHERE id = ?""", (id, ))
        print("bbbabaab")
        conn.commit()
    except Exception as error:
        conn.rollback()
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("delete_practice happened")
    return True

#OTHER
#check all lecRes and pracRes and change enddate to now
def is_all_course_completed(email):
    current_datetime = datetime.datetime.now()
    current_date = current_datetime.date()
    endate = current_date.strftime("%Y-%m-%d")
    try:
        cursor.execute("SELECT COUNT(*) FROM LectionRes WHERE idperson = ? AND viewed = 1", (email,))
        count_lecRes = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM PracticeRes WHERE idperson = ? AND grade != 'None'", (email,))
        count_pracRes = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM Practice")
        count_prac = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM Lection")
        count_lec = cursor.fetchone()[0]
        if (count_prac == count_pracRes and count_lec == count_lecRes):
            cursor.execute("UPDATE CourseRes SET endate = ? WHERE idperson = ?", (endate, email))
            print("endate changed")
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("is_all_course_completed happened")
    return True
    print()

#print (new_practice("meowmeow", 1  , testornot=False))
#print(new_lection("blabla", 1, "HALO"))
#g = new_person("lox@gmail.com", "lox", "xol", 0, division = "fdsafdfa")
#g = new_person("SSSghoul@gmail.com", namep = "lox", surname = "AAA", admornot = 0, division = "fdsafdfa")
#g = new_person("debil@gmail.com", "debil", "libed", 1, division = "division by zero")
#new_practice("QQQQQQQQQQQQ", 1  , testornot=False)
#print (new_lection("blabla", 1, "HALO"))

#delete_person("lox@gmail.com")
#print(edit_lection_res(1, "lox@gmail.com", True))
#print(edit_practice_res(1, "lox@gmail.com", grade = 52))
#print(api.debugging.get_all_persons())
#print(api.debugging.get_all_CourseRes())
#print(get_course_res("lox@gmail.com"))
#print(get_all_not_adms())
#edit_practice(1, 'MEOW', 'this practice is about how to meow')
#print(api.debugging.get_all_practices())
#edit_lection(1, 'LEC2', 'this lection is about how to lection')
#print(api.debugging.get_all_lections())
#print(api.debugging.get_all_PracticeRes_byemail("lox@gmail.com"))
#print(api.debugging.get_all_LectionRes_byemail("lox@gmail.com"))
#edit_person("lox@gmail.com", surname = "meow", division="qwertyuio", thirdname ="Петрович", employment="старший стражер")
#print(get_all_not_adms())

#print(get_person("lox@gmail.com"))
#print(get_map())
#edit_lection(1, 'LEC2', 'this lection is about how to lection')
#print(api.debugging.get_all_practices())
#print(api.debugging.get_all_lections())
#print(edit_lection_res(1, "lox@gmail.com", False))
#print(edit_practice_res(1, "lox@gmail.com", grade = 52))
#print(get_practice_res(1, "lox@gmail.com"))
#print(get_lection_res(1, "lox@gmail.com"))


# print(debugging.get_all_persons())

