const async = require("async");
const { getRandomInt } = require("./utils");

module.exports.userDelete = (context, complete, modules) => {
  // Get the ids of the users to be deleted
  const idArray = context.body;
  const options = { useBl: false, useUserContext: false };
  const userStore = modules.userStore(options);

  const deleteUser = (userId, callback) => {
    userStore
      .remove(userId)
      .then(success => callback())
      .catch(err => callback(err));
  };

  const asyncLimit = 10; // The maximum number of async operations at a time
  // Execute N async taks simultaneously
  async.eachLimit(idArray, asyncLimit, deleteUser, function(err) {
    if (err) {
      complete(err)
        .runtimeError()
        .done();
    } else {
      complete()
        .setBody({ deletedUsers: idArray })
        .done();
    }
  });
};

module.exports.userCreate = (context, complete, modules) => {
  const options = { useBl: false, useUserContext: false };

  const user = {
    username: "test_" + getRandomInt(100),
    password: "test"
  };

  modules
    .userStore(options)
    .create(user)
    .then(result =>
      complete()
        .setBody(result)
        .created()
        .done()
    )
    .catch(err =>
      complete()
        .setBody(err)
        .runtimeError()
        .done()
    );
};
