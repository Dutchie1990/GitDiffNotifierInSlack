const axios = require('axios');

const headers = { 'Content-Type': 'application/json; charset=utf-8' };

async function sendMessage(message, to) {
  return axios
    .post(to, JSON.stringify(message), { headers: headers })
    .then((res) => {
      console.log(res.status);
    })
    .catch((res) => {
      throw new Error(`Request failed with status ${res.status}`);
    });
}

module.exports = sendMessage;
