module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ngtemplates:  {
      bespeak:        {
        cwd:      'src/',
        src:      'templates/**.html',
        dest:     'build/bespeak.templates.js',
        options:    {
          url:    function(url) { return url.replace('.html', ''); },
          htmlmin: {
            collapseBooleanAttributes:      true,
            collapseWhitespace:             true,
            removeAttributeQuotes:          true,
            removeComments:                 true, // Only if you don't use comment directives!
            removeEmptyAttributes:          true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
          }
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/bootstrap/ui-bootstrap-tpls-0.4.0.min.js', 
              'src/angular-payments/angular-payments.js',
              'src/bespeak.js',
              'src/bespeak-controller-progress.js',
              'src/bespeak-controller-schedule.js',
              'src/bespeak-controller-reservation.js',
              'src/bespeak-services.js',
              'src/bespeak-services-alert.js',
              'src/bespeak-services-api.js',
              'src/bespeak-services-reservation.js',
              '<%= ngtemplates.bespeak.dest %>'
              ],

        dest: 'lib/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\\n'
      },
      dist: {
        files: {
          'lib/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.',
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['ngtemplates', 'concat', 'uglify']);
};