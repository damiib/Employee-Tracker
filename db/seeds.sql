INSERT INTO
  department (name)
VALUES("human resources"),("sales"),("IT"),("finance");

INSERT INTO
  role (title, department_id, salary)
VALUES
("human resources rep", 1, 60000),
("sales person", 2, 80000),
("IT tech", 3, 10000),
("Account Assistant", 4, 60000), 
("Human Resource Mananger", 1, 150000), 
("IT Manager", 3, 120000), 
("Sales Manager", 2, 200000), 
("Finance Manager", 4, 150000);

INSERT INTO
employee (first_name, last_name, role_id, manager_id)
VALUES
("Harry", "Jones", 6, NULL),
("Meghan", "Smith", 3, 1), 
("David", "Smith", 8, NULL),
("Samantha","Brice", 4, 3) ;
