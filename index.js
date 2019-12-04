const sdk = require('kinvey-flex-sdk');
const handlers = require('./handlers/index');

sdk.service({}, function(err, flex) {
  console.log(`===> Flex Service started (SDK v${flex.version})`);
  console.log(`Node v${process.versions.node}`);

  // Flex functions
  for (var funcName in handlers) {
    flex.functions.register(funcName, handlers[funcName]);
  }
});
