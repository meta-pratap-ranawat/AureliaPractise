require('babel-register');
require('babel-polyfill');

exports.config = {
directConnect: true,

capabilities: {
    browserName: 'chrome'
},

specs: ['test/e2e/**.js'],

plugins: [{
    path:'./node_modules/aurelia-protractor-plugin'
}]
};