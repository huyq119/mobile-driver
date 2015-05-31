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

var exec = require('../common/exec');

exports.pass = function() {
  arguments[0] = '  \u001b[32m\u2714 ' + arguments[0] + '\u001b[0m';
  console.log.apply(this, arguments);
};

exports.fail = function() {
  arguments[0] = '  \u001b[31m\u2716 ' + arguments[0] + '\u001b[0m';
  console.log.apply(this, arguments);
};

exports.checkNodeBinary = function *(options) {
  var node_bin = yield exec(options.isWindows ? 'node -e "console.log(process.argv[0])"' : 'which node');

  if (node_bin) {
    this.pass('node evn: %s', node_bin);
  } else {
    this.fail('node evn error: %s', node_bin);
  }

  options.node_bin = node_bin;

  var node_version = yield exec(options.isWindows ? 'node -e "console.log(process.version)"' : 'node --version');

  var version  = 'v1.5.0';

  if (node_version < version) {
    this.fail('node version: %s lower than %s', node_version, version);
  } else {
    this.pass('node version: %s', node_version);
  }

  options.node_version = node_version;
};
