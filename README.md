# Express User-agent Blocker 🤖

[![Build Status](https://travis-ci.org/ouq77/express-user-agent-blocker.svg?branch=master)](https://travis-ci.org/ouq77/express-user-agent-blocker) [![Coverage Status](https://coveralls.io/repos/github/ouq77/express-user-agent-blocker/badge.svg?branch=master)](https://coveralls.io/github/ouq77/express-user-agent-blocker?branch=master)

A lightweight user-agent blocker for Express.

## Why?

Some bots just don't play by the rules and blatantly disrespect `robots.txt`. For those bots, we say **"Nothing to see here - move along please..."**

## Installation

```shell
npm i express-user-agent-blocker
```

## Usage

This module has no dependencies and can be added anywhere in the `express` chain as long as it runs before serving any content that needs to be blocked.

```js
const express = require('express')
const userAgentBlocker = require('express-user-agent-blocker')

const app = express()

// ...
// other middleware
// ...
app.use(userAgentBlocker(['Baiduspider', 'SomeHorridUA']))
// ...
// more middleware
// ...
```

## Result

Any unwanted UAs visiting your application will be sent a `JSON` response:

```json
{
  "message": "Nothing to see here - move along please..."
}
```

## Tests

Tested in node >= 6

Run tests with:
```shell
npm test
```

## Changelog

### v1.1.2

- Moved test files out of src folder
- Using rollup to compile module files into single index.js

### pre v1.1.2

- Changelog didn't exist! 🙈

## Todo

- Enable optional message/template to send to blocked UAs
- Enable passing in of alternative logger (currently defaults to `process.stdout`)

## License

[MIT](LICENSE)
