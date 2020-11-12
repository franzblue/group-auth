const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "item"';
  pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    }).catch(error => {
      res.sendStatus(500);
      alert('error in GET', error);
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  const queryText = `INSERT INTO "item" ("description", "image_url", "user_id") VALUES ($1, $2, $3)`;
  pool.query(queryText, [req.body.description, req.body.imageUrl, req.user.id])
    .then(result => {
      res.sendStatus(201);
    }).catch(error => {
      res.sendStatus(500);
      alert('error', error);
    });
  // code here
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  const queryText = `DELETE FROM "item" WHERE "id" = $1`;
  pool.query(queryText, [req.params.id])
    .then(result => {
      res.sendStatus(201);
    }).catch(error => {
      res.sendStatus(500);
      alert('error', error);
    })
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // PUT route code here
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // GET /count route code here
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // GET item route code here
});

module.exports = router;
