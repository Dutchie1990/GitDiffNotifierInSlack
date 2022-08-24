const core = require('@actions/core');

function _throw(m) {
  throw m;
}

function getConfig(configName) {
  return core.getInput(configName)
    ? core.getInput(configName)
    : _throw(
        `Missing ${configName} in yml file, please define the required variables`
      );
}

module.exports = {
  getConfig,
};
