const sdk = require("kinvey-flex-sdk");
const handlers = require("./handlers/index");

sdk.service({}, function(err, flex) {
  console.log(`===> Flex Service started (SDK v${flex.version})`);
  console.log(process.versions);

  // Flex functions
  for (var funcName in handlers) {
    flex.functions.register(funcName, handlers[funcName]);
  }

  // Intercept and Log every call to a flex function
  (function() {
    var originalProcess = flex.functions.process;

    flex.functions.process = function(task, modules, callback) {
      console.log(`====> ${new Date().toISOString()}`);
      console.log(`function: ${task.taskName}`);
      console.log(`username: ${task.request.username}`);
      console.log(`body: ${task.request.body}`);

      originalProcess(task, modules, callback);
    };
  })();
});
