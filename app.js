// [Start app]
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const models = require('./models');
const bodyParser = require('body-parser');

const users = require('./routes/users');

const app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(express.static(path.join(`${__dirname}/umise/dist`)));

app.use('/user', users)
app.use('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/umise/dist/index.html`));
});

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await models.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch(err) {
    console.error('Unable to connect to the database:', err);
  };
  // await models.sequelize.sync({force: true});
  await models.sequelize.sync();
  
  app.listen(PORT, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`Listening ${PORT}`);
  });
})();
