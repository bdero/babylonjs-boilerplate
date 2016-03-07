var Stats = require('stats.js'),
  $ = require('jquery');

var stats = new Stats();

stats.setMode(0);

$('body').append(stats.domElement);

module.exports = {
  begin: stats.begin,
  end: stats.end
};
