-- This query is for when a customer wants to see his order details.

SELECT *
FROM orders
JOIN orders_menu_bridge ON orders_menu_bridge.order_id = orders.id
WHERE orders.id  = 'order_id';
