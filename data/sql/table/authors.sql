CREATE TABLE authors (
    `author_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `author_name` VARCHAR(255) NOT NULL,
    `author_image` VARCHAR (255) DEFAULT ''
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_unicode_ci;