const async = require("async");
const request = require("request");

module.exports.requestDurationDetails = (context, complete, modules) => {
  const collection = context.body.collection;
  const skipBL = context.body.skipBL;
  const limitItems = context.body.limitItems;
  const numberOfRequests = context.body.numberOfRequests;
  const appKey = modules.backendContext.getAppKey();
  const masterSecret = modules.backendContext.getMasterSecret();
  const host = modules.dataStore()._appMetadata.baasUrl;
  const concurrentRequestslimit = 1;

  const myUrl =
    host + "/appdata/" + appKey + "/" + collection + "?limit=" + limitItems;
  const authString =
    "Basic " + Buffer.from(appKey + ":" + masterSecret).toString("base64");
  const requestOptions = {
    uri: myUrl,
    headers: {
      Authorization: authString,
      "X-Kinvey-Skip-Business-Logic": skipBL,
      "X-Kinvey-Custom": "testRequestDuration"
    },
    method: "GET",
    time: true
  };

  // Start a long-running a task in Flex
  setImmediate(() => {
    console.log("===> testRequestDuration started");
    let timingsArray = [];

    async.timesLimit(
      numberOfRequests,
      concurrentRequestslimit,
      (n, next) => {
        request(requestOptions, (err, resp) => {
          if (err) {
            next(err);
          }

          timingsArray.push(resp.timingPhases);
          next(null, resp);
        });
      },
      function(err, result) {
        if (err) {
          console.log("A request failed", err);
        } else {
          const averageTime = timingsArray.reduce(
            (accumulator, currentValue, currentIndex) => {
              for (var property in accumulator) {
                accumulator[property] =
                  (accumulator[property] + currentValue[property]) / 2; // calculate the average and assign it to the accumulator
              }

              return accumulator;
            }
          );

          console.log(new Date());
          console.log("All requests have been processed successfully");
          console.log("Total requests made:", numberOfRequests);
          console.log("URL:", myUrl);
          console.log("skipBL:", skipBL);
          console.log(averageTime);
        }
      }
    );
  });

  // Immediately complete the handler function.
  // The response will be returned to the caller, and calcAndPostData will execute in the background.
  complete()
    .accepted()
    .done();
};
