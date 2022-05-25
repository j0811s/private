const config = require('./config');
const browserSync = require('browser-sync');

browserSync.init(config.browserSyncOption);