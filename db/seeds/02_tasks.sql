INSERT INTO tasks (title, category, date) VALUES ('Watch Titanic', 'Movies/TV', '2023-03-05');
INSERT INTO tasks (title, category, date) VALUES ('Buy Bananas', 'Shopping', '2023-03-08');
INSERT INTO tasks (title, category, date) VALUES ('Untamed', 'Books', '2023-03-10');
INSERT INTO tasks (title, category, date) VALUES ('Order Wendys', 'Restaurants', '2023-03-11');
INSERT INTO tasks (title, category, date, is_important) VALUES ('The Last of Us', 'Movies/TV', '2023-03-15', true);

-- is_completed tasks below --

INSERT INTO tasks (title, category, is_completed) VALUES ('How to Code', 'Books', true);
INSERT INTO tasks (title, category, is_completed) VALUES ('Game of Thrones', 'Movies/TV', true);
INSERT INTO tasks (title, category, is_completed) VALUES ('Grocery Shopping', 'Shopping', true);

-- is_deleted true --

INSERT INTO tasks (title, category, is_deleted) VALUES ('Harry Potter', 'Books', true);
INSERT INTO tasks (title, category, is_deleted) VALUES ('Silicon Valley', 'Movies/TV', true);
INSERT INTO tasks (title, category, is_deleted) VALUES ('Socks', 'Shopping', true);

-- is_deleted true --

INSERT INTO tasks (title, category, is_important) VALUES ('Starbucks', 'Restaurants', true);
INSERT INTO tasks (title, category, is_important) VALUES ('Infinite Jest', 'Books', true);
INSERT INTO tasks (title, category, is_important) VALUES ('Moms Bday Present', 'Shopping', true);

