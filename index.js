(function (module) {
  'use strict';
  
  var PLUGIN_NAME = 'gulp-cache-break'
    , util = require('gulp-util')
    , through = require('through2')
    , breaker = require('cache-breaker')
    , gulpCB = function (option) {
        if (!option.match) {
          throw new util.PluginError(PLUGIN_NAME, "You must provide the 'match' option.");
        }
        
        var stream = through.obj(function(_file, _enc, _cb) {
          var content = _file.contents.toString()
            , broken = breaker.breakCache(content, option.match, option)
            ;
          
          if (_file.isNull()) {
            this.emit('error', new util.PluginError(PLUGIN_NAME, 'No source files were found.'));
            return _cb();
          }
          
          if (broken.length) {
            util.log(PLUGIN_NAME, 'Cache broken in: ' + _file.path);
            _file.contents = new Buffer(broken);
          } else {
            this.emit('error', new util.PluginError(PLUGIN_NAME, 'No changes were made.'));
            return _cb();
          }
          
          this.push(_file);
          _cb();
        });
        
        return stream;
      }
    ;
    
  module.exports = gulpCB;
}(module));