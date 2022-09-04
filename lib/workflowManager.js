const { Octokit } = require('@octokit/rest');
const core = require('@actions/core');
const configHelper = require('./configHelper');

const workflowId = configHelper.getConfig('run_ID');
const auth = configHelper.getConfig('access_token');

const octokit = new Octokit({
  auth,
});

const owner = 'Dutchie1990';
const repo = 'GitDiffNotifierInSlack';

async function cancel() {
  console.log('workflow will be cancelled');

  return await octokit
    .request(`POST /repos/${owner}/${repo}/actions/runs/${workflowId}/cancel`)
    .then((res) => {
      console.log(
        `Cancel run ${workflowId} responded with status ${res.status}`
      );
      core.info('Cancel Complete.');
    })
    .catch((error) => {
      const msg = error.message || error;
      console.log(`Error while canceling workflow_id ${workflowId}: ${msg}`);
      core.setFailed(msg);
    });
}

module.exports = { cancel };
