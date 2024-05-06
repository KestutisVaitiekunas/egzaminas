CREATE DATABASE IF NOT EXISTS example_test;

USE example_test;

CREATE TABLE IF NOT EXISTS users (
    id int(11) NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    role int(255) NOT NULL DEFAULT 1,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS assets (
    id int(11) NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    user_id int(11) NOT NULL,
    image varchar(255) NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS tokens (
    id int(11) NOT NULL AUTO_INCREMENT,
    token varchar(255) NOT NULL,
    user_id int(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO assets (title) VALUES ('test_asset');


