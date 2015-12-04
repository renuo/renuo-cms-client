# Renuo CMS Client Script

[![Build Status](https://travis-ci.org/renuo/renuo-cms-client.svg?branch=develop)](https://travis-ci.org/renuo/renuo-cms-client) [![Build Status](https://travis-ci.org/renuo/renuo-cms-client.svg?branch=master)](https://travis-ci.org/renuo/renuo-cms-client)

## Usage

Include the JavaScript file and the CSS file in your documents HEAD after you've include jQuery:
 
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="path/to/renuo_cms_client.min.js"></script>
```

Insert an empty <div> element with the data attribute block containing the content blocks id:

```html
<div data-content-path="some/path/to/some/content" data-api-host="//renuo-cms-api.dev:3000" data-api-key="aValidApiKey"></div>
```

If you want to be able to edit the content block (only the admin should have this!):

```html
<div data-content-path="some/path/to/some/content" data-api-host="//renuo-cms-api.dev:3000" data-api-key="aValidApiKey" data-private-api-key="AdminONLY"></div>
```

The library will automagically initialize and manage the content blocks. If you want to reload the content blocks, you
can use the following trigger:

```js
jQuery(document).trigger('renuo-cms-reload');
```

### Renuo CMS API

This project works with any backend implementing the correct API. [https://git.renuo.ch/renuo/renuo-cms-api] is a reference
implementation for such a server (not released as of now, but it will follow soon).

## Development

### Installation

Prerequisites

* Install [https://github.com/creationix/nvm](NVM)

```sh
git clone git@github.com:renuo/renuo-cms-client.git
cd renuo-cms-client
nvm install
bin/setup
bin/check
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
* [https://git.renuo.ch/renuo/renuo-cms-api](https://git.renuo.ch/renuo/renuo-cms-api)

```sh
npm install -g tsd bower
```

Then install the dependencies:

```sh
tsd reinstall --save --overwrite
npm install
```

### Dependencies / Type Definitions

Install a new dependency (e.g. jquery): 

```sh
tsd query jquery --action install --save
```

Reinstall dependencies: 

```
tsd reinstall --save --overwrite
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

## Contributing

Bug reports and pull requests are welcome on GitHub at [https://github.com/renuo/renuo-cms-client]. This project is intended to
be a safe, welcoming space for collaboration, and contributors are expected to adhere to
the [Contributor Covenant](contributor-covenant.org) code of conduct.

## Contact

For more information on the renuo-cms-client, please check out
[https://github.com/renuo/renuo-cms-client](https://github.com/renuo/renuo-cms-client)
or contact [info@renuo.ch](mailto:info@renuo.ch).
