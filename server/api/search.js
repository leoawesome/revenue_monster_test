/* eslint-disable max-len */
const router = require('express').Router();
const fs = require('fs');

router.get('/', async (req, res) => {
  try {
    const {
      title, description, filename,
    } = req.query;
    const originalLink = req.query.original_link;

    // Read data
    const dataBuffer = fs.readFileSync('storage/data.json');
    let { data } = JSON.parse(dataBuffer);

    // Filter out the data that is not part of query
    data = title ? data.filter((el) => el.title.toLowerCase().indexOf(title.toLowerCase()) !== -1) : data;
    data = description ? data.filter((el) => el.description.toLowerCase().indexOf(description.toLowerCase()) !== -1) : data;
    data = filename ? data.filter((el) => el.filename.toLowerCase().indexOf(filename.toLowerCase()) !== -1) : data;
    data = originalLink ? data.filter((el) => el.original_link.toLowerCase().indexOf(originalLink.toLowerCase()) !== -1) : data;

    return res.json({
      data,
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
