const soap = require("soap");
const request = require("request");

// const WSDL_URL = 'https://sgbwappmovil.com/bmovilws/wlblmovcons.asmx?wsdl';
const WSDL_URL = "http://190.34.191.241:444/bmovilws/wlblmovcons.asmx?wsdl";

module.exports.soapTestWithRequest = (context, complete, modules) => {
  request.get(WSDL_URL, (err, res, body) => {
    if (err) {
      return complete()
        .runtimeError(err)
        .done();
    }

    const responseBody = {
      body,
      code: res.statusCode
    };

   return complete()
      .setBody(responseBody)
      .done();
  });
};

module.exports.soapTestWithSoap = (context, complete, modules) => {
  soap.createClient(WSDL_URL, (err, client) => {
    if (err) {
      return complete()
        .runtimeError(err)
        .done();
    }

   return complete()
      .setBody(client.describe())
      .done();
  });
};

module.exports.soapMethodResponse = (context, complete, modules) => {
  soap.createClient(WSDL_URL, (err, client) => {
    const method = context.body.method;
    const args = context.body.args;

    client[method](args, function(err, result) {
      if (err) {
        return complete()
          .runtimeError(err)
          .done();
      }
      return complete()
        .setBody(JSON.stringify(result))
        .done();
    });
  });
};

module.exports.soapMethodSetImmediate = (context, complete, modules) => {
  soap.createClient(WSDL_URL, (err, client) => {
    const method = context.body.method;
    const args = context.body.args;

    setImmediate(function() {
      client[method](args, function(err, result) {
        if (err) {
          console.log("ERROR", JSON.stringify(err));
        }
        console.log(JSON.stringify(result));
      });
    });

    complete()
      .setBody({request: "started"})
      .done();
  });
};
