// Karma configuration
// Generated on Tue Mar 17 2015 22:33:25 GMT-0400 (EDT)

var baseConfig = require('./karma-base-config')();

module.exports = function(config) {
  baseConfig.logLevel = config.LOG_INFO;

  config.set(baseConfig);
};
