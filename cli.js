#!/usr/bin/env node

require('console-stamp')(console, {
  pattern: 'HH:MM:ss',
  include: ['log', 'info', 'warn', 'error', 'fatal'],
  //level: 'log', // development
  level: 'info', // production
  colors: {
    stamp: 'yellow',
    label: 'yellow',
    metadata: 'green'
  }
});

const os = require('os');
var fs = require('fs');
var toc = require('./index.js');
var utils = require('./lib/utils');
var glob = require('glob');
var path = require('path');
var args = utils.minimist(process.argv.slice(2), {
  boolean: ['i'],
  string: ['d'],
  string: ['e'],
  string: ['p'],
  string: ['b'],
  alias: {h: 'help'}
});

if (!args.d && !args.i && !args.p && (args._.length==0) || args.h) {
  process.stderr.write([
    'Usage: adr-log [-d <directory>] [-i <input>] [-p <path_prefix>]',
    '',
    '  input:  The markdown file to contain the table of contents.',
    '          If no <input> file is specified, an index.md file containing the log is created in the current directory.',
    '',
    '  -i:     Edit the <input> file directly, injecting the log at <!-- adrlog -->.',
    '          Using only the -i flag, the tool will scan the current working directory for all *.md files and',
    '          inject the resulting adr-log into the default index.md file.',
    '          (Without this flag, the default is to print the log to stdout.)',
    '',
    '  -d:     Scans the given <directory> for .md files.',
    '          (Without this flag, the current working directory is chosen as default.)',
    '',
    '  -e      Exclude any files matching the given <pattern>',
    '',
    '  -p:     Path prefix for each ADR file path written in log',
    '          (Default is empty)',
    '',
    '  -b      Change the character used to for bullets',
    '          Supports: asterisk, dash, plus',
    '          (Default is asterisk)',
    '',
    '  -h:     Shows how to use this program',
    ''
  ].join(os.EOL));
  process.exit(1);
}

if (args.i && args._[0] === '-') {
  process.stderr.write('adr-log: you cannot use -i with "-" (stdin) for input');
  process.exit(1);
}

var defaultAdrLogDir = path.resolve(process.cwd());
var adrLogDir = args.d || defaultAdrLogDir;
var adrPathPrefix = args.p || '';
var adrBulletStyle = args.b || '';

var defaultAdrLogFile = 'index.md';
var adrLogFile = args._[0] || adrLogDir + '/' + defaultAdrLogFile;
var adrLogFileName = path.parse(adrLogFile).base;
var tocDir = path.dirname(adrLogFile);

console.log("adr log file:", adrLogFile);
console.log("adr log dir:", adrLogDir);

var headings = '';
const globPattern = '**/*.md';
console.log("glob pattern:", globPattern);
var filenames = glob.sync(globPattern, {cwd: adrLogDir});
filenames = filenames.filter(filename => filename !== adrLogFile.replace(adrLogDir + '/', ''));
if (args.e) {
  var excluded = glob.sync(args.e, {cwd: adrLogDir});
  console.log("excluded: ", excluded);
  filenames = filenames.filter(filename => !excluded.includes(filename));
}
console.log("filenames:", filenames);

// determine log entries
for (const filename of filenames) {
  console.log("add filename:", filename);
  headings += utils.headify(filename + '\n');
}

var existingLogString;
if (fs.existsSync(adrLogFile)) {
  existingLogString = fs.readFileSync(adrLogFile, 'utf8');
} else {
  existingLogString = '<!-- adrlog -->' + os.EOL + os.EOL + '<!-- adrlogstop -->' + os.EOL;
}
var newLogString = toc.insertAdrToc(existingLogString, headings, {pathPrefix: adrPathPrefix, dir: adrLogDir, bulletStyle: adrBulletStyle, tocDir});

if (args.i) {
  fs.writeFileSync(adrLogFile, newLogString);
} else {
  process.stdout.write(newLogString);
}
