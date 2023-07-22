DROP DATABASE IF EXISTS data_db;
CREATE DATABASE data_db;

USE data_db;

CREATE TABLE department(
    id INT NOT NULL  PRIMARY KEY,
    dep_name VARCHAR(30) NOT NULL,
);

CREATE TABLE role(
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL
    FOREIGN KEY (department_id)
    REFRENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee(
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFRENCES role(id)
    FOREIGN KEY (manager_id)
    REFRENCES employee(id)
    ON DELETE SET NULL
);