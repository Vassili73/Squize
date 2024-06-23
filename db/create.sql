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
	is_public BOOLEAN
);

-- Quizfragen mit auswahlmöglichkeiten
CREATE TABLE Questions_choice (
	questions_choice_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	quiz_id INTEGER NOT NULL,
	prev_id INTEGER KEY,
	question TEXT NOT NULL,
	answer_correct TEXT NOT NULL, --position der Antworten zufällig verteilen
	answer_false_1 TEXT NOT NULL,
	answer_false_2 TEXT NOT NULL,
	answer_false_3 TEXT NOT NULL
);

-- Quizfragen mit Texteingabe
CREATE TABLE Questions_text (
	questions_textid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	quiz_id INTEGER NOT NULL,
	prev_id INTEGER KEY,
	question TEXT NOT NULL,
	answer1 TEXT NOT NULL
);

CREATE TABLE Leaderboard (
	leaderboard_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER NOT NULL,
	score INTEGER,
	percentage INTEGER,
	FOREIGN KEY (user_id) REFERENCES User(user_id)
);
/*
CREATE TABLE User_Quizze (
	user_quiz_id INTEGER PRIMARY KEY AUTOINCREMENT
	user_id INTEGER NOT NULL
	quiz_id INTEGER NOT NULL
	FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (quiz_id) REFERENCES Quiz(quiz_id)
);
*/