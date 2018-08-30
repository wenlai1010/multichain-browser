/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/17
 */

import log4js from 'log4js';
import requireDir from 'require-dir';

global.logger = log4js.getLogger();
requireDir('./gulp', { recurse: true });
