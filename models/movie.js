const mongoose = require("mongoose");
const path = require("path");

const { tmdbAxiosInstance } = require("../services/tmdb-axios");

require("mongoose-type-url"); // TO VALIdATE URL TYPE

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    _id: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    imageName: {
      type: String
    },
    imageExt: {
      type: String
    },
    originalLink: {
      type: mongoose.SchemaTypes.Url
    }
  },
  { timestamps: true },
  { _id: false }
);

movieSchema.statics.create = async function(movieId, tmdbMovieData) {
  var imageExt = path.extname(tmdbMovieData.poster_path);
  var imageName = path.basename(tmdbMovieData.poster_path, imageExt);

  // DOWNLOAD POSTER IMAGE
  await tmdbAxiosInstance.downloadPoster(path.basename(tmdbMovieData.poster_path));

  // SAVE TO DB
  return this.findByIdAndUpdate(
    movieId,
    {
      $set: {
        title: tmdbMovieData.title,
        description: tmdbMovieData.overview,
        originalLink: tmdbMovieData.homepage ? tmdbMovieData.homepage : null,
        imageExt: imageExt,
        imageName: imageName
      },
      $setOnInsert: { _id: movieId }
    },
    { upsert: true, new: true }
  ).catch(() => {
    throw Error("Failed to save movie to DB!");
  });
};

module.exports = mongoose.model("Movie", movieSchema);
