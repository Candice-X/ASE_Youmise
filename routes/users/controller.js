const ServerError = require('../../utils/ServerError');
const config = require('../../config');

exports.dbCreateUser = async (User, username, email) => {
  let result;
  try{
    let raw = await User.create({
      username,
      email,
    });
    result = raw.get({ plain: true });
    console.log(result);
    return result;
  } catch (err) {
    const message = err.errors.reduce((prev, { message }) => {
      return `${prev}${message}; `;
    }, '');
    throw new ServerError(400, message);
  }
}

exports.signup = async (User, cognito, username, email, password) => {
  const result = await exports.dbCreateUser(User, username, email);

  let params = {
    ClientId: config.CLIENT_ID,
    Password: password,
    Username: username,
    UserAttributes: [
      {
        Name: 'custom:uid',
        Value: result.uid
      },
      {
        Name: 'email',
        Value: email
      }
    ]
  };

  try {
    await cognito.signUp(params).promise();
    return { username: result.username };
  } catch (err) {
    User.destroy({
      where: { uid: result.uid }
    }).then(() => console.log(`delete success, uid: ${result.uid}`))
    throw new ServerError(400, err.message);
  }
};
