const axios = require("axios");

module.exports.whitelistingFindIP = (context, complete, modules) => {
  axios
    .get("https://canihazip.com/s")
    .then(response =>
      complete()
        .setBody({ IP: response.data })
        .done()
    )
    .catch(err =>
      complete()
        .setBody(err)
        .badRequest()
        .done()
    );
};
