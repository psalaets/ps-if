# Change Log

All notable changes to this project will be documented in this file.

## [1.3.0] - 2015-03-27
### Changed

- Switch to inline array annotation style so this module can be minified without needing to `ng-annotate` first
- `require('ps-if')` now returns the Angular module name so you can do
```js
angular.module('app', [require('ps-if')])
```

## [1.2.0] - 2015-03-21
### Changed

- `ps-cool-down-millis` is now optional, defaults to infinity

## [1.1.1] - 2015-03-18
### Added

- Listing angular ^1.1.5 as peer dependency

## [1.1.0] - 2015-03-18
### Added

- browserify support

## [1.0.0] - 2015-03-18
### Added

- psCoolDownMillis attribute
- initial impl