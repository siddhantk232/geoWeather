const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/get', (req, res) => {
  const city = req.query.city;

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${
    process.env.WEATHERAPI_KEY
  }&units=metric`;

  axios
    .get(url)
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(err.status || 500).send(err);
    });
});

app.use((__, _, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

app.use((err, __, res, _) => {
  res.status(err.status || 500).json({
    message: err.message
  });
});

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
