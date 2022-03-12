-- This query runs when a new order is created, but hasn't been paid for, yet.
-- None of the customer details are required at this stage.
-- This query corresponds to the user clicking the "Checkout" button on the menu page after they have selected the items they want to buy.

INSERT INTO orders (status)
VALUES ('unpaid');
-- RETURNING *; This keyword will be required to return the id of the order just created

-- The query below will use the id returned from the operation above to relate the order with the menu items in it.
INSERT INTO orders_menu_bridge (order_id, menu_id)
VALUE
('order_id','menu_id') -- Whatever the items are. On the server-side, this line will have to be added to the query code as many times as there are menu items in the order.


