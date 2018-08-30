const momentTimeZone = require('moment-timezone');

module.exports = data =>
  new Promise((resolve, reject) => {
    try {
      const timestamp = `${momentTimeZone.tz('Europe/Dublin').format('MMMM Do, h:mm:ss a')} GMT`;
      const subject = `New upload to S3 Bucket: ${data.bucketName}`;
      const textBody = `
      Someone has uploaded ${data.file} ${data.fileSize} bytes to your AWS bucket ${
        data.bucketName
      } on ${timestamp}

      Your Serverless function
      `;
      const htmlBody = `
    <div style="max-width: 600px; margin: 20px auto">
      <h1>Great news!</h1>
      <p style="line-height: 22px; font-size: 16px;">Someone uploaded <b>${data.file}</b> (${
        data.fileSize
      } bytes) to your AWS S3 bucket "${data.bucketName}" on ${timestamp}.</p>
      <p style="line-height: 22px; font-size: 16px;">Congrats!</p>
      <p style="line-height: 22px; font-size: 16px;">Sincerely,</p>
      <p style="line-height: 22px; font-size: 16px;"><i>Your Serverless Function</i></p>
    </div>
  `;
      console.log('Generated Content');
      resolve({
        subject,
        textBody,
        htmlBody
      });
    } catch (error) {
      console.log('Error generating email', error);
      reject(new Error(JSON.stringify(error)));
    }
  });
