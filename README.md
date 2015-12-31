# Foobot dashboard

Experimental dashboard for [Foobot](https://foobot.io/), a IoT device designed to help you to control your indoor air quality.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](nodejs.org) >= v4.2.3 & [NPM](npmjs.com) >= v3.0.0
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test:client` will run the unit tests with Karma and Jasmine.

Running `npm test:e2e` will run the end-to-end tests with Protractor.
