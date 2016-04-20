# Renuo CMS Client Script

[![Build Status](https://travis-ci.org/renuo/renuo-cms-client.svg?branch=develop)](https://travis-ci.org/renuo/renuo-cms-client) [![Build Status](https://travis-ci.org/renuo/renuo-cms-client.svg?branch=master)](https://travis-ci.org/renuo/renuo-cms-client)

## Usage, Architecture and Documentation

See https://renuo.gitbooks.io/renuo-cms-doc/content/

### Renuo CMS API

This project works with any backend implementing the correct API. [https://git.renuo.ch/renuo/renuo-cms-api] is a reference
implementation for such a server (not released as of now, but it will follow soon).

## Development

### Installation

Prerequisites

* Install [https://github.com/creationix/nvm](NVM)
* Install [https://github.com/rbenv/rbenv](rbenv)
* Install [https://github.com/yyuu/pyenv](pyenv)

```sh
git clone git@github.com:renuo/renuo-cms-client.git
cd renuo-cms-client
bin/setup && bin/check
```

### Commands Summary

```sh
# run tests and linting
bin/check
# local development
gulp tdd
# manual testing in the browser
# also compiles everything into .tmp/renuo-cms-client.js, which will be used in local testing
# .tmp/renuo-cms-client.js should be minified for a release
gulp serve
# generates dist/renuo-cms-client.js
gulp dist
# clean all
gulp clean-all
# single test run
gulp test
# run tests in multiple browsers
MULTIPLE_BROWSERS=1 gulp test
```

### Important URLs

* [https://github.com/renuo/renuo-cms-client](https://github.com/renuo/renuo-cms-client)
* [https://github.com/renuo/renuo-cms-api](https://github.com/renuo/renuo-cms-api)

### Dependencies / Type Definitions

Install a new dependency (e.g. jquery): 

```sh
typings install jquery --ambient --save
```

Reinstall dependencies:

```sh
typings install
```

### Tests

We use TDD:

```sh
gulp tdd
```

This will test the app with PhantomJS:

```sh
gulp test
```

To test the code in additional browsers (Chrome and Firefox):

```sh
MULTIPLE_BROWSERS=1 gulp test
```

## Release

```sh
bundle exec ruby release.rb
```

## Contributing

Bug reports and pull requests are welcome on GitHub at [https://github.com/renuo/renuo-cms-client]. This project is intended to
be a safe, welcoming space for collaboration, and contributors are expected to adhere to
the [Contributor Covenant](contributor-covenant.org) code of conduct.

## Contact

For more information on the renuo-cms-client, please check out
[https://github.com/renuo/renuo-cms-client](https://github.com/renuo/renuo-cms-client)
or contact [cms@renuo.ch](mailto:cms@renuo.ch).
