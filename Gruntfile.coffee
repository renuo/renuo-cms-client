'use strict'

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
        ts:
          files: ['src/ts/{,*/}{,*/}*.ts', '!src/ts/{,*/}{,*/}*_spec.ts']
          tasks: ['ts:default']
        tsTest:
          files: ['src/ts/{,*/}{,*/}*.ts']
          tasks: ['ts:test']

    ts:
      default:
        src: ['src/ts/{,*/}{,*/}*.ts', '!src/ts/{,*/}{,*/}*_spec.ts']
        out: 'src/js/renuo_cms_client.js'
        options:
          target: 'es6'
      test:
        src: 'src/ts/{,*/}{,*/}*.ts'
        out: 'test/tests.js'
        options:
          target: 'es6'

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
          'src/css/renuo_cms_client.css': 'src/sass/renuo_cms_client.scss'

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
          'src/js/renuo_cms_client.js': 'src/coffee/renuo_cms_client.coffee'

    uglify:
      options:
        manage: false
        compress:
          drop_console: true
      dist:
        files:
          'dist/renuo_cms_client.min.js': 'src/js/renuo_cms_client.js'

    karma:
      unit:
        configFile: 'karma.conf.coffee'
        singleRun: true

  grunt.registerTask 'serve', 'compile and minify everything', (target) ->
    grunt.task.run [
      'compile'
      'watch'
    ]

  grunt.registerTask 'lint', [
    'coffeelint'
    'jshint'
  ]

  grunt.registerTask 'compile', [
    'sass'
    'cssmin'
    'coffee'
    'uglify'
  ]

  grunt.registerTask 'test', [
    'ts:test'
    'karma'
  ]

  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'



