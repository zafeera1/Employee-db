INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 100000, 1),
('Marketing Manager', 90000, 2),
('Financial Analyst', 95000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Mike', 'Johnson', 3, 1);

INSERT INTO department (name) VALUES
('Engineering'),
('Marketing'),
('Finance');