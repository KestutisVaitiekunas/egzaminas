CREATE DATABASE IF NOT EXISTS example_test;

USE example_test;

CREATE TABLE IF NOT EXISTS assets (
    id int(11) NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS users (
    id int(11) NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    role int(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO assets (title) VALUES ('test_asset');


