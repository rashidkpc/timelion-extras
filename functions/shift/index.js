var alter = require('../../../../src/core_plugins/timelion/server/lib/alter.js');
var Chainable = require('../../../../src/core_plugins/timelion/server/lib/classes/chainable');
var moment = require('moment');
var _ = require('lodash');

module.exports = new Chainable('shift', {
  args: [
    {
      name: 'inputSeries',
      types: ['seriesList']
    },
    {
      name: 'count',
      types: ['number'],
      help: 'Shift series backwards or forwards by this many buckets'
    },
  ],
  help: 'Shift data N points one way or the other. Useful for aligning wacky data',
  fn: function shiftFn(args) {
    const config = args.byName;

    return alter(args, function (eachSeries) {

      eachSeries.data = _.map(eachSeries.data, (point, i) => {
        if (i + config.count < 0) return [point[0], null];
        return [point[0], _.get(eachSeries.data[i + config.count], '1')];
      });

      return eachSeries;
    });
  }
});
