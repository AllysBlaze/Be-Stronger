DROP DATABASE projekt;

CREATE DATABASE projekt;


USE projekt;

DROP TABLE users;


CREATE TABLE users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(100),
    email VARCHAR(100),
    user_password VARCHAR(100)
)