DROP DATABASE IF EXISTS employee.js;
CREATE DATABASE employee.js;
USE employee.js;
CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  artist VARCHAR(45) NULL,
  genre VARCHAR(45) NULL,
  PRIMARY KEY (id)
);