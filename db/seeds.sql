INSERT INTO department (name)
VALUES
('Makeup'),
('Hair'),
('Nails'),
('Wardrobe')

INSERT INTO role (title, salary, department_id)
VALUES
('First year mua', 890, 1),
('Second year mua', 1100, 2),
('Second year mua', 1100, 3),
('Third year mua', 1250, 4),
('First year hair', 550, 1),
('second year hair', 700, 2),
('second year hair', 700, 3),
('third year hair', 800, 4),
('one nail', 600,1),
('two nail', 700, 2),
('one wd', 900, 3),
('two wd', 1000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Katy', 'Lee', 1, NULL, true),
('Maty', 'kee', 3, 1, true),
('Amy', 'keen', 4, 1, true),
('Stacy', 'Flex', 2, 1, true),
('Desi', 'Perk', 6, 4, false),
('Ann', 'Flen', 5, 1, false),
('Tana', 'Daly', 7, 3, false),
('Gabby', 'Row', 8, 2, false),
('Mario', 'Readro', 9, 1, false),
('Riri', 'James', 10, 2, false),
('Nikki', 'Smith', 11, 3, false),
('Selena', 'Zara', 12, 4, false);

INSERT INTO manager (first_name, last_name)
SELECT first_name, last_name
FROM employee 
WHERE is_manager = 1
