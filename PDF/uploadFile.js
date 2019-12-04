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

module.exports.uploadFile = async (file, fileMetadata, url, authorization) => {
  // Return a promise with the response from the upload
  try {
    const metadata = await saveToKinvey(url, authorization, fileMetadata);
    const { _id, _uploadURL, mimeType, size, _requiredHeaders } = JSON.parse(
      metadata
    );

    await saveToGCS(_uploadURL, mimeType, size, _requiredHeaders, file);

    return getFileURL(url, _id, authorization);
  } catch (err) {
    return Promise.reject(err);
  }
};
