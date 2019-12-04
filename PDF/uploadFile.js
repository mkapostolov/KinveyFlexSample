const request = require('request-promise-native'); // Using request library with support for Promises

function saveToKinvey(url, authorization, fileMetadata) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: authorization,
    'X-Kinvey-Content-Type': fileMetadata.mimeType
  };

  return request({
    url,
    method: 'POST',
    headers: headers,
    body: JSON.stringify(fileMetadata)
  });
}

function saveToGCS(url, mimeType, size, requiredHeaders, fileBuffer) {
  requiredHeaders['Content-Lenght'] = size;
  requiredHeaders['Content-Type'] = mimeType;

  return request({
    url,
    method: 'PUT',
    headers: requiredHeaders,
    body: fileBuffer
  });
}

function getFileURL(url, fileId, authorization) {
  const headers = {
    Authorization: authorization
  };

  return request({
    url: url + '/' + fileId,
    method: 'GET',
    headers: headers
  });
}

module.exports.uploadFile = (file, fileMetadata, url, authorization) => {
  let fileId;
  // Return a promise with the response from the upload
  return saveToKinvey(url, authorization, fileMetadata)
    .then(kinveyResponse => {
      const res = JSON.parse(kinveyResponse);
      fileId = res._id;

      return saveToGCS(
        res._uploadURL,
        res.mimeType,
        res.size,
        res._requiredHeaders,
        file
      );
    })
    .then(() => getFileURL(url, fileId, authorization));
};
