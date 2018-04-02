require('./config');

// [Start app]
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const models = require('./models');
const bodyParser = require('body-parser');
const cors = require("cors");

const users = require('./routes/users');
const cards = require('./routes/cards');
const records = require('./routes/records');
const friends = require('./routes/friends');


var app = express();


app.use(cors())
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(express.static(path.join(`${__dirname}/umise/dist`)));

app.use('/user', users);
app.use('/card', cards);
app.use('/record', records);
app.use('/friend', friends);
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
  await models.sequelize.sync();
  // models.Records.belongsTo(models.Users, {foreignKey: 'userid'});
  // models.Records.belongsTo(models.Cards, {foreignKey: 'cardid'});

  // models.User.findOne().then(user => {
  //   console.log(user.get('username'));
  // });
  // await models.sequelize.sync({force: true});
  models.User.create({
    username: 'xyh',
    email: 'candice@gmail.com'
  });
  models.User.create({
    username: 'xyh101',
    email: 'candice101@gmail.com'
  });
  models.User.create({
    username: 'xyh102',
    email: 'candice102@gmail.com'
  });

})();

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening ${PORT}`);
});
module.exports = {app};
