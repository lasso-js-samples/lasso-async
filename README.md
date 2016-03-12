# lasso-async

#### What does this example do ?

> This example project is to explain how to use [Lasso JS](https://github.com/lasso-js/lasso) to asynchronously load dependencies on-demand as and when required. [Learn more](https://github.com/lasso-js/lasso#asynchronouslazy-loading) about asynchronously loading dependencies.


#### What is Lasso JS ?

[Lasso JS](https://github.com/lasso-js/lasso) is an eBay open source Node.js-style JavaScript module bundler that also provides first-level support for optimally delivering JavaScript, CSS, images and other assets to the browser.

This tool offers many different optimizations such as a bundling, code splitting, lazy loading, conditional dependencies, compression, JS / CSS / IMG minifications, Base64 image encoding, and fingerprinted resource URLs. Plugins are provided to support pre-processors and compilers such as Less, Stylus and [Marko](http://markojs.com).


#### How does Lasso achieve this ?

Lasso.js supports asynchronously loading dependencies using the lightweight [raptor-loader](https://github.com/raptorjs/raptor-loader/blob/master/lib/raptor-loader.js). During optimization, Lasso.js detects the call to `require('raptor-loader').async(...)` and transforms the code such that the function is not invoked until all of the required modules referenced in the body of callback function are completely loaded.


#### How to install this sample project ?

```bash
git clone https://github.com/lasso-js-samples/lasso-async.git
cd lasso-async
npm install
```

This sample app uses a local installation of the [lasso-cli](https://github.com/lasso-js/lasso-cli) module, but you can also install it globally using the following command:

```bash
npm install lasso-cli --global
```

#### How to run this example ?

To run this example, navigate to the project root on your terminal and type

```````````

./run.sh
```````````

You should see an output similar to the one below :

````````````
Optimizing page "my-page"...
Successfully lassoed page "my-page"!
````````````
````````````
------------------------------------
````````````
````````````
Output for page "my-page":
  Resource bundle files:
    static/add.js
    static/raptor-modules-meta-my-page-async.js
    static/node_modules/jquery/dist/jquery.js
    static/raptor-modules-1.3.1/client/lib/raptor-modules-client.js
    static/raptor-modules-meta-my-page.js
    static/process-0.6.0/browser.js
    static/loader-metadata-my-page.js
    static/raptor-util-1.0.10/extend.js
    static/raptor-loader-1.0.5/lib/resource-loader.js
    static/events-1.1.0/events.js
    static/raptor-loader-1.0.5/lib/raptor-loader.js
    static/main.js
    static/main-run-my-page.js
    static/less-my-page-async.css
  HTML slots file:
    build/my-page.html.json
  Updated HTML file:
    my-page.html

````````````
````````````
------------------------------------
````````````
````````````
All pages successfully built!
````````````
````````````
Open './my-page.html' to see the result!
````````````


#### What is the contents of the configuration file ?

The configuration file to run lasso is `./lasso-config.json`.
Running the above command will result in JavaScript and CSS bundles being written out to the `./static` directory.

The dependencies required to build `./my-page.html` via Lasso is mentioned inside the `dependencies` key of the `./my-page.browser.json`. In this case, only the `./main.js` file is listed as a dependency. Modules required by this file are included inside the **('raptor-loader').async(...)** which takes care of asynchronously downloading them on-demand.

`./style.less` is not mentioned in the dependencies, since it will be loaded asynchronously.

**Other configuration options :**

Since `./add.js`, `jquery.js` are loaded asynchronously, they are not required to be bundled. So, the `bundlingEnabled` property of the `./lasso-config.json` is set to FALSE.

To check out other configurations, be sure to check out the [sample project](https://github.com/lasso-js-samples/lasso-config)

In addition, the [my-page.html](https://github.com/lasso-js-samples/lasso-config/blob/master/my-page.html) file will be updated with the required `<script>` and `<link>` tags to include the required external resources.

The complete configuration of lasso js is available at [Lasso JS configuration](https://github.com/lasso-js/lasso#configuration)


#### How to test the lassoed result of my-page.html ?

To test, open the updated `./my-page.html` file in your web browser. Check the developer console for jquery, add.js and style.less. They would not have loaded as yet. Click on the **Run async** button. Check the developer console's Network tab. The 3 dependencies `main.js`, `jquery.js` and `style.css` are loaded asynchronously on-demand. (style.less is compiled by [lasso-less](https://github.com/lasso-js/lasso-less))  
