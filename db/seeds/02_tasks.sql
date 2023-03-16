INSERT INTO tasks (title, category) VALUES ('watch titanic', 'movies_tv');
INSERT INTO tasks (title, category) VALUES ('bananas', 'products');
INSERT INTO tasks (title, category) VALUES ('Untamed', 'books');
INSERT INTO tasks (title, category) VALUES ('Wendys', 'food');
INSERT INTO tasks (title, category) VALUES ('The Last of Us', 'movies_tv');

-- is_completed tasks below --

INSERT INTO tasks (title, category, is_completed) VALUES ('how to code', 'books', true);
INSERT INTO tasks (title, category, is_completed) VALUES ('Game of Thrones', 'movies_tv', true);
INSERT INTO tasks (title, category, is_completed) VALUES ('grocery shopping', 'products', true);

-- is_deleted true --

INSERT INTO tasks (title, category, is_deleted) VALUES ('harry potter', 'books', true);
INSERT INTO tasks (title, category, is_deleted) VALUES ('silicon valley', 'movies_tv', true);
INSERT INTO tasks (title, category, is_deleted) VALUES ('macbook', 'products', true);

-- is_deleted true --

INSERT INTO tasks (title, category, is_important) VALUES ('Starbucks', 'food', true);
INSERT INTO tasks (title, category, is_important) VALUES ('Moby Dick', 'books', true);
INSERT INTO tasks (title, category, is_important) VALUES ('iPhone', 'products', true);

