const { tmdbAxiosInstance } = require("../services/tmdb-axios");

const Movie = require("../models/movie");

exports.getMovie = async (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findById(movieId).then(movie => {
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({
        message: "Movie not found!"
      });
    }
  });
};
