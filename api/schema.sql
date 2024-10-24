DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT);
INSERT INTO users (id, username, password) VALUES
(1, 'marvinalegre', 'foobar'),
(2, 'mario', 'qwerty');

DROP TABLE IF EXISTS barcodes;
CREATE TABLE IF NOT EXISTS barcodes (id INTEGER PRIMARY KEY, barcode TEXT UNIQUE, product_name TEXT, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(id));
INSERT INTO barcodes (barcode, product_name, user_id) VALUES ('4800030005466', 'Ideal Australia Harvest Whole Rolled Oats 500g', 2),
('0748485200019', '555 Sardines in Tomato Sauce 155g', 1),
('0748485800011', 'Argentina Corned Beef 175g', 1);
