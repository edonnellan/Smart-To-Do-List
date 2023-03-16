INSERT INTO tasks (title, category) VALUES ('watch titanic', 'Movies/TV');
INSERT INTO tasks (title, category) VALUES ('bananas', 'Shopping');
INSERT INTO tasks (title, category) VALUES ('Untamed', 'Books');
INSERT INTO tasks (title, category) VALUES ('Wendys', 'Restaurants');
INSERT INTO tasks (title, category) VALUES ('The Last of Us', 'Movies/TV');

-- is_completed tasks below --

INSERT INTO tasks (title, category, is_completed) VALUES ('how to code', 'Books', true);
INSERT INTO tasks (title, category, is_completed) VALUES ('Game of Thrones', 'Movies/TV', true);
INSERT INTO tasks (title, category, is_completed) VALUES ('grocery shopping', 'Shopping', true);

-- is_deleted true --

INSERT INTO tasks (title, category, is_deleted) VALUES ('harry potter', 'Books', true);
INSERT INTO tasks (title, category, is_deleted) VALUES ('silicon valley', 'Movies/TV', true);
INSERT INTO tasks (title, category, is_deleted) VALUES ('macbook', 'Shopping', true);

-- is_deleted true --

INSERT INTO tasks (title, category, is_important) VALUES ('Starbucks', 'Restaurants', true);
INSERT INTO tasks (title, category, is_important) VALUES ('Moby Dick', 'Books', true);
INSERT INTO tasks (title, category, is_important) VALUES ('iPhone', 'Shopping', true);

