/* ================================================================
 * mobile-driver by xdf(xudafeng[at]126.com)
 *
 * first created at : Tue Mar 17 2015 00:16:10 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var logger = require('../common/logger');
var server = require('../server');

var file = path.join(__dirname, '..', '..', '.config.json');

function killPorcess(callback) {

  if (fs.existsSync(file)) {
    var options = require(file);
    var pid = options.pid;
    spawn('kill', ['-SIGKILL', pid]);
    logger.info('server process quit pid:%d', pid);

    setTimeout(function() {
      callback && callback(options);
    }, 1000);
  }
}

module.exports = function(signal) {
  switch(signal) {
    case 'stop':
      killPorcess();
      break;
    case 'restart':
      killPorcess(function(options) {
        logger.info('restart server with config: %j', options);
        server(options);
      });
      break;
    default:
      logger.warn('arguments `%s` invalid', signal || 'undefined');
      break;
  }
};
