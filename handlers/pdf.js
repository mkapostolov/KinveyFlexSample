const { uploadFile } = require('../PDF/uploadFile');
const { generatePDF } = require('../PDF/generatePDF');

module.exports.uploadPDF = async (context, complete, modules) => {
  const host = 'https://baas.kinvey.com';
  const appKey = modules.backendContext.getAppKey();
  const url = host + '/blob/' + appKey;
  const { authorization } = context.headers;

  try {
    const binaryFile = await generatePDF();

    const fileMetadata = {
      _filename: 'sampleReport.pdf',
      _public: true,
      mimeType: 'application/pdf',
      size: binaryFile.length
    };

    const uploadedFileInfo = await uploadFile(
      binaryFile,
      fileMetadata,
      url,
      authorization
    );

    complete()
      .setBody(uploadedFileInfo)
      .done();
  } catch (err) {
    complete()
      .setBody(err)
      .runtimeError()
      .done();
  }
};
