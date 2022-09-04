const axios = require('axios');
const configHelper = require('./configHelper');

const {
  createHeader,
  createBody,
  removeDuplicates,
  createEmptyCommitBody,
} = require('./messageHelper');

const compareURL = configHelper.getConfig('compareURL');
const authToken = configHelper.getConfig('authToken');
const repositoryKind = configHelper.getConfig('repositoryKind');

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

let blocks = [];
let haveCommits;
let constructedMessage;

function getMessages() {
  return axios(config)
    .then((res) => {
      if (res.data.total_commits > 0) {
        haveCommits = true;
        blocks = createHeader();
        for (const [commits] in res.data.commits) {
          if (Object.hasOwnProperty.call(res.data.commits, commits)) {
            const element = res.data.commits[commits];
            blocks.push(createBody(element));
          }
        }
      } else {
        blocks.push(createEmptyCommitBody());
        haveCommits = false;
      }
      constructedMessage = removeDuplicates(blocks);
      return { constructedMessage, haveCommits };
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
}

module.exports = getMessages;
