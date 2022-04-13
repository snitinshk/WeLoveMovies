const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

//lists a specific movie by id
function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

// grabs movies that are currently in theaters
function moviesInTheaters() {
  return knex("movies_theaters")
    .join("movies", "movies_theaters.movie_id", "movies.movie_id")
    .select("movies.*")
    .where({ "movies_theaters.is_showing": true })
    .distinct("movies_theaters.movie_id");
}

//grabs theaters that are showing the selected movie
function whereToWatch(movieId) {
  return knex("movies_theaters")
    .join("movies", "movies_theaters.movie_id", "movies.movie_id")
    .join("theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .select("theaters.*")
    .where({ "movies_theaters.movie_id": movieId })
    .distinct("movies_theaters.theater_id");
}

module.exports = {
  list,
  read,
  moviesInTheaters,
  whereToWatch
};