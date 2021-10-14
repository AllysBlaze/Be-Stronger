DROP DATABASE IF EXISTS projekt;

CREATE DATABASE projekt;


USE projekt;
DROP TABLE IF EXISTS set_excercise;
DROP TABLE IF EXISTS single_excercises;
DROP TABLE IF EXISTS training_sets;
DROP TABLE IF EXISTS trainings;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    user_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    user_password CHAR(60) NOT NULL,
    user_weigth FLOAT,
    user_height FLOAT,
    user_birth DATE,
    user_gender CHAR(1)
);

CREATE TABLE training_sets(
    set_id  INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    set_duration TIME DEFAULT ('00:00:00'),
    set_author_id INT UNSIGNED,
    FOREIGN KEY(set_author_id) REFERENCES users(user_id)
);

CREATE TABLE single_excercises(
    excercise_id  INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    excercise_name VARCHAR(100) NOT NULL,
    excercise_duration TIME DEFAULT '00:00:15'
);

CREATE TABLE set_excercise(
    excercise_id INT UNSIGNED NOT NULL,
    set_id INT UNSIGNED NOT NULL,
    excercise_repetiton INT UNSIGNED NOT NULL,
    excercise_order INT UNSIGNED NOT NULL,
    FOREIGN KEY(set_id) REFERENCES training_sets(set_id),
    FOREIGN KEY(excercise_id) REFERENCES single_excercises(excercise_id)
);

CREATE TABLE trainings(
    training_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    training_category ENUM('rower','bieganie','rolki','custom','chodzenie','plywanie'),
    training_custom_id INT UNSIGNED,
    training_duration TIME NOT NULL DEFAULT '00:00:00',
    training_date DATETIME NOT NULL,
    PRIMARY KEY (training_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO users 
(user_name,user_password)
VALUES
('test','test');

INSERT INTO single_excercises
    (excercise_name, excercise_duration)
    VALUES
    ('przysiady','00:00:20'),
    ('pompki','00:00:15'),
    ('deska: 1min','00:01:00'),
    ('skłony','00:00:10');

INSERT INTO training_sets
(set_author_id)
VALUES
(1);

INSERT INTO set_excercise
(set_id, excercise_id,excercise_repetiton,excercise_order)
VALUES
(1,2,10,1),
(1,3,1,2),
(1,4,10,3),
(1,1,10,4);

SELECT  single_excercises.excercise_name, set_excercise.excercise_repetiton, SEC_TO_TIME( TIME_TO_SEC(single_excercises.excercise_duration) * set_excercise.excercise_repetiton ) AS duration
FROM set_excercise
INNER JOIN single_excercises ON single_excercises.excercise_id = set_excercise.excercise_id;


SELECT SEC_TO_TIME(SUM( TIME_TO_SEC(single_excercises.excercise_duration) * set_excercise.excercise_repetiton )) 
FROM set_excercise
INNER JOIN single_excercises ON single_excercises.excercise_id = set_excercise.excercise_id;


