SHOW DATABASES;
DROP DATABASE blog;
SHOW DATABASES;
CREATE DATABASE blog;
CREATE TABLE post (
    `post_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `subtitle` VARCHAR (255) DEFAULT '',
    `category` VARCHAR (255) DEFAULT '',
    `author` VARCHAR (255) DEFAULT '',
    `author_url` VARCHAR (255) DEFAULT '',
    `publish_date` VARCHAR (255) DEFAULT '',
    `image_modifier` VARCHAR (255) DEFAULT '',
    `post_thumbnail_url` VARCHAR (255) DEFAULT '',
    `post_image_url` VARCHAR (255) DEFAULT '',
    `text` TEXT,
    `featured` TINYINT(1) DEFAULT 0
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_unicode_ci;
USE blog;
SHOW TABLES;
SHOW CREATE TABLE post;