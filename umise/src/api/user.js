import AWS from 'aws-sdk';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const configs = require('../../../config.js');

// console.log(configs);
// console.log(configs.POOL_ID);
// console.log(configs.CLIENT_ID);

const poolData = {
  UserPoolId: configs.POOL_ID,
  ClientId: configs.CLIENT_ID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var cognitoUser = "";

// const getIAMCredentials = (idToken) => {
//   // const awsRegion = process.env.VUE_APP_AWS_REGION;
//   const awsRegion = "us-east-2";
//   const userPoolUrl = `cognito-idp.${awsRegion}.amazonaws.com/${poolData.UserPoolId}`;

//   console.log("idToken :", idToken);
//   return new Promise((resolve, reject) => {
//     AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//       // IdentityPoolId: process.env.VUE_APP_IDENTITY_POOL_ID,
//       IdentityPoolId: 'us-east-2:3d4fe29b-059e-4562-81ab-ab84e6b4a776',
//       Logins: { [userPoolUrl]: idToken },
//     });
//     if (!AWS.config.credentials.expired) {
//       return resolve(AWS.config.credentials);
//     }
//     AWS.config.region = awsRegion;
//     AWS.config.credentials.refresh((error) => {
//       if (error) {
//         return reject(error);
//       }
//       return resolve(AWS.config.credentials);
//     });
//     return true;
//   });
// };

export default {
  login(Username, Password) {
    const authenticationData = { Username, Password };

    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    const userData = {
      Pool: userPool,
      Username,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: result =>{
            resolve({ status: 1, data:  result.getIdToken(),});
          },

        onFailure: err => reject(err),
        // newPasswordRequired: (userAttributes, requiredAttributes) =>
        //   resolve({
        //     status: 2,
        //     data: {
        //       userAttributes,
        //       requiredAttributes,
        //       cognitoUser,
        //     },
        //   }),
      });
    });
  },

  // signup(Username, Password, email) {

  //   const authenticationData = { Username, Password, email };
  //   const poolData = {
  //     UserPoolId: 'us-west-2_uJLztlrtQ',
  //     ClientId: '2igcs733eqdu3iuc90f0uu7jri',
  //   };
  //   var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  //   var attributeList = [];

  //   var dataEmail = {
  //     Name: 'email',
  //     Value: email
  //   };
  //   var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

  //   attributeList.push(attributeEmail);

  //   userPool.signUp(Username, Password, attributeList, null, function(err, result) {
  //     if (err) {
  //       alert(err);
  //       return;
  //     }
  //     cognitoUser = result.user;
  //     console.log('user name is ' + cognitoUser.getUsername());
  //   });
    
  // },

  // confirmverify(code) {
  //   cognitoUser.confirmRegistration(code, true, function(err, result) {
  //                 if (err) {
  //                     alert(err);
  //                     return;
  //                 }
  //                 alert("Verified Successfully. Please Log in again");
  //   });
  
  // },

  // passwordChallenge(cognitoUser, password, userAttributes) {
  //   return new Promise((resolve, reject) => {
  //     cognitoUser.completeNewPasswordChallenge(password, userAttributes, {
  //       onSuccess: result =>
  //         getIAMCredentials(result.getIdToken().getJwtToken()).then(credentials =>
  //           resolve(credentials)),
  //       onFailure: err => reject(err),
  //     });
  //   });
  // },

  // logout() {
  //   let cognitoUser = userPool.getCurrentUser();
  //   return ;
  // },

  // authenticate() {
  //   return new Promise((resolve, reject) => {
  //     const cognitoUser = userPool.getCurrentUser();

  //     if (!cognitoUser) {
  //       return reject(new Error('No user in local storage'));
  //     }

  //     cognitoUser.getSession((err, session) => {
  //       if (err) {
  //         return reject(err);
  //       }

  //       if (!session.isValid()) {
  //         const refreshToken = session.getRefreshToken().getToken();
  //         cognitoUser.refreshSession(refreshToken, (e, result) => {
  //           if (e) {
  //             return reject(new Error('Session cannot be refreshed'));
  //           }
  //           return getIAMCredentials(result.getIdToken().getJwtToken()).then(credentials =>
  //             resolve(credentials));
  //         });
  //       }
  //       return getIAMCredentials(session.getIdToken().getJwtToken()).then(credentials =>
  //         resolve(credentials));
  //     });

  //     return true;
  //   });
  // },
};
