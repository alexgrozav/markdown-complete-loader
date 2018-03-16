var loaderUtils = require('loader-utils');
var MarkdownIt = require('markdown-it');

/**
 * Add a wrapper around the generated HTML. Useful for Vue templates.
 *
 * @param html
 * @param wrapper
 * @returns {string}
 */
function addWrapper (html, wrapper) {
    var wrapperNodeName = wrapper.match(/^<(\S*).*>$/)[1];

    return wrapper + html + '</' + wrapperNodeName + '>\n';
}


module.exports = function (source) {
    this.cacheable();

    var defaults = {
        wrapper: '<section>',
        preset: 'default'
    };
    var params = loaderUtils.getOptions(this);
    var options = {};
    if (params.configFile) { options = require(params.configFile); }
    options = Object.assign({}, defaults, options, params);

    var md = new MarkdownIt(options.preset, options);

    if (options.onInit) {
      md = options.onInit(md);
    }

    if (options.plugins) {
      options.plugins.forEach((plugin) => {
        if (!!plugin && plugin.constructor === Array) {
          return md.use(plugin[0], plugin[1]);
        }

        md.use(plugin);
      });
    }

    var result = md.render(source);
    if (options.wrapper) {
        result = addWrapper(result, options.wrapper);
    }

    if (options.onRender) {
      result = options.onRender(result);
    }

    return result;
};
