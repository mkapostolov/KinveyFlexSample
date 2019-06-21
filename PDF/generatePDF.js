var Report = require("fluentreports/lib/fluentReports").Report;

module.exports.generatePDF = () => {
  var data = [
    {
      name: "Elijah",
      age: 18
    },
    {
      name: "Abraham",
      age: 22
    },
    {
      name: "Gavin",
      age: 28
    }
  ];

  // Return a promise so that it can be chained
  return new Promise((resolve, reject) => {
    new Report("buffer")
      .fontsize(9)
      .margins(40)
      .header(["Employee Ages"])
      .detail([["name", 200], ["age", 50]])
      .data(data)
      .render(function(error, pdfBuffer) {
        if (error) {
          reject(error);
        }
        resolve(pdfBuffer);
      });
  });
};
