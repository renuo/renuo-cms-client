# Renuo CMS Client Script

[![Build Status](https://travis-ci.org/renuo/renuo-cms-client.svg?branch=develop)](https://travis-ci.org/renuo/renuo-cms-client) [![Build Status](https://travis-ci.org/renuo/renuo-cms-client.svg?branch=master)](https://travis-ci.org/renuo/renuo-cms-client)

## Installation

```sh
git clone git@github.com:renuo/renuo-cms-client.git
cd renuo-cms-client
bin/setup
bin/check
```

## Summary

```
# run tests and linting
bin/check
# local development
gulp tdd
# manual testing in the browser
# also compiles everything into .tmp/all.js, which will be used in local testing
# .tmp/all.js should be minified for a release
gulp serve
```

## Important URLs

* Project Management [https://redmine.renuo.ch/projects/cms](https://redmine.renuo.ch/projects/cms)
* Github [https://github.com/renuo/renuo-cms-client](https://github.com/renuo/renuo-cms-client)


## Getting Started

Include the JavaScript file and the CSS file in your documents HEAD after you've include jQuery:
 
```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="path/to/renuo_cms_client.min.js"></script>
```

Insert an empty <div> element with the data attribute block containing the content blocks id:

```
<div data-content-path="some/path/to/some/content" data-api-key="aValidApiKey"></div>
```

If you want to be able to edit the content block (only the admin should have this!):

```
<div data-content-path="some/path/to/some/content" data-api-key="aValidApiKey" data-private-api-key="AdminONLY"></div>
```

The library will automagically initialize and manage the content blocks.

## Contribute

The source code is hosted on [https://github.com/renuo/renuo-cms-client](https://github.com/renuo/renuo-cms-client)

You need git to fork the renuo-cms-client repository. Or clone it from the main repository:
[git@github.com:renuo/renuo-cms-client.git](git@github.com:renuo/renuo-cms-client.git).

```
git clone git@github.com:renuo/renuo-cms-client.git
cd renuo-cms-client
```

We also use a number of node.js tools to initialize and test renuo-cms-client. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

You'll also need bower, which you can get by running:

```
npm install -g tsd bower
```

Then install the dependencies:

```
tsd reinstall --save --overwrite
npm install
```

## Dependencies / Type Definitions

Install a new dependency (e.g. jquery): 

```
tsd query jquery --action install --save
```

Reinstall dependencies: 

```
tsd reinstall --save --overwrite
```

## Testing

This will test the app with PhantomJS:

```
gulp test
```

To test the code in additional browsers (Chrome and Firefox):

```
MULTIPLE_BROWSERS=1 gulp test
```

## Renuo CMS API

See https://git.renuo.ch/renuo/renuo-cms-api (TODO: open source on GH).

## Contact

For more information on the renuo-cms-client, please check out
[https://github.com/renuo/renuo-cms-client](https://github.com/renuo/renuo-cms-client)
or contact [Renuo GmbH](info@renuo.ch).
