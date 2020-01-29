const { tmdbAxiosInstance } = require("../services/tmdb-axios");

const Movie = require("../models/movie");

exports.putMovie = async (req, res) => {
  const movieId = req.params.movieId;
  try {
    var getMovieResult = await tmdbAxiosInstance.get("/movie/" + movieId);
    var tmdbMovieData = getMovieResult.data;
    try {
      const createMovieResp = await Movie.create(movieId, tmdbMovieData);
      res.status(201).json(createMovieResp);
    } catch (e) {
      res.status(500).json({
        message: e.message
      });
    }
  } catch (e) {
    res.status(404).json({
      message: "Movie not found on TMDB!"
    });
  }
};
