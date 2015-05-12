/*jshint node:true */
/*jslint node:true */
/*global require */
/*global module */

'use strict';

var config  = require('./config');
var map     = require('map-stream');
var	gutil   = require('gulp-util');
var	os      = require('os');
var chalk   = require('chalk');
var	exec    = require('child_process').exec;
var core    = require('./lib/phpspec.js');


// PLUGIN MAIN ENTRYPOINT
// =============================================================================

module.exports = function (command, opt) {

	var counter = 0;

	// this will typically take place when user supplied `options` parameter without defining path to PHPSpec
	if (typeof command === 'object') {
		throw new Error(config.messages.invalidBinary);
	}

	// if path to phpspec bin not supplied, use default vendor/bin path
	if (! command) {
		command = './vendor/bin/phpspec run';
		if (os.platform() === 'win32') {
			command = '.\\vendor\\bin\\phpspec run';
		}
	} else {
		if ( command.indexOf('run') === -1) {
			command += ' run';
		}
	}

	if ( ! opt) { opt = {} ; }

	command = core.buildCommand(command, opt);

	if ( opt.testing ) {
		return command;
	}

	return map(function (file, cb) {

		var cmd      = '';

		if (counter === 0) {
			counter++;

			if (opt.debug) {
				gutil.log(chalk.yellow('\n       *** Debug Cmd: ' + cmd + '***\n'));
			}

			if(opt.testing) {
				return cmd;
			} else {
				// execute call
				exec(cmd, function (error, stdout, stderr) {

					// handle any errors and log output to buffer
					if (!opt.silent && stderr) {
						gutil.log(chalk.red(stderr));
					}

					if (stdout) {
						stdout = stdout.trim(); // Trim trailing cr-lf
					}

					if (!opt.silent && stdout) {
						gutil.log(stdout);
					}

					if (opt.debug && error) {
						gutil.log(chalk.red(error));
					}

					if (opt.notify) {
						cb(error, file);
					}

				});
			}
		} else {
			return cb(null, file);
		}

	});

};
