var {User} = require('./../models/user');
var jwt = require('jsonwebtoken');
var request = require('request');
var jwkToPem = require('jwk-to-pem');
const config = require('./../config');
const ServerError = require('./../utils/ServerError');
const poolId = config.POOL_ID;
const iss = 'https://cognito-idp.us-east-2.amazonaws.com/' + poolId;


// var ValidateToken = (pems, token, (err, res)=>{
//     if(err){
//         throw new ServerError(400, err.message);
//     } else {

//         //Fail if the token is not jwt
//         var decodedJwt = jwt.decode(token, {complete: true});
//         console.log(`this is decodedJwe ${JSON.stringify(decodedJwt)}`);
//         if (!decodedJwt) {
//             console.log("Not a valid JWT token");
//             throw new ServerError(400, "Unauthorized. Not a valid JWT token");
//         }

//         //Fail if token is not from your User Pool
//         if (decodedJwt.payload.iss != iss) {
//             console.log("invalid issuer");
//             throw new ServerError(400, "Unauthorized");
//         }

//         //Reject the jwt if it's not an 'Access Token'
//         if (decodedJwt.payload.token_use != 'id') {
//             console.log("Not an id token");
//             throw new ServerError(400, "Unauthorized");
//         }

//         //Get the kid from the token and retrieve corresponding PEM
//         var kid = decodedJwt.header.kid;
//         var pem = pems[kid];
//         if (!pem) {
//             console.log('Invalid access token');
//             throw new ServerError(400, "Unauthorized");
//         }

//         //Verify the signature of the JWT token to ensure it's really coming from your User Pool
//         console.log(`ready to verify the signature of the JWT`);
//         jwt.verify(token, pem, { issuer: iss }, (err, payload) => {
//         if(err) {
//             console.log(`${JSON.stringify(err)}`);
//             // throw new ServerError(400, "Unauthorized");
//             throw new ServerError(400, err.message);
//         }
//         });
//         // return new Promise((resolve, reject) => {
//         //     console.log('success');
//         //     res.status(200).send('success');
//         // }).catch((err)=>{
//         //     res.status(400).send(err.message);
//         // });
//         return 'success';
//     }

// }); 


var ValidateToken = async (pems, token) => {

    //Fail if the token is not jwt
    var decodedJwt = await jwt.decode(token, {complete: true});
    console.log(`this is decodedJwe ${JSON.stringify(decodedJwt)}`);
    if (!decodedJwt) {
        console.log("Not a valid JWT token");
        throw new ServerError(400, "Unauthorized. Not a valid JWT token");
    }

    //Fail if token is not from your User Pool
    if (decodedJwt.payload.iss != iss) {
        console.log("invalid issuer");
        throw new ServerError(400, "Unauthorized");
    }

    //Reject the jwt if it's not an 'Access Token'
    if (decodedJwt.payload.token_use != 'id') {
        console.log("Not an id token");
        throw new ServerError(400, "Unauthorized");
    }

    //Get the kid from the token and retrieve corresponding PEM
    var kid = decodedJwt.header.kid;
    var pem = pems[kid];
    if (!pem) {
        console.log('Invalid access token');
        throw new ServerError(400, "Unauthorized");
    }

    //Verify the signature of the JWT token to ensure it's really coming from your User Pool
    console.log(`ready to verify the signature of the JWT`);
    await jwt.verify(token, pem, { issuer: iss }, (err, payload) => {
      if(err) {
        console.log(`${JSON.stringify(err)}`);
        // throw new ServerError(400, "Unauthorized");
        throw new ServerError(400, err.message);
      }
    });
    return new Promise((resolve, reject) => {
        console.log('success');
        // res.status(200).send('success');
        resolve('success');
    }).catch((err)=>{
        // res.status(400).send(err.message);
        reject(err.message);
    });
    // return 'success';
};


var authenticate = async (req, res, next)=>{
    try {
        var idtoken = req.header('Authorization');
        console.log(`idtoken here ${idtoken}`);
        var pems;

        if (!pems) {
        //Download the JWKs and save it as PEM
        request({
            url: iss + '/.well-known/jwks.json',
            json: true
            }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                pems = {};
                var keys = body['keys'];
                for(var i = 0; i < keys.length; i++) {
                    //Convert each key to PEM
                    var key_id = keys[i].kid;
                    var modulus = keys[i].n;
                    var exponent = keys[i].e;
                    var key_type = keys[i].kty;
                    var jwk = { kty: key_type, n: modulus, e: exponent};
                    var pem = jwkToPem(jwk);
                    pems[key_id] = pem;
                }
                //Now continue with validating the token
                // const result = ValidateToken(pems, idtoken);
                // // console.log(result);
                // console.log("Huangyingying da sa bi")
                // next();
                ValidateToken(pems, idtoken).then((validation)=>{
                    console.log(validation);
                    next();
                }).catch((e)=>{
                    console.log(e.message);
                    res.status(400).send(e.message);
                });
            } else {
                //Unable to download JWKs, fail the call
                res.status(400).send("unable to downllad JWK?");
            }
        });
        } else {
            //PEMs are already downloaded, continue with validating the token
            // const result = ValidateToken(pems, idtoken);
            // console.log(result);
            // next();
            ValidateToken(pems, idtoken).then((validation)=>{
                console.log(validation);
                next();
            }).catch((e)=>{
                res.status(400).send();
            });
            
        };
    } catch(err) {
        console.log('shi zhe li bao cuo le ma')
        res.status(400).send(err.message);
    }
};

module.exports = {ValidateToken, authenticate};