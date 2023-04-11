SHOW DATABASES;
DROP DATABASE blog;
SHOW DATABASES;
USE blog;
CREATE DATABASE blog;
CREATE TABLE post (
    `post_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `subtitle` VARCHAR (255) DEFAULT '',
    `category` VARCHAR (255) DEFAULT '',    
    `image_url` VARCHAR (255) DEFAULT '',
    `author_id` INT NOT NULL,
    `publish_date` VARCHAR (255) DEFAULT '',
    `text` TEXT,
    `featured` TINYINT(1) DEFAULT 0
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW TABLES;
SHOW CREATE TABLE post;