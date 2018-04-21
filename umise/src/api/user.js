const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: process.env.VUE_APP_POOL_ID,
  ClientId: process.env.VUE_APP_CLIENT_ID,
};

// console.log(process.env.VUE_APP_POOL_ID);
// console.log(process.env.VUE_APP_CLIENT_ID);
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

export default {
  login(Username, Password) {
    const authenticationData = {
      Username,
      Password
    };

    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    const userData = {
      Pool: userPool,
      Username,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: result => {
          resolve({
            status: 1,
            data: result.getIdToken(),
          });
        },
        onFailure: err => reject(err),

      });
    });
  },
};
