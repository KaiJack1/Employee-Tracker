DROP DATABASE IF EXISTS employee.js;
CREATE DATABASE employee.js;
USE employee.js;
CREATE TABLE department (
  id INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL 
);
CREATE TABLE employees(
  id INT UNSIGNED  AUTO_INCREMENT, PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  status_id INT UNSIGNED NOT NULL,
  INDEX status_ind (status_id),
  CONSTRAINT fk_status FOREIGN KEY (status_id) REFERENCES status(id) ON DELETE CASCADE ,
  managers_id INT UNSIGNED,
  INDEX man_ind (managers_id),
  CONSTRAINT fk_managers FOREIGN KEY (managers_id) REFERENCES employees(id) ON DELETE SET NULL
);

CREATE TABLE status (
  id INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

use employees;
INSERT INTO department
(name)
VALUES
('Human resources'),
('Marketing'),
('Seniors')
('Assistants');

INSERT INTO status
(title, department_id)
VALUES 
('GM',)
('VP')
('SVP')
('CFO')
INSERT INTO employees
(first_name, last_name, status_id, managers_id)

VALUES 
('Kendra', 'Newton', 1, NOT NULL),
('Jason', 'Livington',2 NOT NULL),
('Austin', 'Goldman',3 NOT NULL),
('Jenna', 'Clearwater',4 NOT NULL),