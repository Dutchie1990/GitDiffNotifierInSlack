const core = require('@actions/core');

function _throw(m) {
  throw m;
}

function getCompareURL() {
  return core.getInput('compareURL')
    ? core.getInput('compareURL')
    : _throw(
        'Missing compareURL in yml file, please define the required variables'
      );
}

function getProjectNames() {
  return core.getInput('projectNames')
    ? core.getInput('projectNames')
    : _throw(
        'Missing projectNames in yml file, please define the required variables'
      );
}

function getSlackWebhook() {
  return core.getInput('slackWebhook')
    ? core.getInput('slackWebhook')
    : _throw(
        'Missing slackWebhook in yml file, please define the required variables'
      );
}

function getRepository() {
  return core.getInput('repository')
    ? core.getInput('repository')
    : _throw(
        'Missing repository in yml file, please define the required variables'
      );
}

function getAuthToken() {
  return core.getInput('authToken')
    ? core.getInput('authToken')
    : _throw(
        'Missing authToken in yml file, please define the required variables'
      );
}

function getJiraURL() {
  return core.getInput('jiraURL')
    ? core.getInput('jiraURL')
    : _throw(
        'Missing jiraURL in yml file, please define the required variables'
      );
}

function getRepositoryType() {
  return core.getInput('repositoryKind')
    ? core.getInput('repositoryKind')
    : _throw(
        'Missing repositoryKind in yml file, please define the required variables'
      );
}

module.exports = {
  getCompareURL,
  getProjectNames,
  getSlackWebhook,
  getRepository,
  getAuthToken,
  getJiraURL,
  getRepositoryType,
};
