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

  // Below is the GET HTTP route endpoint for the browser when it makes the GET request to '/menu_items
  router.get("/", (req, res) => {
    // res.send(menu_items);
    console.log(req.body);
      res.JSON(req.body);
    // db.query('SELECT * FROM menu_items;')
    //   .then(data => {
    //     const menu_items = data.rows;
    //     res.json({  menu_items  });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message  });
    //   });
  });

  // router.get("/", (req, res) => {
  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  return router;
};
