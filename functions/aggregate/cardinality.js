var _ = require('lodash');

module.exports = function (points) {
  return _.uniq(points).length;
};
