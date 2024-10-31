PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT);
CREATE TABLE barcodes (id INTEGER PRIMARY KEY, barcode TEXT UNIQUE, product_name TEXT, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(id));
