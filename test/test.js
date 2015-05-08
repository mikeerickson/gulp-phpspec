/*jshint node:true */
/*jslint node:true */
/*global require */
/*global describe */
/*global it */

'use strict';

var phpspec = require('../'),
    should  = require('should');

require('mocha');

describe('gulp-phpspec', function() {

		it('should not error if no parameters passed', function(done) {

			var caughtErr;

			try {
				phpspec();
			} catch (err) {
				caughtErr = err;
			}

			should.not.exist(caughtErr);
			//caughtErr.message.indexOf('required').should.be.above(-1);
			done();
		});

		it('should throw error if object passed as first parameter', function(done){

			// arrange
			var caughtErr;

			// act
			try {
				phpspec({debug: true});
			} catch (err) {
				caughtErr = err;
			}

			// assert
			should.exist(caughtErr);
			caughtErr.message.should.equal('Invalid PHPSpec Binary');

			done();

		});

		it('should test dryRun [*** for testing only ***]', function(done){

			var caughtErr;
			var result = '';
			var options = {dryRun: true, testing: true};

			try {
				result = phpspec('',options);
			} catch (err) {
				caughtErr = err;
			}

			should.not.exist(caughtErr);
			//console.log('message', caughtErr);
			//caughtErr.message.should.equal('Invalid PHPSpec Binary');

			done();

		});

});
