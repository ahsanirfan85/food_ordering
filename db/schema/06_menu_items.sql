-- Drop and recreate menu_items table

DROP TABLE IF EXISTS menu_items CASCADE;

CREATE TABLE menu_items(
id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR(255),
description TEXT,
category VARCHAR(255),
price INT,
photo_url TEXT);
