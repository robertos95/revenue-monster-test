const Movie = require("../models/movie");
var moment = require("moment");

exports.getMovie = (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findById(movieId)
    .then(movie => {
      if (movie) {
        res.render("movie/view", {
          movie: movie,
          pageTitle: movie.title,
          path: "/movie",
          moment: moment
        });
      } else {
        res.status(404).send("Movie not found!");
      }
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  Movie.find().then(movies => {
    res.render("movie/index", {
      movies: movies,
      pageTitle: "Movies",
      path: "/index"
    });
  });
};
