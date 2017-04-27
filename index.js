module.exports = function (kibana) {
  return new kibana.Plugin({
    name: 'timelion-extras',
    require: ['timelion'],
    init: function (server) {
      // Initialize your function plugins here.
      server.plugins.timelion.addFunction(require('./functions/aggregate'));
      server.plugins.timelion.addFunction(require('./functions/shift'));
      server.plugins.timelion.addFunction(require('./functions/orderby'));
      server.plugins.timelion.addFunction(require('./functions/label_by_es_term'));
      server.plugins.timelion.addFunction(require('./functions/movingaverage'));
    }
  });
};
