const axios = require("axios");
const fs = require("fs");
const path = require("path");
const config = require("../config");

const tmdbAxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 1000
});

tmdbAxiosInstance.interceptors.request.use(conf => {
  conf.params = { api_key: process.env.TMDB_API_KEY };
  return conf;
});

tmdbAxiosInstance.downloadPoster = async function(fileName) {
  const savePath = path.resolve(__dirname, "..", "images", "posters");
  // ENSURE FOLDER EXISTS
  if (!fs.existsSync(path)) {
    fs.mkdirSync(savePath, {recursive: true});
  }
  const writer = fs.createWriteStream(path.resolve(savePath, fileName));

  const response = await tmdbAxiosInstance.get(
    config.tmdbConfig.images.base_url + config.posterSize + "/" + fileName,
    {
      responseType: "stream"
    }
  );

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", err =>
      reject(new Error("Failed to save movie poster!"))
    );
  });
};

function getTMDBConfig() {
  return tmdbAxiosInstance
    .get("/configuration")
    .then(response => {
      config.tmdbConfig = response.data;
    })
    .catch(err => console.log(err));
}

module.exports = { tmdbAxiosInstance, getTMDBConfig };
