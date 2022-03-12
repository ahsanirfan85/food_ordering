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

  // Below is the object I want the browser to render upon a GET request.
  // const menu_items = [{
  //   id: 1,
  //   name: 'burgers',
  //   description: 'burgers are cool',
  //   category: 'appetizers',
  //   price: 1000
  // },{
  //   id: 2,
  //   name: 'fries',
  //   description: 'fries are cool',
  //   category: 'side_items',
  //   price: 500
  // },{
  //   id: 3,
  //   name: 'coke',
  //   description: 'coke is cool',
  //   category: 'drinks',
  //   price: 200
  // }];

  // Below is the GET HTTP route endpoint for the browser when it makes the GET request to '/menu_items
  router.get("/", (req, res) => {
    // res.send(menu_items);
    db.query('SELECT * FROM menu_items;')
      .then(data => {
        const menu_items = data.rows;
        res.json({  menu_items  });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message  });
      });
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
