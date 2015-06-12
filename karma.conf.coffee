karmaTestPort = 17425 + Math.floor(Math.random() * 50)

browsers = ['PhantomJS']
plugins = [
  'karma-phantomjs-launcher'
  'karma-coverage'
]

if process.env.MULTIPLE_BROWSERS
  console.info "adding chrome and firefox"
  browsers.push('Chrome', 'Firefox')
  plugins.push('karma-chrome-launcher', 'karma-firefox-launcher')

module.exports = (config) ->
  config.set
    basePath: './'
    frameworks: ['jasmine']

    files: [
      'bower_components/jquery/dist/jquery.js'
      'bower_components/jasmine-expect/dist/jasmine-matchers.js'
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
      'bower_components/jquery-mockjax/jquery.mockjax.js'
      'bower_components/Faker/build/build/faker.js'
      'test/tests.js'
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
      'test/tests.js': 'coverage'

    reporters: ['progress', 'coverage']

    coverageReporter:
      reporters:
        [
          { type: 'text-summary', dir: '.tmp/coverage/' }
          { type: 'text', dir: '.tmp/coverage/' }
        ]
