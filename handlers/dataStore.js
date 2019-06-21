module.exports.dataCheckUpsert = (context, complete, modules) => {
  switch (context.method) {
    case "POST":
      console.log("Created item with _id:", context.body._id);
      break;
    case "PUT":
      // check if modified and create data is equal
      const { lmt, ect } = context.body_kmd;
      if (lmt === ect) {
        console.log("item was created from upsert");
      } else {
        console.log("item was updated by id");
      }
      break;
  }

  complete().next();
};

module.exports.dataWithQuery = (context, complete, modules) => {
  const query = new modules.Query();
  query.equalTo("_id", "5ab12eb434fcd45ca0f9e34a");
  query.equalTo("username", "Pesho");

  const userOptions = { useBl: true, useUserContext: true };

  modules
    .dataStore(userOptions)
    .collection("Books")
    .find(query)
    .then(result =>
      complete()
        .setBody(result)
        .done()
    )
    .catch(err =>
      complete(err)
        .runtimeError()
        .done()
    );
};

module.exports.dataDeleteOldItems = (context, complete, modules) => {
  const { deleteBefore } = context.body;
  const query = new modules.Query();
  query.lessThanOrEqualTo("_kmd.ect", deleteBefore);

  modules
    .dataStore()
    .collection("Books")
    .remove(query)
    .then(result => {
      complete()
        .setBody({ "Deleted records": result })
        .done();
    })
    .catch(err => {
      complete()
        .setBody(err)
        .runtimeError()
        .done();
    });
};

module.exports.dataSaveMultiple = (context, complete, modules) => {
  const userOptions = { useBl: true, useUserContext: false };
  const item1 = { Title: "1" };

  modules
    .dataStore(userOptions)
    .collection("Books")
    .save(item1)
    .then(result =>
      complete()
        .setBody(result)
        .done()
    )
    .catch(err =>
      complete(err)
        .runtimeError()
        .done()
    );
};

module.exports.dataSaveMany = (context, complete, modules) => {
  const userOptions = { useBl: false, useUserContext: false };
  const item1 = {
    Title: "Title ",
    Author: "Author "
  };

  modules
    .dataStore(userOptions)
    .collection("Books")
    .save(item1)
    .then(result =>
      complete()
        .setBody(result)
        .done()
    )
    .catch(err =>
      complete(err)
        .runtimeError()
        .done()
    );
};
