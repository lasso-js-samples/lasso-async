lasso-async
===========

## What does this example do?

This example project is to explain how to use [Lasso.js](https://github.com/lasso-js/lasso) to asynchronously/lazily load dependencies on-demand. To learn more about asynchronously/lazily loading addiitonal JavaScript and CSS bundles, please see the Lasso.js docs:[Lasso.js » Asynchronous/Lazy loading](https://github.com/lasso-js/lasso#asynchronouslazy-loading)

## What is Lasso.js?

[Lasso.js](https://github.com/lasso-js/lasso) is an eBay open source Node.js-style JavaScript module bundler and asset pipeline that also provides first-level support for optimally delivering JavaScript, CSS, images and other assets to the browser.

This tool offers many different optimizations such as a bundling, code splitting, lazy loading, conditional dependencies, compression, JS/CSS/IMG minification, Base64 image encoding, and fingerprinted resource URLs. Plugins are provided to support pre-processors and compilers such as Less, Stylus and [Marko](http://markojs.com).

## Async/lazy loading

Lasso.js supports asynchronously loading dependencies using the lightweight [lasso-loader](https://github.com/lasso-js/lasso-loader) module. During optimization, Lasso.js detects the call to `require('lasso-loader').async(...)` and transforms the code such that the function is not invoked until all of the required modules referenced in the body of callback function are completely loaded.

## Install

```bash
git clone https://github.com/lasso-js-samples/lasso-async.git
cd lasso-async
npm install
```

This sample app uses a local installation of the [lasso-cli](https://github.com/lasso-js/lasso-cli) module, but you can also install it globally using the following command:

```bash
npm install lasso-cli --global
```

## Run

To run this example, navigate to the project root on your terminal and type

```bash
npm start
```

You should see an output similar to the one below :

```
lasso-js-samples/lasso-async (master)> npm start

> lasso-async@0.0.0 start /Users/psteeleidem/development/github/lasso-js-samples/lasso-async
> npm run build && http-server build/


> lasso-async@0.0.0 build /Users/psteeleidem/development/github/lasso-js-samples/lasso-async
> ./build.sh

Config:
{
    "plugins": [
        "lasso-less"
    ],
    "outputDir": "/Users/psteeleidem/development/github/lasso-js-samples/lasso-async/build/static",
    "fingerprintsEnabled": false,
    "urlPrefix": "/static",
    "minify": false,
    "resolveCssUrls": true,
    "bundlingEnabled": false
}

Optimizing page "app"...
Successfully lassoed page "app"!
------------------------------------
Output for page "app":
  Resource bundle files:
    build/static/app-async/lasso-async$0.0.0/src/add.js
    build/static/app-async/lasso-modules-meta.js
    build/static/app-async/jquery$2.2.3/dist/jquery.js
    build/static/app/lasso-modules-client$1.0.0/src/index.js
    build/static/app/lasso-modules-meta.js
    build/static/loader-metadata-app.js
    build/static/app/raptor-util$1.0.10/extend.js
    build/static/app/lasso-loader$2.0.0/src/resource-loader.js
    build/static/app/events$1.1.0/events.js
    build/static/app/lasso-loader$2.0.0/src/index.js
    build/static/app/lasso-async$0.0.0/src/main.js
    build/static/app/lasso-async$0.0.0/src/main-run.js
    build/static/less-app-async.css
  HTML slots file:
    build/app.html.json
  Updated HTML file:
    build/index.html
------------------------------------

All pages successfully built!
Starting up http-server, serving build/
Available on:
  http://127.0.0.1:8080
  http://10.0.1.4:8080
  http://10.0.1.15:8080
  http://10.237.178.240:8080
Hit CTRL-C to stop the server
```

Open your browser and visit `http://localhost:8080/` to see the resulting page. Click on the button to lazily load the additional CSS and JavaScript bundles.

## Additional details

For this sample app, lasso is configured to use the configuration file at `./lasso-config.json`.
Running the above command will result in JavaScript and CSS bundles being written out to the `build/static/` directory.

The JavaScript and CSS dependencies for `src/index.html` are declared in `src/browser.json`. There is only a single `"require-run: ./main"` dependency for this app. This dependency is used to declare the main entry for our JavaScript application. The main entry script is automatically required using the JavaScript module loader to be executed. Our main entry script uses `require('lasso-loader').async(...)` to lazily load additional JavaScript and CSS resources:

```javascript
// Asynchronously load the "./add" and "jquery" modules, as well
// as the "style.less" file:
require('lasso-loader').async(
    ['style.less'],
    function() {
        // Everything that is required within this function will be
        // asynchronously downloaded. Any additional dependencies passed
        // in using the first argument to the async method will also
        // be asynchronously downloaded. Whenever thing has been loaded
        // by the web broweer the following code will run. If all of
        // the dependencies have already been downloaded then the function
        // will be invoked immediately.
        var add = require('./add');
        var jquery = require('jquery');

        var now = new Date().toString();
        var html = '2+2=' + add(2, 2) + ' (' + now + ')';

        jquery('#target').html(html);
    });
```

To check out other configurations, be sure to check out the [sample project](https://github.com/lasso-js-samples/lasso-config)

In addition, the [index.html](https://github.com/lasso-js-samples/lasso-async/blob/master/src/index.html) file will be copied to the build directory and updated with the required `<script>` and `<link>` tags to include the required JavaScript and CSS bundles.

The complete set of configuration options is available in the Lasso.js docs: [Lasso.js » Configuration](https://github.com/lasso-js/lasso#configuration)