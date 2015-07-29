/**
 * gulp-cache-break
 * https://github.com/takumisaito/gulp-cache-break
 *
 * THIS GULP FILE FOR TEST.
 */

(function (module) {
  'use strict';
  
  var gulp = require('gulp')
    // plugin
    , cacheBreak = require('./index.js')
    // clean
    , rimraf = require('rimraf')
    // test
    , mocha = require('gulp-mocha')
    // utility
    , util = require('gulp-util')
    , PATH = {
        js_one            : './test/fixtures/js_a'
      , js_one_dist       : './test/tmp/js_one'
      , js_one_dist_file  : './test/tmp/js_one/js_a'
      , js_one_exp        : './test/expected/js_one/js_a'
      , js_two            : [
                              './test/fixtures/js_a'
                            , './test/fixtures/js_b'
                            ]
      , js_two_dist       : './test/tmp/js_two'
      , js_two_dist_file  : [
                              './test/tmp/js_two/js_a'
                            , './test/tmp/js_two/js_b'
                            ]
      , js_two_exp        : [
                              './test/expected/js_two/js_a'
                            , './test/expected/js_two/js_b'
                            ]
      // , css_one     : './test/fixtures/css_a'
      // , css_two     : ['./test/fixtures/css_a', './test/fixtures/css_b']
      }
    ;
    
  module.exports = PATH;

  gulp.task('clean', function (cb) {
    rimraf('./test/tmp', cb)
  });
  
  // One file : js
  gulp.task('js-one', ['clean'], function(cb) {
    gulp.src(PATH.js_one)
      .pipe(cacheBreak({
        match: ['libs_a.js', 'main_a.js']
      , replacement: '98765'
      }))
      .pipe(gulp.dest(PATH.js_one_dist))
      .on('end', cb);
  });
  
  // Two file : js
  gulp.task('js-two', ['js-one'], function(cb) {
    gulp.src(PATH.js_two)
      .pipe(cacheBreak({
        match: ['libs_a.js', 'main_b.js']
      , replacement: '12345'
      }))
      .pipe(gulp.dest(PATH.js_two_dist))
      .on('end', cb);
  });
  
  // run test script
  gulp.task('mocha', ['js-two'], function (cb) {
    gulp.src(['test/*.js'], { read: false })
      .pipe(mocha({ reporter: 'spec'}))
      .on('error', util.log);
  })
  
  gulp.task('test', [
    'clean'
  , 'js-one'
  , 'js-two'
  , 'mocha'
  ]);
    
}(module));