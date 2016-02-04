// Package
Package.describe({
  name: 'fhoerth:meteor-mongo-tailable-cursor',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Package for creating a mongo tailable cursor.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

// Mongo driver for nodejs
Npm.depends({
    "mongodb": "2.1.4",
})

Package.onUse(function(api) {
  // Meteor version
  api.versionsFrom('1.2.1');

  // Server
  api.addFiles([
      'meteor-mongo-tailable-cursor/meteor-mongo-tailable-cursor.js'
  ], 'server');

  api.export('MeteorMongoTailableCursor', "server");
});

// Tests
// Package.onTest(function(api) {
//   api.use('ecmascript');
//   api.use('tinytest');
//   api.use('meteor-mongo-tailable-cursor');
//   api.addFiles('meteor-mongo-tailable-cursor-tests.js');
// });
