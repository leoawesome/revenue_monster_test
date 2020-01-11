const router = require('express').Router();
const axios = require('axios');
const fs = require('fs');

router.get('/', async (req, res) => {
  try {
    // Get top 20 popular movies
    const moviesRes = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${process.env.apiKey}`);
    const movies = moviesRes.data.results;

    // Generate a new object with information requested
    const result = movies.map((el) => {
      const updatedEl = {
        title: el.title,
        description: el.overview,
        filename: el.poster_path.indexOf('/') !== -1 ? el.poster_path.split('/')[1] : el.poster_path,
        original_link: `https://image.tmdb.org/t/p/w500${el.poster_path}`,
      };

      return updatedEl;
    });

    // Save Movie data into storage/data.json
    fs.writeFileSync('storage/data.json', JSON.stringify({ data: result }, null, 2));

    // Concurrent saving picture stream into storage/picture folder
    result.map(async (el) => {
      const writeStream = await axios.get(el.original_link, { responseType: 'stream' });
      await writeStream.data.pipe(fs.createWriteStream(`storage/picture/${el.filename}`));

      return el;
    });

    return res.json({
      data: result,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.status(400).json({
      message: err,
    });
  }
});

module.exports = router;
