const knex = require("../db/connection");

function list() {
  return knex("theaters").select("*");
}

function moviesList(theater) {
  return knex("theaters")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .join("movies", "movies_theaters.movie_id", "movies.movie_id")
    .select("movies.*")
    .where({ "theaters.theater_id": theater.theater_id });
}

module.exports = { list, moviesList };