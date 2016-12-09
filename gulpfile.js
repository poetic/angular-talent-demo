const gulp = require('gulp');
const prettify = require('gulp-html-prettify');
const download = require('gulp-downloader');
const del = require('del');
const replace = require('gulp-replace');

gulp.task('default', function() {
  del(['index.html']).then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
  });

  download('http://tp-v1.webflow.io/index.html')
    .pipe(replace(/<\/head>/, 
      '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.0/angular.min.js"></script><script src="./app.js"></script><script src="./node_modules/angular-uuid/angular-uuid.js"></script></head>'))
    .pipe(replace(/<body>/, 
      '<body ng-app="angular-talent-demo" ng-controller="TalentFormController" >'))
    .pipe(replace(/<form data-name="Email Form"/, '<form ng-submit="submit()"'))
    .pipe(replace(/(Talent ID): [0-9]+/, '$1: {{talent.id}}'))
    .pipe(replace(/data-w-tab="Tab ([2-9]|1[0-9])"/g, 'data-w-tab="Tab $1" ng-class="{ \'element-disabled\': !talent.id }"'))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('./'))
});
