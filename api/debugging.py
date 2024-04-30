import sqlite3 #import psycopg2 #заменить при переезде на сервер

cursor = None
conn = None
try:
    #conn = psycopg2.connect("dbname=test user=postgres password=postgres") #заменить при переезде на сервер
    conn = sqlite3.connect('db.db')
    cursor = conn.cursor()
except Exception as error:
    print("AN ERROR OCCURED:", error) # An error occurred: name 'x' is not defined

#функции для отладки
def get_all_persons():
    try:
        cursor.execute("""SELECT * from person""")
        records = cursor.fetchall()
    except Exception as error:
        return [('0')]
    print("get_all_persons happened")
    return records

def get_all_CourseRes():
    try:
        cursor.execute("""SELECT * from CourseRes""")
        records = cursor.fetchall()
    except Exception as error:
        return [('0')]
    print("get_all_CourseRes happened")
    return records

def get_all_PracticeRes_byemail(email):
    try:
        cursor.execute("""SELECT * from PracticeRes WHERE ? = idperson""", (email, ))
        records = cursor.fetchall()
    except Exception as error:
        return [('0')]
    print("get_all_PracticeRes_byemail happened")
    return records

def get_all_LectionRes_byemail(email):
    try:
        cursor.execute("""SELECT * from LectionRes WHERE ? = idperson""", (email, ))
        records = cursor.fetchall()
    except Exception as error:
        return [('0')]
    print("get_all_LectionRes_byemail happened")
    return records

def get_all_practices():
    try:
        cursor.execute("""SELECT * from Practice p ORDER BY p.orderc""")
        records = cursor.fetchall()
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("get_all_practices happened")
    return records

def get_all_lections():
    try:
        cursor.execute("""SELECT * from Lection l ORDER BY l.orderc""")
        records = cursor.fetchall()
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("get_all_lections happened")
    return records
def get_all_auths():
    try:
        cursor.execute("""SELECT * from Auth a ORDER BY a.email""")
        records = cursor.fetchall()
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("get_all_auths happened")
    return records

def get_all_tokens():
    try:
        cursor.execute("""SELECT * from Token""")
        records = cursor.fetchall()
    except Exception as error:
        print("An error occurred:", error)  # An error occurred: name 'x'
        return False
    print("get_all_auths happened")
    return records