const axios = require('axios');
const configHelper = require('./configHelper');

const {
  createHeader,
  createBody,
  removeDuplicates,
} = require('./messageHelper');

const compareURL = configHelper.getCompareURL();
const authToken = configHelper.getAuthToken();
const repositoryKind = configHelper.getRepositoryType();

const config =
  repositoryKind === 'private'
    ? {
        method: 'get',
        url: compareURL,
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      }
    : { method: 'get', url: compareURL };

let blocks = createHeader();

function getMessages() {
  return axios(config)
    .then((res) => {
      for (const [commits] in res.data.commits) {
        if (Object.hasOwnProperty.call(res.data.commits, commits)) {
          const element = res.data.commits[commits];
          blocks.push(createBody(element));
        }
      }
      return removeDuplicates(blocks);
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
}

module.exports = getMessages;
