# commonmark-loader
A Webpack loader for Markdown rendering using [Commonmark](https://github.com/commonmark/commonmark.js).

[![](https://img.shields.io/npm/v/commonmark-loader.svg)](https://www.npmjs.com/package/commonmark-loader)
[![](https://img.shields.io/npm/dm/commonmark-loader.svg)](https://www.npmjs.com/package/commonmark-loader)
[![Dependency Status](https://david-dm.org/peerigon/commonmark-loader.svg)](https://david-dm.org/alexgrozav/commonmark-loader)
[![Build Status](https://travis-ci.org/peerigon/commonmark-loader.svg?branch=master)](https://travis-ci.org/alexgrozav/commonmark-loader)


## Installation
~~~
npm install markdown-loader
~~~

## Usage
Use the following loader configuration in your `webpack.config.js` file (webpack 2.x and later):

~~~
return {
    module: {
        rules: [
            {
                test: /\.md$/,
                use: "commonmark-loader"
            }
        ]
    }
}
~~~

## Options

All commonmark options are available, together with some loader specific options.

- **wrapper**: a html node such as `<section>` to be used for wrapping the rendered output. This feature is provided for integration with single file components, such as Vue's. 
- **sourcepos**: if `true`, source position information for block-level elements will be rendered in the `data-sourcepos` attribute (for HTML) or the `sourcepos` attribute (for XML).
- **smart**: if `true`, straight quotes `'"` will be made curly, `--` will be changed to an en dash, `---` will be changed to an em dash, and `...` will be changed to ellipses.
- **safe**: if `true`, raw HTML will not be passed through to HTML output (it will be replaced by comments), and potentially unsafe URLs in links and images (those beginning with `javascript:`, `vbscript:`, `file:`, and with a few exceptions `data:`) will be replaced with empty strings.
- **softbreak**: specify raw string to be used for a softbreak.
- **esc**: specify a function to be used to escape strings.

~~~
return {
    module: {
        rules: [{
                test: /\.md$/,
                use: [
                    {
                        loader: "commonmark-loader",
                        options: {
                            sourcepos: true,
                            safe: true,
                            smart: true,
                            softbreak: '<br />',
                            esc: function(str) { return str; }
                        }
                    }
                ]
            }]
    }
}
~~~

### Vue Loader Usage

To use it as a Vue template language `<template lang='md'>`, provide the following configuration for your vue loaders:

~~~
loaders['md'] = {
    loader: "commonmark-loader"
};
~~~

## License
MIT (http://www.opensource.org/licenses/mit-license.php)