'use strict';

var LIVERELOAD_PORT = 35729,
    SERVER_PORT = 8080 ,
    //  !! It's important to use 127.0.0.1 and not localhost
    URL = "http://127.0.0.1:"+SERVER_PORT;

module.exports = function (grunt) {
    
    //  Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
    //  Configurable paths
    var yeomanConfig = {
        dev: 'app',
        prod: 'dist'
    };
    
    grunt.initConfig({
        
        yeoman: yeomanConfig,
        
        bower: {
            install: {
                options: {
                    targetDir: '<%= yeoman.dev %>/js/vendors/bower',
                    layout: 'byComponent'
                }
            }
        },
        
        express: {
            options: {
                port: SERVER_PORT
            },
            dev: {
                options: {
                    script: 'server/server.js'
                }
            }
        },
        
        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.dev %>/*.html',
                    '<%= yeoman.dev %>/js/{,*/}*.js',
                    '<%= yeoman.dev %>/styles/{,*/}*.css'
                ]
            },
            express: {
                files:  [
                    'server/server.js',
                    'server/db_controller.js'
                ],
                tasks:  [ 'express:dev' ],
            }
        },
        
        open: {
            server: {
                path: URL
            }
        },
        
        jshint: {
            dev: [
                '<%= yeoman.dev %>/js/{,*/}*.js',
                'server/server.js',
                'server/db_controller.js'
            ],
        }
    });

    grunt.registerTask('server', function (target) {
        
        grunt.task.run([
            'express:dev',
            'open',
            'watch'
        ]);
    });
    
    grunt.registerTask('init:dev', [
        'bower'
    ]);

};
