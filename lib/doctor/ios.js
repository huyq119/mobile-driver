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

var common = require('./common');
var exec = require('../common/exec');
var _ = require('../common/helper');

exports.xcodeInstalled = function *() {
  var version = yield exec('xcode-select -v');

  if (_.include(version, 'version')) {
    version = version.split('version')[1];
    version = _.trim(version);

    var xcode = yield exec('xcode-select --print-path');
    common.pass('Xcode is installed at: `%s`', xcode);
    common.pass('Xcode Command Line Tools is ready, version: %s', version);
  } else {
    common.fail('Command Line Tools is uninstalled');
  }
};
