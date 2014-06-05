module.exports = function (grunt) {
  'use strict';

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.initConfig({
    cucumberjs: {
      src: 'www/tests/features',
      options: {
        steps: 'www/tests/features/step_definitions',
        format: 'pretty'
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

  grunt.registerTask('build-dev', ['copy:config-dev', 'copy:css', 'uglify:requirejswithconfig']);
  grunt.registerTask('build', ['copy:config', 'copy:css', 'uglify:requirejswithconfig']);
};