# parcel-reporter-multiple-file-copier
[![npm version](https://img.shields.io/npm/v/parcel-reporter-multiple-file-copier.svg?style=flat)](https://www.npmjs.com/package/parcel-reporter-multiple-file-copier)

This is a [Parcel v2](https://v2.parceljs.org) plugin for copying multiple static files.

Forked from [this plugin](https://github.com/jvidalv/parcel-reporter-multiple-static-file-copier).

## Install

Yarn
```bash
$ yarn add -D parcel-reporter-multiple-file-copier
```

NPM
```bash
$ npm install parcel-reporter-multiple-file-copier --save-dev
```

## Usage

Configuration is set under `staticFiles` in `package.json`. It must be an array of objects containing `origin` and `destination` props:

|     Property | Path                                     |
| -------------|----------------------------------------- |
| origin       | Example: _node_modules/@package/public_  |
| destination  | Example: _public_                        |


You **⚠️  must extend** Parcel configuration with the plugin name in `.parcelrc`:

```json
{
  "reporters": [
    "...",
    "parcel-reporter-multiple-file-copier"
  ]
}
```
_*Note that the "..." notation is used to keep the default report plugins loaded by Parcel._

## Example
This example will copy the contents of the folder _public_ into the folder _DIST_DIR_PATH/public_.
_(Note that the DIST_DIR_PATH is specified by Parcel, you don't need to pass it)_

`package.json`
```json
{
  "staticFiles": [
    {
      "origin": "public",
      "destination": "public/"
    }
  ]
}
```
