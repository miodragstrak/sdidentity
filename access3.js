var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://open-api.guesty.com/oauth2/token',
  'headers': {
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
  if (error) throw new Error(error);
  console.log(response.body);
});