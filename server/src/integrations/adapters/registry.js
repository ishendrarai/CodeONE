function getAdapter(platformName) {
  return require('./index').getAdapter(platformName);
}

module.exports = {
  getAdapter,
  getPlatformAdapter: getAdapter,
};
