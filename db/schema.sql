DROP DATABASE IF EXISTS employees_db;


CREATE DATABASE employees_db;

USE employees_db;

Create Tables 

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    deptartment_name VARCHAR(30) NOT NUll,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
   id INT NOT NULL,
   title VARCHAR(30),
   salary DECIMAL,
   department_id INT,
   FOREIGN KEY (department_id) REFERENCES department (id)
   PRIMARY KEY (id)
   ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT NOT NULL,
    employee_department VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES (employee_id)
    FOREIGN KEY (roles_id) REFERENCES roles (id)
    PRIMARY KEY (id)
    ON DELETE SET NULL

);

CREATE TABLE manager (
    id INT NOT NULL,
    mgr_name VARCHAR(30) NOT NULL
);