INSERT INTO employee(first_Name, last_Name, department, title, username, password, is_admin) VALUES('Fernando', 'Araujo', 'Engineering', 'Software Engineer', 'fca1', 'pass', true);
INSERT INTO employee(first_Name, last_Name, department, title, username, password, is_admin) VALUES('John', 'Smith', 'Architecture', 'Architect', 'john1', 'pass', false);
INSERT INTO employee(first_Name, last_Name, department, title, username, password, is_admin) VALUES('Juan', 'Ferrera', 'Human Resources', 'Manager', 'juan1', 'pass', true);
INSERT INTO employee(first_Name, last_Name, department, title, username, password, is_admin) VALUES('Yali', 'Gong', 'Education', 'Trainer','yalg1', 'pass', false);
INSERT INTO employee(first_Name, last_Name, department, title, username, password, is_admin) VALUES('Jessica', 'Meza', 'Entertainment', 'Dancer', 'jem1', 'pass', false);
INSERT INTO employee(first_Name, last_Name, department, title, username, password, is_admin) VALUES('Nick', 'Colipiko', 'Sales', 'Sales Manager','nick1', 'pass', false);

INSERT INTO reviews(employee_id, author , title, content) VALUES ('2', 'Juan Ferrera'  , 'Review for John 2018', 'Very good');
INSERT INTO reviews(employee_id, author , title, content) VALUES ('2', 'Fernando Araujo'  , 'Review for John 2019', 'Very good, outstanding achievements in the area of development');
INSERT INTO reviews(employee_id, author , title, content) VALUES ('4', 'Fernando Araujo'  , 'Review for Yali 2019', 'Very good');
INSERT INTO reviews(employee_id, author , title, content) VALUES ('4', 'Juan Ferrera'  , 'Review for Yali 2020', 'Very good, outstanding achievements in the area of development');
INSERT INTO reviews(employee_id, author , title, content) VALUES ('2', 'Fernando Araujo'  , 'Review for John 2018', 'Very good');
INSERT INTO reviews(employee_id, author , title, content) VALUES ('4', 'Juan Ferrera'  , 'Review for Yali 2020', 'Very good, outstanding achievements in the area of development');
INSERT INTO reviews(employee_id, author , title, content) VALUES ('5', 'Juan Ferrera'  , 'Review for Jessica 2020', 'Very good, outstanding achievements in the area of development');
INSERT INTO reviews(employee_id, author , title, content) VALUES ('6', 'Fernando Araujo'  , 'Review for Nick 2018', 'Very good');
INSERT INTO reviews(employee_id, author , title, content) VALUES ('5', 'Juan Ferrera'  , 'Review for Jessica 2020', 'Very good, outstanding achievements in the area of development');
COMMIT;