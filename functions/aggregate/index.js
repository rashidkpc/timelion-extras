var alter = require('../../../../src/core_plugins/timelion/server/lib/alter.js');
var Chainable = require('../../../../src/core_plugins/timelion/server/lib/classes/chainable');
var _ = require('lodash');

var functions = {
  avg: require('./avg'),
  cardinality: require('./cardinality'),
  min: require('./min'),
  max: require('./max'),
  last: require('./last'),
  first: require('./first'),
  sum: require('./sum')
};

module.exports = new Chainable('aggregate', {
  args: [
    {
      name: 'inputSeries',
      types: ['seriesList']
    },
    {
      name: 'function',
      types: ['string'],
      help: 'One of ' + _.keys(functions).join(', ')
    }
  ],
  help: 'Creates a static line based on result of processing all points in the series.',
  fn: function aggregateFn(args) {
    var fn = functions[args.byName.function];
    if (!fn) throw new Error('.aggregate() function must be one of: ' + _.keys(functions).join(', '));

    return alter(args, function (eachSeries) {
      var times = _.map(eachSeries.data, 0);
      var values = _.map(eachSeries.data, 1);

      eachSeries.data = _.zip(times, _.fill(values, fn(values)));
      return eachSeries;
    });
  }
});
