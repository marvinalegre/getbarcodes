PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT);
INSERT INTO users VALUES(1,'marvinalegre','foobar');
INSERT INTO users VALUES(2,'mario','qwerty');
CREATE TABLE barcodes (id INTEGER PRIMARY KEY, barcode TEXT UNIQUE, product_name TEXT, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(id));
INSERT INTO barcodes VALUES(1,'4800030005466','Ideal Australia Harvest Whole Rolled Oats 500g',2);
INSERT INTO barcodes VALUES(2,'0748485200019','555 Sardines in Tomato Sauce 155g',1);
INSERT INTO barcodes VALUES(3,'0748485800011','Argentina Corned Beef 175g',1);
