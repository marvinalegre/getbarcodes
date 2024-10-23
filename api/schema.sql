DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT);
INSERT INTO users (username, password) VALUES
('marvinalegre', 'foobar'),
('mario', 'qwerty');
