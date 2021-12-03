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
    user_name VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_password CHAR(60) NOT NULL,
    user_weight FLOAT,
    user_height FLOAT,
    user_birth DATE,
    user_photo VARCHAR(200) DEFAULT '/images/jobs.png',
    training_weekly_time_goal TIME DEFAULT ('02:00:00')
);

CREATE TABLE training_sets(
    set_id  INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    set_duration TIME DEFAULT ('00:00:00'),
    set_author_id INT UNSIGNED,
    set_name VARCHAR(50) DEFAULT 'trening',
    set_description VARCHAR(400),
    set_photo  VARCHAR(200),
    kcal INT,
    series INT DEFAULT 1,
    FOREIGN KEY(set_author_id) REFERENCES users(user_id)
);

CREATE TABLE single_excercises(
    excercise_id  INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    excercise_name VARCHAR(100) NOT NULL UNIQUE,
    excercise_duration TIME DEFAULT '00:00:01',
    excercise_description VARCHAR(400),
    kcal_per_100 INT
);

CREATE TABLE set_excercise(
    excercise_id INT UNSIGNED NOT NULL,
    set_id INT UNSIGNED NOT NULL,
    excercise_repetiton INT UNSIGNED NOT NULL,
    excercise_order INT UNSIGNED NOT NULL,
    FOREIGN KEY(set_id) REFERENCES training_sets(set_id),
    FOREIGN KEY(excercise_id) REFERENCES single_excercises(excercise_id)
);


CREATE TABLE training_categories(
    category VARCHAR(100) PRIMARY KEY,
    kcal_per_hour INT
);


CREATE TABLE trainings(
    training_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    training_category VARCHAR(100) DEFAULT 'custom',
    training_custom_id INT UNSIGNED,
    training_duration TIME NOT NULL DEFAULT '00:00:00',
    training_date DATE NOT NULL,
    kcal INT,
    PRIMARY KEY (training_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (training_category) REFERENCES training_categories(category)
);


