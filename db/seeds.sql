
-- insert data in table department--
INSERT INTO department(dep_name)
VALUES( "Sales"),
( "Engineering"),
( "Finance"),
("Legal");


-- insert data in table role--
INSERT INTO role ( title, salary, department_id)
VALUES("Sales Lead", 100000, 1 ),
("Salesperson", 8000, 1),
( "Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Account Manager", 160000, 3),
("Accountant", 125000, 3),
( "Legal Lawyer", 250000, 4),
( "Lawyer", 190000,4);


-- insert data in table employee--
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("John","Doe", 1, 1),
( "Mike", "Chan", 2, 2),
("Ashley", "Rodriguez", 3, 3),
( "Kevin", "Tupik", 4, 4),
("Kunal", "Singh", 5, 5),
("Malia", "Brown", 6, 6),
("Sarah", "Lourd", 7, 7),
("Tom", "Allen", 8, 8);