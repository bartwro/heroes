var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'heroes2'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/heroes2-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'heroes2'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/heroes2-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'heroes2'
    },
    port: process.env.port,
    db: 'mongodb://40.76.28.46/heroes2-production'
  }
};

module.exports = config[env];
