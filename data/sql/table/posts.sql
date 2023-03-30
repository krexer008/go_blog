SHOW DATABASES;
DROP DATABASE blog;
SHOW DATABASES;
CREATE DATABASE blog;
CREATE TABLE post
(
    post_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR (255),
    category VARCHAR (255),
    author VARCHAR (255),
    author_url VARCHAR (255),
    publish_date VARCHAR (255),
    image_modifier VARCHAR (255),
    image_url VARCHAR (255),
    featured TINYINT(1) DEFAULT 0
)
    ENGINE = InnoDB
    CHARACTER SET = utf8mb4
    COLLATE utf8mb4_unicode_ci
;
USE blog;
SHOW TABLES;