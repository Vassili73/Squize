-- ------------------------------
-- DB Modell zu Squiz, Version 2.0
-- Create Table Statements
-- ------------------------------

-- Benutzer
CREATE TABLE User (
	user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	username TEXT NOT NULL,
	password TEXT NOT NULL,
	email TEXT NOT NULL,
	country TEXT NOT NULL
);

-- Quizze
CREATE TABLE Quizze (
	quiz_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER NOT NULL,
	quizname TEXT NOT NULL,
	last_edited DATE NOT NULL,
	beschreibung TEXT NOT NULL,
	is_public BOOLEAN,
	aufrufe INTEGER,
	FOREIGN KEY (user_id) REFERENCES User(user_id)

);

-- alle Quizfragen
CREATE TABLE Questions (
	question_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	quiz_id INTEGER NOT NULL,
	position INTEGER NOT NULL,
	question TEXT NOT NULL,
	question_type TEXT NOT NULL,
	FOREIGN KEY (quiz_id) REFERENCES Quizze(quiz_id)
);

-- alle Antworten
CREATE TABLE Answers (
	answer_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	question_id INTEGER NOT NULL,
	answer_text TEXT NOT NULL,
	is_correct BOOLEAN,
	FOREIGN KEY (question_id) REFERENCES Questions(question_id)
);

CREATE TABLE Leaderboard (
	leaderboard_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER NOT NULL,
	score INTEGER,
	percentage INTEGER,
	FOREIGN KEY (user_id) REFERENCES User(user_id)
);