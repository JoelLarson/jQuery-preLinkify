'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    qunit = require('node-qunit-phantomjs');

gulp.task('default', function() {

});

gulp.task('connect', function(){
    connect.server({
        port: 8089
    });
});

gulp.task('qunit', function() {
    qunit('./tests/test-runner.html');
});

gulp.task('test', ['connect', 'qunit']);