const mailer = require('./mailer');

module.exports.s3_notification = (event, context, callback) => {
  const uploadData = event.Records.map(record => ({
    bucketName: record.s3.bucket.name,
    file: record.s3.object.key,
    fileSize: record.s3.object.size
  }))[0];
  mailer
    .generateContent(uploadData)
    .then(content => mailer.sendEmail(content))
    .then(message => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message
        })
      };
      callback(null, response);
    })
    .catch(error => {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error
        })
      };
      callback(null, response);
    });
};
