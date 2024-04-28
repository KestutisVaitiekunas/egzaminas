CREATE DATABASE IF NOT EXISTS example_test;

USE example_test;

CREATE TABLE IF NOT EXISTS users (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO users (name) VALUES ('test');



