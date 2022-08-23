const core = require('@actions/core');

function _throw(m) {
  throw m;
}

function getConfigL(configName) {
  return core.getInput(configName)
    ? core.getInput(configName)
    : _throw(
        `Missing ${configName} in yml file, please define the required variables`
      );
}

module.exports = {
  getConfigL,
};
