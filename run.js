const core = require('@actions/core');
const configHelper = require('./lib/configHelper');
const manager = require('./lib/workflowManager');

async function run() {
  try {
    const INCOMING_WEBHOOK_URL = configHelper.getConfig('slackWebhook');

    const getMessages = require('./lib/api');
    const { constructedMessage, haveCommits } = await getMessages();

    const createMessage = require('./lib/createMessage');
    const message = createMessage(constructedMessage);

    const sendMessage = require('./lib/sendMessage');
    const json = await sendMessage(message, INCOMING_WEBHOOK_URL);

    if (!haveCommits) {
      manager.cancel();
    }

    core.setOutput('response', json);
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;
