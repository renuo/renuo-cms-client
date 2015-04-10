karmaTestPort = 17425 + Math.floor(Math.random() * 50)

browsers = ['PhantomJS']
plugins = [
  'karma-phantomjs-launcher'
]

if process.env.MULTIPLE_BROWSERS
  console.info "adding chrome and firefox"
  browsers.push('Chrome', 'Firefox')
  plugins.push('karma-chrome-launcher', 'karma-firefox-launcher')

module.exports = (config) ->
  config.set
    basePath: '../'
    frameworks: ['jasmine']

    files: [
      'bower_components/jquery/dist/jquery.js'
      'bower_components/jasmine-expect/dist/jasmine-matchers.js'
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
      'src/coffee/*.coffee'
      'test/spec/**/*.coffee'
      'test/mock/**/*.coffee'
    ]

    exclude: []
    port: karmaTestPort

    logLevel: config.LOG_INFO

    browsers: browsers

    plugins: plugins.concat [
      'karma-jasmine'
      'karma-coffee-preprocessor'
    ]

    autoWatch: true
    singleRun: false
    colors: true

    preprocessors:
      '**/*.coffee': 'coffee'

    reporters: ['progress']

