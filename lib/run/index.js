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

var path = require('path');
var mocha = require('./mocha');
var server = require('../server');
var signal = require('../server').signal;

function parseArgs(options) {
  var extname = path.extname(options.directory);

  if (extname === '.js') {
    options.isFile = true;
  }
  options.directory = path.resolve(options.directory);
}

module.exports = function(options) {
  parseArgs(options);

  if (options.server) {
    options.callback = function() {

      mocha(options, function(d) {
        console.log(d);

        signal('stop');
      });
    };
    server(options);
  } else {
    mocha(options, function(d) {
      console.log(d);
    });
  }
};
