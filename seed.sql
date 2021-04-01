USE employee.js;

SELECT status.id, status.title FROM status ORDER BY department.id;

SELECT department.id, department.name FROM department ORDER BY department.id;
FROM employee
LEFT JOIN status ON (status.id = employee.status_id)
LEFT JOIN department ON (department.id = status.department_id)
ORDER BY department.name;

SELECT CONCAT(managers.first_name, '', managers.last_name) AS managers, department.name 
AS department, employees.id, employees.first_name, employees.last_name, status.title
FROM employees 
LEFT JOIN employees managers ON managers.id = employees.managers_id
INNER JOIN department ON (department.id = status.department_id)
ORDER BY managers;

SELECT status.title, employees.id, employees.first_name, employees.last_name, 
department.name AS department
FROM employees
LEFT JOIN status ON (status.id = employee.status_id)
ORDER BY status.title;


SELECT employees.id, employees.first_name, employees.last_name, status.title, department.name AS department,
CONCAT(managers.first_name, '', managers.last_name) AS managers FROM
LEFT JOIN employees managers ON managers.id = employees.managers_id
INNER JOIN status ON (status.id = employees.status.id)
INNER JOIN department ON (department.id = status.department_id)
ORDER BY employees.id;

SELECT first_name, last_name, status.id FROM employees
