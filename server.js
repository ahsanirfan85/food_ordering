// Loading .env data into process.env
require("dotenv").config();

// Defining the Port
const PORT = process.env.PORT || 8080;

// Express App Setup
const express = require("express"); // requiring express
const app = express(); // what does this do?
app.use(express.urlencoded({ extended: true })); // what does this do?
app.use(express.static("public")); // serves up the static files to the front end

// PG database client/connection setup
const { Pool } = require("pg"); // requiring postgresql
const dbParams = require("./lib/db.js"); // requiring the database parameters
const db = new Pool(dbParams); // creating a new connection to the DB
db.connect(); // connecting to the database

// Morgan Setup
const morgan = require("morgan"); // requiring morgan
app.use(morgan("dev")); // use morgan in this file

// SASS Middleware Setup
const sassMiddleware = require("./lib/sass-middleware"); // requiring the sass middleware
app.use(  // what does this do?
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

// Setting the EJS view engine
app.set("view engine", "ejs");

// Requires the DB query that serves up the menu items from the database on the front page
const menuRoutes = require("./routes/menu_items");
app.use("/api/menu_items", menuRoutes(db));

// Requires the DB query that puts the customer's details into the database
const ordersRoutes = require("./routes/orders");
app.use("/api/orders", ordersRoutes(db));

// Requires the DB query that puts the order details into the database
const orderItemsRoutes = require("./routes/order_items");
app.use("/api/order_items", orderItemsRoutes(db));

// requires the routing to send confirmation text messages to both the restaurant owner and the person who put in the order
// const sendSmsRoutes = require("./routes/send_sms");  // Comment or uncomment this as necessary
// app.use("/api/send_sms", sendSmsRoutes(db)); // Comment or uncomment this as necessary

// Route to render the home page
app.get("/", (req, res) => {
  res.render("index");
});

// Route to load the order status page
app.get("/:id", (req, res) => {
  console.log(req.params.id);
  const templateVars = {
    id: req.params.id
  };
  res.render("order", templateVars);
});

// Route to return the order ID number after it has been created after the user places the order
app.get("/api/orders/:id", (req, res) => {
  const orderId = req.params.id;
  db.query(`
    SELECT *
    FROM orders_menu_bridge
    JOIN menu_items
    ON menu_items.id = orders_menu_bridge.menu_id
    JOIN orders
    ON orders.id = orders_menu_bridge.order_id
    WHERE orders_menu_bridge.order_id = $1
  ;`,[orderId])
  .then(data => {
    const order = data.rows;
    res.json({  order  });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message  });
  });
});

// Route to allow restaurant owner to update the order status via text message
app.post('/sms', (req, res) => {
  console.log("Message received!");
  db.query(`
    UPDATE orders
    SET status = 'unknown'
    WHERE id = 76
    RETURNING *
  ;`)
  .then(data => {
    const order = data.rows;
    res.json({  order  });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message  });
  });
});

// Express app listening for requests
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
