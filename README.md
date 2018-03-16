# markdown-complete-loader
A Webpack loader for Markdown rendering using [markdown-it](https://github.com/markdown-it/markdown-it).

[![](https://img.shields.io/npm/v/markdown-complete-loader.svg)](https://www.npmjs.com/package/markdown-complete-loader)
[![](https://img.shields.io/npm/dm/markdown-complete-loader.svg)](https://www.npmjs.com/package/markdown-complete-loader)
[![Dependency Status](https://david-dm.org/peerigon/markdown-complete-loader.svg)](https://david-dm.org/alexgrozav/markdown-complete-loader)


## Installation
~~~
npm install --save-dev markdown-complete-loader
~~~

## Usage
Use the following loader configuration in your `webpack.config.js` file (webpack 2.x and later):

~~~
module.exports = {
    module: {
        rules: [
            {
                test: /\.md$/,
                loader: "markdown-complete-loader"
            }
        ]
    }
};
~~~

## Options

All markdown-it options are available, together with some loader specific options.

- **configFile**: optionally, you can specify path to a JS or JSON file that will serve as loader options.
- **wrapper**: a html node such as `<section>` to be used for wrapping the rendered output. This feature is provided for integration with single file components, such as Vue's.
- **preset**: the markdown-it initialization preset to use. Can be `'commonmark'`, `'default'`, or `'zero'`
- **html**: if `true`, it enables HTML tags to be used in the source
- **xhtmlOut**: if `true`, it uses '/' to close single tags (<br />). This is only for full CommonMark compatibility.
- **breaks**: if `true`, it converts '\n' in paragraphs into <br>
- **langPrefix**: a string such as `'language-'` used for CSS language prefix for fenced blocks. Can be useful for external highlighters.
- **linkify**: if `true`, it autoconverts URL-like text to links
- **typographer**: if `true`, it enables some language-neutral replacement + quotes beautification
- **quotes**: a string such as `'“”‘’'`, specifying double + single quotes replacement pairs, when typographer enabled, and smartquotes on. Could be either a String or an Array. For example, you can use `'«»„“'` for Russian, `'„“‚‘'` for German, and `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
- **plugins**: an array of plugins that can be used for markdownIt.
- **onInit**: a callback function that allows you to manipulate the markdown-it instance after it has been initialized.
- **onRender**: a callback function that allows you to manipulate the returned HTML string after it has been rendered.
- **highlight**: a highlighter function. Should return escaped HTML, or '' if the source string is not changed and should be escaped externally. f result starts with `<pre...` internal wrapper is skipped.

~~~js
module.exports = {
    module: {
        rules: [
            {
                test: /\.md$/,
                loader: "markdown-complete-loader",
                options: {
                    configFile: 'path/to/config.js'
                    wrapper: '<section>',
                    html: false,
                    xhtmlOut: false,
                    breaks: false,
                    langPrefix: 'language-',
                    linkify: false,
                    typographer: false,
                    quotes: '“”‘’',
                    plugins: [],
                    onInit: function (md) {
                      return md;
                    },
                    onRender: function (result) {
                      return result;
                    },
                    highlight: function (str, lang) {
                      return '';
                    }
                }
            }
        ]
    }
};
~~~


#### Plugins
You can specify what markdownIt plugins to use inside your loader options object or config file.

~~~js
module.exports = {
    module: {
        rules: [
            {
                test: /\.md$/,
                loader: "markdown-complete-loader",
                options: {
                    plugins: [
                        require('markdown-it-attrs')
                    ]
                }
            }
        ]
    }
};
~~~

#### Config File
Inside your configuration file you can use all of the loader options specified above. Specify a config file path using the `configFile` loader option.

~~~js
module.exports = {
    wrapper: '<section>',
    html: false,
    xhtmlOut: false,
    breaks: false,
    langPrefix: 'language-',
    linkify: false,
    typographer: false,
    quotes: '“”‘’',
    plugins: [
      require('markdown-it-attrs')
    ],
    onInit: function (md) {
      return md;
    },
    onRender: function (result) {
      return result;
    },
    highlight: function (str, lang) {
      return '';
    }
};
~~~

### Vue Loader Usage

To use it as a Vue template language `<template lang='md'>`, provide the following configuration for your vue loaders:

~~~
loaders['md'] = {
    loader: "markdown-complete-loader",
    options: {}
};
~~~

## License
MIT (http://www.opensource.org/licenses/mit-license.php)
