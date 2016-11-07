var alter = require('../../../../src/core_plugins/timelion/server/lib/alter.js');
var Chainable = require('../../../../src/core_plugins/timelion/server/lib/classes/chainable');

module.exports = new Chainable('label_by_es_term', {
  args: [
    {
      name: 'inputSeries',
      types: ['seriesList']
    }
  ],
  help: 'Creates a static line based on result of processing all points in the series.',
  fn: function aggregateFn(args) {
    return alter(args, function (eachSeries) {
      eachSeries.label = eachSeries.label.replace(/.*:(.*)\ >.*/, '$1');
      return eachSeries;
    });
  }
});
