/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// Ahsan's Comment: I am putting the below code for testing purposes.

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const order = req.body;
    db.query(`
      INSERT INTO orders (name, status) VALUES ($1, $2) RETURNING *;
    `, [order.customerDetails.customerName, "Your order is being prepared!"])
      .then(data => {
        const order_details = data.rows[0];
        res.json({  order_details  });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message  });
      });
  });
  return router;
};
