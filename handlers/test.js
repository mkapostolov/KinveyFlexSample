module.exports.testReturnError = (context, complete, modules) => {
  complete()
    .setBody("some error here")
    .unauthorized()
    .done();
};
