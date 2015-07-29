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
                            
      , css_one            : './test/fixtures/css_a'
      , css_one_dist       : './test/tmp/css_one'
      , css_one_dist_file  : './test/tmp/css_one/css_a'
      , css_one_exp        : './test/expected/css_one/css_a'
      
      , css_two            : [
                              './test/fixtures/css_a'
                            , './test/fixtures/css_b'
                            ]
      , css_two_dist       : './test/tmp/css_two'
      , css_two_dist_file  : [
                              './test/tmp/css_two/css_a'
                            , './test/tmp/css_two/css_b'
                            ]
      , css_two_exp        : [
                              './test/expected/css_two/css_a'
                            , './test/expected/css_two/css_b'
                            ]
      }
    ;
    
  module.exports = PATH;

  gulp.task('clean', function (cb) {
    rimraf('./test/tmp', cb)
  });
  
  // =============== JS ===============
  // One file
  gulp.task('js-one', ['clean'], function(cb) {
    gulp.src(PATH.js_one)
      .pipe(cacheBreak({
        match: ['libs_a.js', 'main_a.js']
      , replacement: '98765'
      }))
      .pipe(gulp.dest(PATH.js_one_dist))
      .on('end', cb);
  });
  
  // Two files
  gulp.task('js-two', ['js-one'], function(cb) {
    gulp.src(PATH.js_two)
      .pipe(cacheBreak({
        match: ['libs_a.js', 'main_b.js']
      , replacement: '12345'
      }))
      .pipe(gulp.dest(PATH.js_two_dist))
      .on('end', cb);
  });
  
  // =============== CSS ===============
  // One file
  gulp.task('css-one', ['js-two'], function(cb) {
    gulp.src(PATH.css_one)
      .pipe(cacheBreak({
        match: ['main_a.css', 'extra_a.css']
      , replacement: '98765'
      }))
      .pipe(gulp.dest(PATH.css_one_dist))
      .on('end', cb);
  });
  
  // Two files
  gulp.task('css-two', ['css-one'], function(cb) {
    gulp.src(PATH.css_two)
      .pipe(cacheBreak({
        match: ['main_a.css', 'extra_b.css']
      , replacement: '12345'
      }))
      .pipe(gulp.dest(PATH.css_two_dist))
      .on('end', cb);
  });
  
  // Run test script
  gulp.task('mocha', ['css-two'], function (cb) {
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