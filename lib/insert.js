'use strict';

var toc = require('..');
var utils = require('./utils');
const os = require('os');

var defaultAdrBulletStyle = 'asterisk';
var bulletStyles = Object.freeze({'asterisk': '*', 'plus': '+', 'dash': '-'})

module.exports.insertAdrToc = function(str, tocContent, options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      "dir" : options
    }
  }

  options.bulletChar = bulletStyles[options.bulletStyle]

  if (options.bulletChar === undefined) {
    options.bulletChar = bulletStyles[defaultAdrBulletStyle]
  }

  let newline = utils.determineNewline(str);
  options.newline = newline;

  var regex = options.regex || /(?:<!-- adrlog(?:\s*stop)? .*-->)/g;
  var open = typeof options.open === 'string' ? options.open : '<!-- adrlog -->' + newline + newline;
  var close = typeof options.close === 'string' ? options.close : '<!-- adrlogstop -->';
  var obj;

  var newlines = '';
  var m = new RegExp(`${newline}+$`).exec(str);
  if (m) newlines = m[0];

  // does the file have front-matter?
  if (/^---/.test(str)) {
    // extract it temporarily so the syntax
    // doesn't get mistaken for a heading
    obj = utils.matter(str);
    str = obj.content;
  }

  var sections = split(str, regex);

  const start = str.match(/<!-- adrlog .*-->/);
  if (start && start.length > 0) {
    var open = typeof options.open === 'string' ? options.open : start[0] + newline + newline;
  } else {
    var open = typeof options.open === 'string' ? options.open : '<!-- adrlog -->' + newline + newline;
  }
  const end = str.match(/<!-- adrlogstop .*-->/);
  if (end && end.length > 0) {
    var close = typeof options.close === 'string' ? options.close : end[0];
  } else {
    var close = typeof options.close === 'string' ? options.close : '<!-- adrlogstop -->';
  }

  if (sections.length > 3) {
    throw new Error('adr-log only supports one list of ADRs per file.');
  }

  var last = sections[sections.length - 1];
  if (sections.length === 3) {
    sections.splice(1, 1, open + (options.toc || toc(tocContent, options).content));
    sections.splice(2, 0, close);
  }

  if (sections.length === 2) {
    sections.splice(1, 0, open + toc(tocContent, options).content + newline + newline + close);
  }

  var resultString = sections.join(newline + newline) + newlines;
  // if front-matter was found, put it back now
  if (obj) {
    return utils.matter.stringify(resultString, obj.data);
  }
  return resultString;
};

function split(str, re) {
  return str.split(re).map(trim);
}

function trim(str) {
  return str.trim();
}
