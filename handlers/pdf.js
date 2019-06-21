const { uploadFile } = require("../PDF/uploadFile");
const { generatePDF } = require("../PDF/generatePDF");

module.exports.uploadPDF = (context, complete, modules) => {
  const host = "https://baas.kinvey.com";
  const appKey = modules.backendContext.getAppKey();
  const url = host + "/blob/" + appKey;
  const { authorization } = context.headers;

  generatePDF()
    .then(binaryFile => {
      const fileMetadata = {
        _filename: "sampleReport.pdf",
        _public: true,
        mimeType: "application/pdf",
        size: binaryFile.length
      };

      return uploadFile(binaryFile, fileMetadata, url, authorization);
    })
    .then(response =>
      complete()
        .setBody(response)
        .done()
    )
    .catch(err =>
      complete()
        .setBody(err)
        .runtimeError()
        .done()
    );
};
