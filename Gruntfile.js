module.exports = function (grunt) {
    'use strict';

    // Display the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Sets main project directories
        config: {
          src: 'src/',
          dist: 'web/'
        },

        // Compiles SCSS partials to CSS
        compass: {
            options: {
                sassDir: '<%= config.src %>/assets/scss',
                cssDir: '<%= config.dist %>/assets/css',
                relativeAssets: false,
                assetCacheBuster: false,
                outputStyle: 'expanded',
                noLineComments: (grunt.option('build') ? true : false),
                require: 'susy'
            },
            dev: {}
        },

        // Copies static files over to web folder
        copy: {
            site: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: [
                        '**/*.html',
                        'assets/media/**',
                        'assets/scripts/**/*.js',
                        'assets/vendor/**/*.js',
                        'assets/vendor/**/*.map'
                    ],
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            watchMarkup: {
                files: ['<%= config.src %>/*.html'],
                tasks: ['copy:site']
            },
            watchStatic: {
                files: ['<%= config.src %>/assets/media/**'],
                tasks: ['copy:site']
            },
            watchStyles: {
                files: ['<%= config.src %>/assets/scss/*.scss'],
                tasks: ['compass:dev']
            },
            watchScripts: {
                files: ['<%= config.src %>/assets/{scripts,vendor}/**/*.js'],
                tasks: ['copy']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('build', [
        'copy:site',
        'compass:dev'
    ]);
};