'use strict';

require('coffee-script').register();

var path = require('path');
var location = path.join(__dirname, '..', 'lib', 'songdown', 'app-init');

// Clear the cache so that everything is reloaded properly.
require.cache = {};

// Kick everything off!
require(location);
