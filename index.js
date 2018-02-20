var loaderUtils = require('loader-utils');
var commonmark = require('commonmark');


/**
 * Add a wrapper around the generated HTML. Useful for Vue templates.
 *
 * @param html
 * @param wrapper
 * @returns {string}
 */
function addWrapper (html, wrapper) {
    var nodeName = html.match(/^<(\S*).*>$/)[1];

    return wrapper + html + '</' + nodeName + '>\n';
}


module.exports = function (source) {
    this.cacheable();

    var defaults = {
        wrapper: '<section>'
    };

    var params = loaderUtils.getOptions(this);
    var options = Object.assign({}, defaults, params);

    var reader = new commonmark.Parser();
    var writer = new commonmark.HtmlRenderer(options);
    var parsed = reader.parse(source);
    var result = writer.render(parsed);

    if (options.wrapper) {
        result = addWrapper(result, options.wrapper);
    }

    return result;
};