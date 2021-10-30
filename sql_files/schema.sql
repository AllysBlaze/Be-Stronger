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
    email VARCHAR(100) NOT NULL UNIQUE,
    user_password CHAR(60) NOT NULL,
    user_weight FLOAT,
    user_height FLOAT,
    user_birth DATE,
    user_gender CHAR(1),
    user_photo VARCHAR(200) DEFAULT '/images/jobs.png',
    training_weekly_time_goal TIME DEFAULT ('06:00:00')
);

CREATE TABLE training_sets(
    set_id  INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    set_duration TIME DEFAULT ('00:00:00'),
    set_author_id INT UNSIGNED,
    set_name VARCHAR(50) DEFAULT 'trening',
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
    training_category ENUM('custom', 'jazda na rowerze', 'jazda na rolkach', 'trekking', 'joga', 'skakanie na skakance', 'pływanie','bieganie') DEFAULT 'custom',
    training_custom_id INT UNSIGNED,
    training_duration TIME NOT NULL DEFAULT '00:00:00',
    training_date DATETIME NOT NULL,
    PRIMARY KEY (training_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


