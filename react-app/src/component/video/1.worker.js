console.log('in 1.worker.js');
const _ = require('lodash');

console.log(_.chunk(['a', 'b', 'c', 'd'], 2));
