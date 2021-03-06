/*jshint node: true */

"use strict";

module.exports = function(grunt) {

  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    dirs: {
      js: ['app/js/**/*.js', '!app/js/libs/**/*.js'],
      jshint: ['Gruntfile.js','app/js/**/*.js','!app/js/libs/**/*.js'],
      html: ['app/index.html'],
      css: ['app/css/*.css'],
      less: ['app/less/*.less'],
      tests: ['test/**/*.js'],
      dist: 'dist'
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= dirs.dist %>/*',
            '!<%= dirs.dist %>/.git*'
          ]
        }]
      }
    },
    connect: {
      staticserver: {
        options: {
          hostname: 'localhost',
          port: 8001
        }
      },
      server: {
        options: {
          hostname: '*',
          port: 3000,
          middleware: function() {
            return [proxySnippet];
          }
        },
        proxies: [
          {
            context: '/scouts',
            host: 'localhost',
            port: 9000,
            // rewrite: {
            //   '/users': '/users'
            // }
          },
          {
            context: '/advancements',
            host: 'localhost',
            port: 9000
          },
          {
            context: '/requirements',
            host: 'localhost',
            port: 9000
          },
          {
            context: '/',
            host: 'localhost',
            port: 8001
          }
        ]
      }
    },
    hbs: {
      templateExtension : 'hbs'
    },
    jshint: {
      gruntfile: 'Gruntfile.js',
      sources: '<%= dirs.jshint %>',
      options: {
        jshintrc: '.jshintrc'
      }
    },
    less: {
      development: {
        files: {
          'app/css/lily.css': 'app/less/lily.less'
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },
    open: {
      dev : {
        url: 'http://localhost:9000/app'
      },
    },
    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['jshint']
      },
      css: {
        files: ['<%= dirs.css %>']
      },
      less: {
        files: ['<%= dirs.less %>'],
        tasks: ['less']
      },
      html: {
        files: ['<%= dirs.html %>']
      },
      js: {
        files:  '<%= dirs.js %>',
        tasks: ['jshint']
      },
      karma: {
        files: ['<%= dirs.js %>', '<%= dirs.tests %>'],
      }
    }
  });

  grunt.registerTask('server', [
      'less',
      'configureProxies:server',
      'connect:staticserver',
      'connect:server',
      'nodemon',
      'watch'
    ]);
  grunt.registerTask('build', [
      'clean:dist'
    ]);
};
