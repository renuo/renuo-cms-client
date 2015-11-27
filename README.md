# Renuo CMS Client Script

## Installation

```sh
git clone git@github.com:renuo/renuo-cms-client.git
cd renuo-cms-client
bin/setup
```

## Summary

```
grunt test
# Compile and minify all your code
grunt serve
```

## Important URLs

* Project Management [https://redmine.renuo.ch/projects/cms](https://redmine.renuo.ch/projects/cms)
* Github [https://github.com/renuo/renuo-cms-client](https://github.com/renuo/renuo-cms-client)


## Getting Started

Include the JavaScript file and the CSS file in your documents HEAD after you've include jQuery:
 
```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="path/to/renuo_cms_client.min.js"></script>
<link rel="stylesheet" type="text/css" href="path/to/renuo_cms_client.min.css"/>
```

Insert an empty <div> element with the data attribute block containing the content blocks id:

```
<div data-block="1"></div>
```

Lastly you have to initialize the cms client script by calling at the end of your page:

```
<script>
  renuoCmsClient = new window.renuoCmsClient
</script>
```

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
grunt test
```

To lint your code run:

```
grunt lint
```

## Contact

For more information on the renuo-cms-client please check out
[https://github.com/renuo/renuo-cms-client](https://github.com/renuo/renuo-cms-client)
or contact [Renuo GmbH](info@renuo.ch).
