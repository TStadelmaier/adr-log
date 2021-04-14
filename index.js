'use strict';

/**
 * Module dependencies
 */

const utils = require('./lib/utils');
const fs = require('fs');
const path = require('path');
const slash = require('slash');

var counter = 1;

/**
 * expose `toc`
 */
module.exports = toc;

/**
 * Load `generate` as a remarkable plugin and
 * expose the `toc` function.
 *
 * @param  {String} `str` String of markdown
 * @param  {Object} `options`
 * @return {String} Markdown-formatted table of contents
 */
function toc(str, options) {
  return new utils.Remarkable()
    .use(generate(options))
    .render(str);
}

/**
 * Expose `insert` method
 */
toc.insertAdrToc = require('./lib/insert').insertAdrToc;

/**
 * extract index number or date from either filename or front matter
 */
function getIndex(basename, data) {
  const numb = basename.match(/^[\d-_\\\/]*\d/m);
  if (numb !== null && numb !== undefined) {
    return numb[0];
  }

  if (data.index) {
    return '' + data.index;
  }

  if (data.date) {
    let date = data.date;

    if (typeof(date) == 'object') {
      date = date.getFullYear() + "-"
        + ("0" + (date.getMonth() + 1)).substr(-2) + "-"
        + ("0" + date.getDate()).substr(-2)
    }

    return date;
  }

  return '' + (counter++);
}

/**
 * Generate a markdown table of contents. This is the
 * function that does all of the main work with Remarkable.
 *
 * This is the core implementation. Here, the file contents (docs/adr/dddd-*.md) are parsed and transformed into markdown.
 */
function generate(options) {
  return function (md) {
    md.renderer.render = function (tokens) {
      const res = {
        content: ''
      };

      tokens = tokens.filter(t => !!t.content);

      for (const token of tokens) {
        if (!options.dir) {
          return {
            content: ''
          };
        }

        let contentPath = `${options.dir}/${token.content}`
        let content = fs.readFileSync(contentPath).toString();

        let tokenPath = slash(
          path.relative(options.tocDir, contentPath)
        );

        let data = {};

        // does the file have front-matter?
        if (/^---/.test(content)) {
          // extract it temporarily so the syntax
          // doesn't get mistaken for a heading
          let obj = utils.matter(content);
          data = obj.data;
          content = obj.content;
        }

        let index = getIndex(path.parse(token.content).base, data);

        const newline = utils.determineNewline(content);
        let title = content.split(newline)[0].substr(2);
        console.log("title before decimal removal: ", title);
        title = title.replace(/^\d+\. /, '');
        console.log("title after decimal removal:  ", title);
        res.content += `${options.bulletChar} [ADR-${index.trim()}](${options.pathPrefix}${tokenPath}) - ${title + options.newline}`
      }
      res.content = res.content.trim();
      return res;
    };
  };
}

/**
 * Expose utils
 */
toc.slugify = utils.slugify;
