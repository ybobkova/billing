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
      "fonts": {
        files: [
          {expand: true, cwd: "Resources/assets/fonts", src: ['**/*'], dest: 'www/assets/fonts'}
        ]
      },
      "jslibs": {
        files: [
          {expand: true, cwd: "node_modules/knockout-sync/src/js", src: ['KnockoutSync/**/*'], dest: 'src/js/lib'},
          {expand: true, cwd: "node_modules/webforge-js-components/src/js/lib", src: ['**/*.js'], dest: 'src/js/lib'},
          {expand: true, cwd: "src/js/lib", src: ['**/*.js'], dest: 'www/assets/js/lib'}
        ]
      },
      "jsmisc": {
        files: [
          {expand: true, src: ['etc/doctrine/model-compiled.json'], dest: 'www/assets/js'},
        ]
      },
    },

    hogan: {
      build: {
        options: {
          binderName : "amd",
          templates : "Resources/tpl/**/*.mustache",
          output : "www/assets/js/templates-compiled.js",
          nameFunc: function(fileName) {
            var nodepath = require( "path" );
            fileName = nodepath.normalize(fileName);

            var pathParts = fileName.split(nodepath.sep).slice(['Resources', 'tpl'].length, -1);
            var namespace = pathParts.length > 0 ? pathParts.join('/')+'/' : '';
            var templateName = namespace+nodepath.basename(fileName, nodepath.extname(fileName));

            return templateName;
          }
        }
      }
    },

    sweepout: {
      packages: {
        options: {
          dir: "src/js/lib",
          configFile: "src/js/config-shimney.js",
          baseUrl: "lib/"
        }
      }
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

    "merge-configs": {
      dev: {
        options: {
          targetFile: 'www/assets/js/config.js',

          configFiles: [
            'src/js/config-shimney.js',
            'src/js/config.js'
          ],

          template: 'src/js/config-template.js'
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

  grunt.registerTask('build-dev', ['hogan', 'sweepout', 'copy:config-dev', 'copy:css', 'copy:img', 'copy:fonts', 'copy:jslibs', 'copy:jsmisc', 'merge-configs:dev', 'uglify:requirejswithconfig']);
  grunt.registerTask('build', ['hogan', 'sweepout', 'copy:config', 'copy:css', 'copy:img', 'copy:fonts', 'copy:jslibs', 'copy:jsmisc', 'uglify:requirejswithconfig']);
};