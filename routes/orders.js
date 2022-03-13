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
    console.log(order.customerName);
    db.query(`
      INSERT INTO orders (name) VALUES ($1) RETURNING *;
    `, [order.customerName])
      .then(data => {
        const order_details = data.rows;
        console.log(order_details);
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
