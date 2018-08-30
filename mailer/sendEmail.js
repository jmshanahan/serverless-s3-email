const mailer = require('nodemailer');
const config = require('./config');

module.exports = content =>
  new Promise((resolve, reject) => {
    const transporter = mailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Port 587 is an unsecure port
      secure: false,
      service: 'gmail',
      auth: {
        user: config.user,
        pass: config.password
      }
    });
    let recipents = '';
    config.to.forEach(recipient => {
      recipents += `${recipient},`;
    });
    const mailOptions = {
      from: 'comeraghsolutions@gmail.com',
      to: recipents,
      subject: content.subject,
      text: content.textBody,
      html: content.html
    };
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        const errorMessage = JSON.stringify(error);
        console.log('Error sending email', errorMessage);
        reject(new Error(JSON.stringify(error)));
      } else {
        const successMessage = `Message ${info.messageId} send: ${info.response}`;
        console.log(successMessage);
        resolve(successMessage);
      }
    });
  });
