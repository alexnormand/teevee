var partials =  function() {
  var fs = require('fs');
  var partials = fs.readdirSync('./partials');

  return partials.map(function(partial) {
    var template = '<script type="text/ng-template" id="/partials/' + partial + '">';

    template += fs.readFileSync('./partials/' + partial, 'utf-8');
    template += '</script>';

    return template;
  }).join('');
};

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build'],
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: [
              'get/**',

              'apple-touch-icon-128x128.png',
              'apple-touch-icon.png',
              'favicon.ico',
              'manifest.webapp'
            ],
            dest: 'build'
          },
          {
            expand: false,
            src: ['js/lib/angular/angular.min.js.map'],
            dest: 'build/js/angular.min.js.map'
          }
        ]
      }
    },

    ngmin: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'build/js/',
            src: '*.js',
            dest: 'build/js'
          }
        ]
      }
    },

    concat: {
      app: {
        src: ['js/app.js', 'js/controllers/*.js'],
        dest: 'build/js/app.js'
      },
      build: {
        options: {
          stripBanners: true
        },
        src: [
          'js/lib/angular/angular.min.js',
          'js/lib/angular-route/angular-route.min.js',
          'js/lib/angular-touch/angular-touch.min.js',
          'js/lib/angular-animate/angular-animate.min.js',
          'build/js/app.js'
        ],
        dest: 'build/js/app.js'
      }
    },

    uglify: {
      app: {
        files: {
          'build/js/app.js': ['build/js/app.js']
        }
      }
    },

    cssmin: {
      build: {
        files: {
          'build/css/style.css': [
            'js/lib/ratchet/dist/ratchet.css',
            'css/style.css'
          ]
        }
      }
    },

    dom_munger: {
      removescripts: {
        options: {
          remove: 'script',
        },
        src: 'index.html',
        dest: 'build/index.html'
      },
      removecss: {
        options: {
          remove: 'link:nth-last-child(2)',
        },
        src: 'build/index.html',
        dest: 'build/index.html'
      },
      appendscript: {
        options: {
          append: { selector: 'body', html: '<script src="/js/app.js"></script>' }
        },
        src: 'build/index.html',
        dest: 'build/index.html'
      },
      appendcss: {
        options: {
          append: {selector: 'head', html: '<link rel="stylesheet" href="css/style.css"'}
        },
        src: 'build/index.html',
        dest: 'build/index.html'
      },
      appendpartials: {
        options: {
          append: { selector: 'body', html: partials() }
        },
        src: 'build/index.html',
        dest: 'build/index.html'
      }
    },

    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'build/index.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-dom-munger');

  grunt.registerTask('default', [
    'clean',
    'copy',
    'concat:app',
    'ngmin',
    'uglify:app',
    'concat:build',
    'cssmin',
    'dom_munger:removescripts',
    'dom_munger:removecss',
    'dom_munger:appendscript',
    'dom_munger:appendcss',
    'dom_munger:appendpartials',
    'htmlmin'
  ]);
};