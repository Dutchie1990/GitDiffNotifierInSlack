const core = require('@actions/core');
const configHelper = require('./lib/configHelper');

async function run() {
  try {
    const INCOMING_WEBHOOK_URL = configHelper.getSlackWebhook();

    const getMessages = require('./lib/api');
    const constructedMessage = await getMessages();

    const createMessage = require('./lib/createMessage');
    const message = createMessage(constructedMessage);

    const sendMessage = require('./lib/sendMessage');
    const json = await sendMessage(message, INCOMING_WEBHOOK_URL);

    core.setOutput('response', json);
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;
