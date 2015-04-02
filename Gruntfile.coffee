'use strict'

protractorTestPort = 17325 + Math.floor(Math.random() * 50)
module.exports = (grunt) ->
  require('load-grunt-tasks') grunt
  require('time-grunt') grunt

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    watch:
      sass:
        files: ['dist/*.scss']
        tasks: [
          'sass'
          'cssmin'
        ]

    jshint:
      options:
        jshintrc: '.jshintrc'
        reporter: require('jshint-stylish')

    coffeelint:
      src: ['src/coffee/*.coffee', 'Gruntfile.coffee']
      options:
        configFile: 'coffeelint.json'

    sass:
      dist:
        options:
          style: 'expanded'
        files:
          'src/css/renuo-cms-client.css': 'src/sass/renuo-cms-client.scss'

    cssmin:
      dist:
        files: [{
          expand: true
          cwd: 'src/css/'
          src: [
            '*.css'
            '!*.min.css'
          ]
          dest: 'dist/'
          ext: '.min.css'
        }]

    coffee:
      compile:
        files:
          'src/js/renuo-cms-client.js': 'src/coffee/renuo-cms-client.coffee'

    uglify:
      options:
        manage: false
        compress:
          drop_console: true
      dist:
        files:
          'dist/renuo-cms-client.min.js': 'src/js/renuo-cms-client.js'

    karma:
      unit:
        configFile: 'test/karma.conf.coffee'
        singleRun: true

  grunt.registerTask 'serve', 'Compile then start a connect web server', (target) ->
    grunt.task.run [
      'sass'
      'cssmin'
      'coffee'
      'uglify'
      'watch'
    ]

  grunt.registerTask 'test', [
    'karma'
  ]

  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'


