-- Drop and recreate orders_menu_bridge table

DROP TABLE IF EXISTS orders_menu_bridge CASCADE;

CREATE TABLE orders_menu_bridge(
id SERIAL PRIMARY KEY NOT NULL,
menu_id INTEGER NOT NULL REFERENCES menu_items(id),
order_id INTEGER NOT NULL REFERENCES orders(id),
quantity INTEGER);
