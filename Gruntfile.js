module.exports = function (grunt) {
  'use strict';

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('cuked-zombie');
  
  grunt.initConfig({
     cucumberjs: {
      // config for all features when called with: `grunt cucumber`
      all: {
        src: 'features',
        options: {
          steps: "tests/js/cucumber/bootstrap.js",
          format: "pretty"
        }
      },

      // config for single features when called with `grunt --filter some-feature`
      features: {
        src: 'features',
        options: {
          steps: "tests/js/cucumber/bootstrap.js",
          format: "pretty"
        }
      }
    },

    copy: {
      "config-dev": {
        files: [
          {expand: true, cwd: "src/js", src: ['config.js'], dest: 'www/assets/js'}
        ]
      },
      "config": {
        files: [
          {src: ['src/js/config_live.js'], dest: 'www/assets/js/config.js'}
        ]
      },
      "css": {
        files: [
          {expand: true, cwd: "Resources/assets/css", src: ['**/*'], dest: 'www/assets/css'}
        ]
      },
      "img": {
        files: [
          {expand: true, cwd: "Resources/assets/img", src: ['**/*'], dest: 'www/assets/img'}
        ]
      },
    },

    uglify: {
      'requirejswithconfig': {
        options: {
          beautify: !!grunt.option('no-uglify'),
        },
        files: {
          'www/assets/js/load-require.js': ['www/assets/js/config.js', 'src/js/lib/require.js']
        }
      }
    },

    watch: {
      'css': {
        options: {
          atBegin: true
        },
        files: ['Resources/assets/css/**/*'],
        tasks: ['copy:css']
      }
    }
  });

  grunt.registerTask('build-dev', ['copy:config-dev', 'copy:css', 'copy:img', 'uglify:requirejswithconfig']);
  grunt.registerTask('build', ['copy:config', 'copy:css', 'copy:img', 'uglify:requirejswithconfig']);
};