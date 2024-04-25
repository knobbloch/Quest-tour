import sqlite3

connection = sqlite3.connect('db.db')
cursor = connection.cursor()

cursor.execute ('''
CREATE TABLE IF NOT EXISTS Person (
	    email VARCHAR(64) not null,
        surname VARCHAR(64) not null,
        namep VARCHAR(64) not null,
        thirdname VARCHAR(64),
        division VARCHAR(200),
        city VARCHAR(64),
        employment VARCHAR(200),
        admornot INTEGER not null,
        PRIMARY KEY (email)
)'''
)

cursor.execute ('''
CREATE TABLE IF NOT EXISTS Practice (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
	    title VARCHAR(64) not null,
        description TEXT,
        testornot BOOLEAN not null,
		orderc INTEGER not null
)''')
cursor.execute ('''
CREATE TABLE IF NOT EXISTS Lection (
		id INTEGER not null primary key AUTOINCREMENT,
	    title VARCHAR(64) not null,
        description TEXT,
        pathto TEXT,
		orderc INTEGER not null
)''')
cursor.execute ('''
CREATE TABLE IF NOT EXISTS CourseRes (
		id INTEGER not null primary key AUTOINCREMENT,
		deadline DATE,
		endate DATE,
		idperson VARCHAR(64) not null,
		FOREIGN KEY (idperson) REFERENCES Person (email)
)''')
cursor.execute ('''
CREATE TABLE IF NOT EXISTS LectionRes (
		id INTEGER not null primary key AUTOINCREMENT,
		viewed BOOLEAN not null,
		idperson VARCHAR(64) not null,
        idlection INTEGER not null,
        FOREIGN KEY (idperson) REFERENCES Person (email),
        FOREIGN KEY (idlection) REFERENCES Lection(id)
)''')
cursor.execute ('''
CREATE TABLE IF NOT EXISTS PracticeRes (
		id INTEGER not null primary key AUTOINCREMENT,
		grade INTEGER,
		commentp TEXT,
        idperson VARCHAR(64) not null ,
        idpractice INTEGER not null , 
        FOREIGN KEY (idperson) REFERENCES Person (email),
        FOREIGN KEY (idpractice) REFERENCES Practice(id)
)''')

cursor.execute ('''
CREATE TABLE IF NOT EXISTS Auth (
		email VARCHAR(64) not null,
		password VARCHAR(64) not null,
        FOREIGN KEY (email) REFERENCES Person (email),
        PRIMARY KEY (email)
)''')

cursor.execute ('''
CREATE TABLE IF NOT EXISTS Token (
		token VARCHAR(64), 
		tokenData DATETIME,
        PRIMARY KEY (token)
)''')

connection.close()