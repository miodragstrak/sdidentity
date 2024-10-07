const request = require('request');

// Guesty API credentials
require('dotenv').config();
const client_secret = process.env.CLIENTSECRET;
const client_id = process.env.CLIENTID;

// Function to obtain the access token
function getGuestyAccessToken(callback) {
    const options = {
        method: 'POST',
        url: 'https://open-api.guesty.com/oauth2/token',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'grant_type': 'client_credentials',
            'scope': 'open-api',
            'client_secret': client_secret,
            'client_id': client_id
        }
    };

    request(options, function (error, response) {
        if (error) {
            console.error('Error obtaining access token:', error);
            callback(error, null);
        } else {
            const body = JSON.parse(response.body);
            const token = body.access_token;
            callback(null, token); // Send the token back using the callback
        }
    });
}

module.exports = getGuestyAccessToken;