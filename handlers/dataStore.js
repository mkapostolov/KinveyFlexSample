module.exports.dataCheckUpsert = (context, complete, modules) => {
  switch (context.method) {
    case 'POST':
      console.log('Created item with _id:', context.body._id);
      break;
    case 'PUT':
      // check if modified and create data is equal
      const { lmt, ect } = context.body_kmd;
      if (lmt === ect) {
        console.log('item was created from upsert');
      } else {
        console.log('item was updated by id');
      }
      break;
  }

  complete().next();
};

module.exports.dataWithQuery = (context, complete, modules) => {
  const query = new modules.Query();
  query.equalTo('country', 'France');

  const userOptions = { useBl: true, useUserContext: true };

  modules
    .dataStore(userOptions)
    .collection('books')
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
  query.lessThanOrEqualTo('_kmd.ect', deleteBefore);

  modules
    .dataStore()
    .collection('books')
    .remove(query)
    .then(result => {
      complete()
        .setBody({ 'Deleted records': result })
        .done();
    })
    .catch(err => {
      complete()
        .setBody(err)
        .runtimeError()
        .done();
    });
};

module.exports.dataCreateItem = (context, complete, modules) => {
  const userOptions = { useBl: true, useUserContext: false };
  const item1 = {
    author: 'Chinua Achebe',
    country: 'Nigeria',
    year: 1958
  };

  modules
    .dataStore(userOptions)
    .collection('books')
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
