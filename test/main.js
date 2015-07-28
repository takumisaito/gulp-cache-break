(function () {
  /* global describe, it, beforeEach */
  'use strict';
  
  var cacheBreakPlugin = require('../')
    , File = require('vinyl')
    , should = require('should')
    , fs = require('fs')
    , es = require('event-stream')
    ;
  require('mocha');
  
  describe('gulp-cache-break', function () {
    var dummyFile = {};
    
    describe('cacheBreakPlugin()', function() {
      it('should replace string on a stream', function(done) {
        var dummyFile = new File({
          path: 'fixtures/view.html',
          cwd: './',
          base: 'fixtures',
          contents: fs.createReadStream(__dirname + '/fixtures/view.html')
        })
        
        var stream = cacheBreakPlugin({
              match: ['main.js', 'main.css']
            , replacement: function (){
                  return 'test_query_a'
              }
            })
          ;
          
        stream.on('data', function (newFile) {
          should.exist(newFile);
          should.exist(newFile.contents);
          
          newFile.contents.pipe(es.wait(function (err, data) {
            should.not.exist(err);
            data.should.equal(fs.readFileSync('test/expected/view.html', 'utf8'));
            done();
          }));
        });
        
        stream.write(dummyFile);
        stream.end();
      });
    });
  });
  
}());