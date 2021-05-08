const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  console.log('in get', req.query["id"] )
  let id=req.query["id"]
  const query =
   `SELECT "genres".name
    FROM genres
    JOIN movies_genres ON "movies_genres".genre_id=genres.id
    JOIN movies ON "movies".id="movies_genres".movie_id
    WHERE "movies".id= $1
    `;
  pool.query(query,[id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get genres', err);
      res.sendStatus(500)
    })
});

module.exports = router;