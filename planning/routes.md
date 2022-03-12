# HTTP Routes
- menu_items & orders
- menu_items:
  - Browse - GET - /menu_items ```// Main Page```
- orders:
  - Read - GET - /order/:id
  - Edit - POST - /order/:id ```// Only before they've paid for the order.```
  - Add - POST - /order ``` // This is going to happen when they checkout their order.```