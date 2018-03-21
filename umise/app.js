const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

app.use(helmet());
app.use(compression());

app.use(express.static('dist'));
app.use('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`));
});

app.listen(8081, err => {
  if (err) {
    console.error(err);
  }
  console.log('Listening 8081');
});
