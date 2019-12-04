const handlerFn = Object.assign(
  {},
  require('./email'),
  require('./helpers'),
  require('./dataStore'),
  require('./user'),
  require('./pdf'),
  require('./whitelisting')
);

module.exports = handlerFn;
