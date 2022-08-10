INSERT INTO departments (name)
VALUES ('Sales'),
('Engineering'),
('Law'),
('Finance');
INSERT INTO roles (title, salary, department_id)
VALUES ('Sales', 85000, 1),
       ('Engineering', 100000, 2),
       ('Law', 90000, 3),
       ('Finance', 95000, 4);
INSERT INTO employees (first_name, last_name, role_id, manager)
VALUES ('Chris','Hemsworth',1, 'Mark Ruffalo'),
       ('Tom', 'Hiddleston', 1, 'Mark Ruffalo'),
       ('Jeremy', 'Renner', 1, 'Mark Ruffalo'),
       ('Samuel', 'L.Jackson', 2, 'Robert Downey Jr.'),
       ('Cobie', 'Smulders', 2,'Robert Downey Jr.'),
       ('Paul', 'Bettany', 2,'Robert Downey Jr.'),
       ('Tina', 'Benko', 3, 'Scarelett Johannson'),
       ('Alexis', 'Denisof', 3, 'Scarelett Johannson'),
       ('Stellan', 'Skarsgard', 4, 'Chris Evans'),
       ('Jeff', 'Wolfe', 3, 'Scarelett Johannson');