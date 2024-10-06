const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

app.get('/timestamp', (req, res) => {
  const DEFAULT_DURATION = 1;
  const { d: durationParam } = req.query;
  const rawDuration = durationParam || DEFAULT_DURATION;
  const intDuration = parseInt(rawDuration, 10);
  const duration = isNaN(intDuration) ? DEFAULT_DURATION : intDuration;

  const timestamp = Date.now() % duration;
  return res.status(200).send(timestamp.toString());
});

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});

module.exports = app;
