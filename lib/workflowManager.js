const { Octokit } = require('@octokit/rest');
const core = require('@actions/core');

const octokit = new Octokit();

const owner = 'Dutchie1990';
const repo = 'GitDiffNotifierInSlack';

function cancel() {
  console.log('workflow will be cancelled');
  const { GITHUB_RUN_ID } = process.env;

  const { data: current_run } = octokit.rest.actions.getWorkflowRun({
    owner,
    repo,
    run_id: Number(GITHUB_RUN_ID),
  });

  const workflowId = current_run.workflow_id;

  try {
    const res = octokit.rest.actions.cancelWorkflowRun({
      owner,
      repo,
      run_id: workflowId,
    });
    console.log(`Cancel run ${workflowId} responded with status ${res.status}`);
    core.info('Cancel Complete.');
  } catch (error) {
    const msg = error.message || error;
    console.log(`Error while canceling workflow_id ${workflowId}: ${msg}`);
    core.setFailed(msg);
  }
}

module.exports = cancel;
