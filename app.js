// [Start app]
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

app.use(helmet());
app.use(compression());

app.use(express.static('./umise/dist'));
app.use('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`));
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening ${PORT}`);
});
