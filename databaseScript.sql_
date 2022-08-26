DROP DATABASE IF EXISTS Head_devs_db;

CREATE DATABASE Head_devs_db;

CREATE TABLE Head_devs_db.user(
	id INTEGER NOT NULL AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    googleId VARCHAR(100),
    CONSTRAINT PRIMARY KEY(id)
) engine = InnoDB;

CREATE TABLE Head_devs_db.category(
	id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    CONSTRAINT PRIMARY KEY(id)
) engine = InnoDB;

CREATE TABLE Head_devs_db.profile(
	id INTEGER NOT NULL AUTO_INCREMENT,
    photo VARCHAR(100),
    position VARCHAR(255) NOT NULL,
    price INTEGER,
    english_level VARCHAR(100) NOT NULL,
    description VARCHAR(1000),
    category_id INTEGER,
    CONSTRAINT PRIMARY KEY(id),
    FOREIGN KEY(category_id) REFERENCES category(id)
) engine = InnoDB;

CREATE TABLE Head_devs_db.education(
	id INTEGER NOT NULL AUTO_INCREMENT,
    description VARCHAR(1000),
    start_date DATE,
    end_date DATE,
    CONSTRAINT PRIMARY KEY(id)
) engine = InnoDB;

CREATE TABLE Head_devs_db.experience(
	id INTEGER NOT NULL AUTO_INCREMENT,
    description VARCHAR(1000),
    start_date DATE,
    end_date DATE,
    CONSTRAINT PRIMARY KEY(id)
) engine = InnoDB;

CREATE TABLE Head_devs_db.skills(
	id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    CONSTRAINT PRIMARY KEY(id)
) engine = InnoDB;

CREATE TABLE Head_devs_db.forgot_password(
    id INTEGER NOT NULL AUTO_INCREMENT,
    link VARCHAR(1000),
    CONSTRAINT PRIMARY KEY(id)
) engine = InnoDB;