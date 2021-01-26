//callback added


function sendEmail(email, subject, body, callback) {
    const nodemailer = require('nodemailer')
  console.log(email);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // user: 'express123mean@gmail.com',
        // pass: 'sunbeam123'
        user: 'express123mean@gmail.com',
        pass: 'sunbeam123'
      }
    });
  
    var mailOptions = {
      from: 'express123mean@gmail.com',
      to: email,
      subject: subject,
      html: body
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
  
      callback(error, info)
    })
  }
  
  module.exports = {
    sendEmail: sendEmail
  }
  