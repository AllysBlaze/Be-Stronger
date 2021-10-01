DROP DATABASE IF EXISTS projekt;

CREATE DATABASE projekt;


USE projekt;

DROP TABLE IF EXISTS users;


CREATE TABLE users (
    user_name VARCHAR(100) PRIMARY KEY NOT NULL,
    email VARCHAR(100),
    user_password VARCHAR(100) NOT NULL
);

INSERT INTO users 
(user_name,user_password)
VALUES
('test','test');