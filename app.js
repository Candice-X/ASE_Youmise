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
    
// models.Card.create({
//     types: 1,
//     cardName: 'Drink Card',
//     cardImgURL: 'https://s3.us-east-2.amazonaws.com/umisefrontendimages/card2.png',
//     cardNote: 'card 1',
// });
// models.Card.create({
//     types: 2,
//     cardName: 'Warning Card',
//     cardImgURL: 'https://s3.us-east-2.amazonaws.com/umisefrontendimages/2.jpg',
//     cardNote: 'card 2',
// });

// models.Card.create({
//     types: 2,
//     cardName: 'Gift Card',
//     cardImgURL: 'https://s3.us-east-2.amazonaws.com/umisefrontendimages/card2.png',
//     cardNote: 'card 3',
// });
// models.Card.create({
//     types: 2,
//     cardName: 'Bank Card',
//     cardImgURL: 'https://s3.us-east-2.amazonaws.com/umisefrontendimages/1.jpg',
//     cardNote: 'card 4',
// });
// models.Card.create({
//     types: 1,
//     cardName: 'Chance Card',
//     cardImgURL: 'https://s3.us-east-2.amazonaws.com/umisefrontendimages/3.png',
//     cardNote: 'card 5',
// });
// models.Card.create({
//     types: 1,
//     cardName: 'Run Errand Card',
//     cardImgURL: 'https://s3.us-east-2.amazonaws.com/umisefrontendimages/4.png',
//     cardNote: 'card 6',
// });
// models.Card.create({
//     types: 1,
//     cardName: 'Rely Card',
//     cardImgURL: 'https://s3.us-east-2.amazonaws.com/umisefrontendimages/5.png',
//     cardNote: 'card 7',
// });
// models.Card.create({
//     types: 1,
//     cardName: 'Unconditional Helping Card',
//     cardImgURL: 'https://s3.us-east-2.amazonaws.com/umisefrontendimages/6.png',
//     cardNote: 'card 8',
// });
// models.Card.create({
//     types: 1,
//     cardName: 'Dating Card',
//     cardImgURL: 'https://s3.us-east-2.amazonaws.com/umisefrontendimages/7.png',
//     cardNote: 'card 9',
// });
// models.Card.create({
//     types: 1,
//     cardName: 'Gossip Card',
//     cardImgURL: 'https://s3.us-east-2.amazonaws.com/umisefrontendimages/8.png',
//     cardNote: 'card 10',
// });
// models.Card.create({
//     types: 2,
//     cardName: 'Girlfriends Card',
//     cardImgURL: 'https://s3.us-east-2.amazonaws.com/umisefrontendimages/9.png',
//     cardNote: 'card 11',
// });
// models.Card.create({
//     types: 1,
//     cardName: 'Game Card',
//     cardImgURL: 'https://s3.us-east-2.amazonaws.com/umisefrontendimages/11.png',
//     cardNote: 'card 12',
// });
// models.Card.create({
//     types: 1,
//     cardName: 'Friendzoned Card',
//     cardImgURL: 'https://s3.us-east-2.amazonaws.com/umisefrontendimages/12.png',
//     cardNote: 'card 13',
// });
  // models.User.findOne().then(user => {
  //   console.log(user.get('username'));
  // });
  // await models.sequelize.sync({force: true});
  // models.User.create({
  //   username: 'xyh',
  //   email: 'candice@gmail.com'
  // });
  // models.User.create({
  //   username: 'xyh101',
  //   email: 'candice101@gmail.com'
  // });
  // models.User.create({
  //   username: 'xyh102',
  //   email: 'candice102@gmail.com'
  // });

})();

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening ${PORT}`);
});
module.exports = {app};
