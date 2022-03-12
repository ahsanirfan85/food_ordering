-- This query will run when the customer has filled out their details in the form and clicked on the "Place Order" button. The values in the query below are merely place holders. They will be populated with the form data.

UPDATE orders
SET
  status = 'in preparation',
  name = 'name',
  phone = 'phone',
  street = 'street',
  city = 'city',
  postal_code = 'postal code',
  province = 'province',
  credit_card = 'CC number',
  credit_card_expiry = 'CC expiry date',
  credit_card_cvv = 'CC CVV'
WHERE
  id = 'order_id';
