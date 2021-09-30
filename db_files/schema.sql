DROP DATABASE IF EXISTS projekt;

CREATE DATABASE projekt;


USE projekt;

DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    user_password VARCHAR(100) NOT NULL
);

INSERT INTO users 
(user_name,user_password)
VALUES
('test','test');