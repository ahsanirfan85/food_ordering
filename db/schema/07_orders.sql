-- Drop and recreate orders table

DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders(
id SERIAL PRIMARY KEY NOT NULL,
date_time TIMESTAMP,
status VARCHAR(255),
name VARCHAR(255),
phone VARCHAR(10),
street VARCHAR(255),
city VARCHAR(255),
postal_code VARCHAR(6),
province VARCHAR(255),
credit_card VARCHAR(16),
credit_card_expiry DATE,
credit_card_cvv INTEGER);
