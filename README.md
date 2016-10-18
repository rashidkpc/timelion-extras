# timelion-extras

This is an example plugin for timelion that implements both a `datasource` and a `chainable` function. Both are well, useless, and serve entirely to demonstrate how to create a plugin for timelion.

### .aggregate(functionName)
`.aggregate()` creates a flat line based on a function, the names of which are probably self explanatory: avg, min, max, last, sum, cardinality  

### .orderby(functionName, direction)
`.orderby()` orders a multiple series list by a function, the names of which are probably self explanatory: avg, min, max, last, sum, cardinality, label. The list can be sorted in ascending (asc) or descending (desc) order.

## Installing
I don't usually publish a package for this, but installing directly from Github is fairly simple:

1. cd to your `kibana/plugins` directory.
2. `wget https://github.com/rashidkpc/timelion-extras/archive/master.zip`
3. `unzip master.zip`
4. `rm kibana-extras-master/gulpfile.js` (This is a dev environment thing. Kibana won't start if you don't remove `gulpfile.js`)
4. Start kibana (and delete that master.zip if you want, or not, it won't break anything)

Enjoy
