SHOW DATABASES;
DROP DATABASE blog;
CREATE DATABASE blog;
USE blog;
CREATE TABLE authors (
    `author_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `author_name` VARCHAR(255) NOT NULL,
    `author_image` LONGTEXT COLLATE utf8mb4_unicode_ci NOT NULL,
    `author_email` VARCHAR (255) DEFAULT '',
    `author_password` VARCHAR (255) DEFAULT '',
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE post (
    `post_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `author_post` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `subtitle` VARCHAR (255) DEFAULT '',
    `category` VARCHAR (255) DEFAULT '',
    `image_url` LONGTEXT COLLATE utf8mb4_unicode_ci NOT NULL,
    `short_image_url` LONGTEXT COLLATE utf8mb4_unicode_ci NOT NULL,
    `publish_date` VARCHAR (255) DEFAULT '',
    `content` TEXT COLLATE utf8mb4_unicode_ci NOT NULL,
    `featured` TINYINT(1) DEFAULT 0
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW TABLES;