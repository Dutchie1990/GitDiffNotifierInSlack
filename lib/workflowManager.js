const { Octokit } = require('@octokit/rest');
const core = require('@actions/core');
const configHelper = require('./configHelper');

const workflowId = configHelper.getConfig('run_ID');
const auth = configHelper.getConfig('access_token');
const ownerRepo = configHelper.getConfig('organizationRepoName');

const octokit = new Octokit({
  auth,
});

async function cancel() {
  console.log('workflow will be cancelled');

  return await octokit
    .request(`POST /repos/${ownerRepo}/actions/runs/${workflowId}/cancel`)
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
