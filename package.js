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

Npm.depends({
    "mongodb": "2.1.4",
})

Package.registerBuildPlugin({
  name: 'TSBuilder',
  sources: [
    'meteor-mongo-tailable-cursor/ts_handler.js'
  ],
  use: [
    'barbatus:ts-compilers@0.1.8',
    'ecmascript@0.1.4'
  ]
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
      'isobuild:compiler-plugin@1.0.0'
  ], 'server');
  api.addFiles('meteor-mongo-tailablecursor/ts_handler')
  api.addFiles('meteor-mongo-tailable-cursor/interfaces/options.ts', 'server');
  api.addFiles('meteor-mongo-tailable-cursor/meteor-mongo-tailable-cursor.ts', 'server');
});

// Package.onTest(function(api) {
//   api.use('ecmascript');
//   api.use('tinytest');
//   api.use('meteor-mongo-tailable-cursor');
//   api.addFiles('meteor-mongo-tailable-cursor-tests.js');
// });
