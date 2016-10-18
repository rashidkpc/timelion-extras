var alter = require('../../../../src/core_plugins/timelion/server/lib/alter.js');
var Chainable = require('../../../../src/core_plugins/timelion/server/lib/classes/chainable');
var _ = require('lodash');
var Promise = require('bluebird');

var functions = {
  avg: require('../aggregate/avg'),
  cardinality: require('../aggregate/cardinality'),
  min: require('../aggregate/min'),
  max: require('../aggregate/max'),
  last: require('../aggregate/last'),
  sum: require('../aggregate/sum'),
  label: _.noop // LOL, you lazy shit.
};

module.exports = new Chainable('orderby', {
  args: [
    {
      name: 'inputSeries',
      types: ['seriesList']
    },
    {
      name: 'function',
      types: ['string'],
      help: 'One of ' + _.keys(functions).join(', ')
    },
    {
      name: 'direction',
      types: ['string'],
      help: 'asc or desc for ascending or descending, respectively. Default: desc'
    }
  ],
  help: 'Reorders the series based on a named function',
  fn: function orderbyFn(args) {
    var fn = functions[args.byName.function];
    var seriesList = args.byName.inputSeries;
    args.byName.direction = args.byName.direction === 'desc' ? 'desc' : 'asc';

    if (!fn) throw new Error('.orderby() function must be one of: ' + _.keys(functions).join(', '));

    seriesList.list = _.sortBy(seriesList.list, (series) => {
      if (args.byName.function === 'label') {
        return series.label;
      } else {
        const values = _.map(series.data, 1);
        return fn(values);
      }
    });


    if (args.byName.direction === 'desc') seriesList.list.reverse();

    return seriesList;
  }
});
