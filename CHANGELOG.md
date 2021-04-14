# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

We refer to [GitHub issues](https://github.com/adr/adr-log/issues) by using `#NUM`.

## Unreleased

### Added

- New option `-b` to change the style of bullets (asterisk, dash, plus)

## [2.2.0] – 2020-10-22

### Added

- New option `-p` - prefix for each ADR file path in log (useful when ADRs are in sub sub directory)
- New option `-e` option to specify glob pattern for files to be excluded
- Allow date prefixes as well as number prefixes
- Allow specification of `index` or `date` properties in frontmatter

### Fixed

- Fixed bug where bogus path info is prepended to TOC entries when directory argument doesn't include trailing slash

### Changed

- Lists are now generated using `*` instead of `-`
- Search recursively underneath the given directory

## [2.1.3] – 2019-11-15

### Fixed

- `adr-log` now works with relative directories as expected. [#29](https://github.com/adr/adr-log/pull/29)

## [2.1.2] – 2019-10-27

### Fixed

- Updated package versions to fix vulnerabilities

## [2.1.1] – 2017-12-15

### Added

- Difference to `adr generate toc` (from [adr-tools](https://github.com/npryce/adr-tools)) is explained in the README.md.

### Fixed

- Correctly keeps Windows line endings. [#24](https://github.com/adr/adr-log/issues/24)
- Fixed changelog for 2.1.0: added link and date

## [2.1.0] – 2017-11-23

### Added

- Add support for numbering in heading as used at [adr-tools](https://github.com/npryce/adr-tools):
  They are removed when generating the log.
  Fixes [#23](https://github.com/adr/adr-log/issues/23).

### Changed

- Really using the format of "Keep a Changelog": Versions are indicated without prefix `v`.
  E.g., `v1.0.0` is now `1.0.0`.
  This is also the format supported by @sindresorhus's [np](https://github.com/sindresorhus/np).

## [2.0.0] – 2017-11-18

### Added

- Support for comments after `adrlog` in `<!-- adrlog -->`. [#17](https://github.com/adr/adr-log/issues/17)
- Initial support for headers (`---`) in `ADR-*.md` files.

### Changed

- Updated CLI syntax to be more conform with [markdown-toc](https://github.com/jonschlinkert/markdown-toc).

### Fixed

- The title of the first main heading is used (and not the second line if it is not empty). [#15](https://github.com/adr/adr-log/issues/15)
- When `adrlog` appears without closing `adrlogstop`, adr-log does not stop with an error anymore.
- When `adrlog` does not appear, the log is created nevertheless.

## [1.1.0] – 2017-10-27

### Added

- We added a CHANGELOG.md. [#2](https://github.com/adr/adr-log/issues/2)

### Changed

- We update README.md to reflect changed usage. [#3](https://github.com/adr/adr-log/issues/3)

### Fixed 

- Fix titles to printed in the correct format as described in [#5](https://github.com/adr/adr-log/issues/5).
- Fix output of help to use "LOG" instead of "TOC". [#6](https://github.com/adr/adr-log/issues/6)
- Fix help to output "adr-log" instead of "adr-toc". [#4](https://github.com/adr/adr-log/issues/4)

### Removed

- Removed `bower.json`. [#8](https://github.com/adr/adr-log/issues/8)

## [1.0.1] – 2017-10-22

### Fixed

- Fix parsing of cli arguments. [#1](https://github.com/adr/adr-log/issues/1)

## [1.0.0] – 2017-10-20

Initial version of adr-log.

[unreleased]: https://github.com/adr/adr-log/compare/adr:2.2.0...master
[2.2.0]: https://github.com/adr/adr-log/compare/adr:2.1.3...2.2.0
[2.1.3]: https://github.com/adr/adr-log/compare/adr:2.1.2...2.1.3
[2.1.2]: https://github.com/adr/adr-log/compare/adr:2.1.1...2.1.2
[2.1.1]: https://github.com/adr/adr-log/compare/adr:2.1.0...2.1.1
[2.1.0]: https://github.com/adr/adr-log/compare/adr:2.0.0...2.1.0
[2.0.0]: https://github.com/adr/adr-log/compare/adr:1.1.0...2.0.0
[1.1.0]: https://github.com/adr/adr-log/compare/adr:1.0.1...1.1.0
[1.0.1]: https://github.com/adr/adr-log/compare/adr:1.0.0...1.0.1
[1.0.0]: https://github.com/adr/adr-log/compare/adr:360c142de47234334162691eb76a2509ea014199...1.0.0
