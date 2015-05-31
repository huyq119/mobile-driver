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

var co = require('co');
var fs = require('fs');
var path = require('path');
var detect = require('detect-port');
var AppiumSDK = require('appium-sdk');
var logger = require('../common/logger');

var file = path.join(__dirname, '..', '..', '.config.json');

function *parseOptions(options) {
  var port = yield detect(options.port);

  if (port !== options.port) {
    logger.info('port: %d was occupied, changed port: %d', options.port, port);
    options.port = port;
  }
}

function *bootstrap(options) {
  yield parseOptions(options);

  var appium = new AppiumSDK(options);

  appium.start(function() {
    logger.info('appium sdk launched');
    fs.writeFileSync(file, JSON.stringify(appium.options), 'utf8');
    options.callback && options.callback(appium.options);
  });
}

module.exports = co(bootstrap);
