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
var child_process = require('child_process');
var _ = require('../common/helper');

var bin = path.join(__dirname, '..', '..', 'node_modules', 'mocha', 'bin', 'mocha');

module.exports = function(options, callback) {
  var dir = options.isFile ? options.directory : '.';
  var cwd = options.isFile ? path.dirname(options.directory) : options.directory;

  var mocha = child_process.spawn('node', [bin, dir, '--require', 'should'], {
    cwd: cwd
  });

  var result = [];

  mocha.stdout.on('data', function(data) {
    var d = _.trim(data.toString());

    if (_.include(d, 'passing ')) {
      d = '\u001b[32m' + d + '\u001b[0m ';
    } else if(_.include(d, 'failing')) {
      d = '\u001b[31m' + d + '\u001b[0m ';
    }
    result.push(d);
  });

  mocha.stdout.on('close', function() {
    callback && callback(result.join('\n  ') + '\n');
  });

  mocha.stderr.on('data', function(data) {
    result.push(_.trim(data.toString()));
  });

  mocha.stderr.on('close', function() {
  });
};
