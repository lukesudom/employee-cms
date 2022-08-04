INSERT INTO department (deptartment_name)
VALUES 
('Sales'),
('Engineering'),
('Law'),
('Finance');


INSERT INTO roles (title, salary, department_id)
VALUES ('Sales', 85000, 1)
       ('Engineering', 100000, 2)
       ('Law', 90000, 3)
       ('Finance', 95000, 4);

INSERT INTO employee (first_name, last_name, employee_department, salary, manager_id, roles_id)
VALUES ('Chris','Hemsworth','Sales',80000, 5, 7),
       ('Tom', 'Hiddleston', 'Sales', 65000, 5, 2),
       ('Jeremy', 'Renner', 'Sales', 90000, 5, 7),
       ('Samuel', 'L.Jackson', 'Engineering', 100000, 4, 4),
       ('Cobie', 'Smulders', 'Engineering', 95000, 4, 3),
       ('Paul', 'Bettany', 'Engineering', 90000, 4, 4),
       ('Tina', 'Benko', 'Law', 75000, 3, 9),
       ('Alexis', 'Denisof', 'Law', 100000, 3, 8),
       ('Stellan', 'Skarsgard', 'Finance', 95000, 9, 6),
       ('Jeff', 'Wolfe', 'Law', 90000, 3, 8);


INSERT INTO manager (id, mgr_name)
VALUES (5, 'Robert Downey Jr.'),
       (3, 'Scarlett Johannson'),
       (4, 'Chris Evans'),
       (9, 'Mark Ruffalo');


SELECT * FROM employee;
SELECT * FROM roles;
SELECT * FROM department;
SELECT 8 FROM manager;


