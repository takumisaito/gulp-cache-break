(function (global) {
  /* global describe, it, beforeEach */
  'use strict';
  
  
  var should = require('should')
    , fs = require('fs')
    , PATH = require('../gulpfile.js')
    ;
  
  describe('gulp-cache-break', function () {
    var output
      , expected
      ;
    it('should replace js-url : one file', function(done) {
      output = fs.readFileSync(PATH.js_one_dist_file, 'utf-8');
      expected = fs.readFileSync(PATH.js_one_exp, 'utf-8');
      // 比較
      should.equal(output, expected);
      done();
    });
    
    it('should replace js-url : two file', function(done) {
      var i = 0;
      while (i < 2) {
        output = fs.readFileSync(PATH.js_two_dist_file[i], 'utf-8');
        expected = fs.readFileSync(PATH.js_two_exp[i], 'utf-8');
        // 比較
        should.equal(output, expected);
        i = i + 1;
      }
      done();
    });
  });
  
}(this));