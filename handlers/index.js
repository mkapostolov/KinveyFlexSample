const handlerFn = Object.assign(
  {},
  require("./email"),
  require("./helpers"),
  require("./requestDuration"),
  require("./dataStore"),
  require("./user"),
  require("./test"),
  require("./pdf"),
  require("./whitelisting")
);

module.exports = handlerFn;
