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

var env = process.env;

exports.check_ANDROID_HOME = function *() {

  if (typeof env.ANDROID_HOME !== 'undefined') {
    common.pass('ANDROID_HOME is set to `%s`', env.ANDROID_HOME);
  } else {
    common.fail('ANDROID_HOME is not set');
  }
};

exports.check_JAVA_HOME = function *() {

  if (typeof env.JAVA_HOME !== 'undefined') {
    common.pass('JAVA_HOME is set to `%s`', env.JAVA_HOME);
  } else {
    common.fail('JAVA_HOME is not set');
  }
};
