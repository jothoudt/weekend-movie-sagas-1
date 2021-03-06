const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.get('/:id', (req, res) => {
  // Add query to get a single movie
  console.log('in get single movie', req.query["id"] )
  let id=req.query["id"]
  const query =
   `SELECT "movies".title, "movies".poster, "movies".description
    FROM movies
    WHERE "movies".id= $1;
    `;
  pool.query(query,[id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get single movie', err);
      res.sendStatus(500)
    })
});


router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

router.put('/', (req, res) => {
  console.log('in put', req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  UPDATE "movies" 
  SET title= $1, description= $2
  WHERE "id"= $3
  RETURNING "id";`

  // FIRST QUERY EDITS MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.description, req.body.id.id])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;