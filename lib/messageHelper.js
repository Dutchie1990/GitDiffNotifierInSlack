const moment = require('moment');
const configHelper = require('./configHelper');

const today = moment().format('MMMM Do YYYY');

const companyRepos = JSON.parse(configHelper.getConfigL('projectNames'));
const jiraURL = configHelper.getConfigL('jiraURL');
const repositoryName = configHelper.getConfigL('repository');

function createText(ticketNumber, commit) {
  return companyRepos.some((repo) => ticketNumber.startsWith(repo))
    ? `<${jiraURL}${ticketNumber}|${ticketNumber}> - ${
        commit.commit.message.split('\n')[0]
      }\n*Author:* ${commit.commit.author.name}`
    : `${commit.commit.message.split('\n')[0]}\n*Author:* ${
        commit.commit.author.name
      }`;
}

function createHeader() {
  return [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `:siren2: ${repositoryName} release of ${today} :siren2:`,
        emoji: true,
      },
    },
    {
      type: 'divider',
    },
  ];
}

function createBody(commit) {
  let ticketNumber = commit.commit.message.split('\n')[0];
  ticketNumber = ticketNumber.substring(0, ticketNumber.indexOf(' '));
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: createText(ticketNumber, commit),
    },
  };
}

function removeDuplicates(message) {
  const uniqueText = [];
  const unique = message.filter((element) => {
    const isDuplicate = uniqueText.includes(element.text?.text);
    if (!isDuplicate) {
      uniqueText.push(element.text?.text);
      return true;
    }
    return false;
  });
  return unique;
}

module.exports = { createHeader, createBody, removeDuplicates };
