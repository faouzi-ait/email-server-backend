const oauth = require('../configuration/oauth');
const nodemailer = require('nodemailer');

exports.sendEmail = (req, res) => {
  const { name, lastname, email, message, subject = '' } = req.body;

  let mailOptions = {
    from: name,
    to: 'faouzi.aitelhara@gmail.com, joebarne15@gmail.com',
    subject: `[ENQUIRY]: ${subject} - from ${name} ${lastname}`,
    text: message,
    html:
      'Message from: ' +
      name +
      lastname +
      '<br></br> Email: ' +
      email +
      '<br></br> Message: ' +
      message,
  };

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: oauth,
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(400).json({
        error,
        status: 'fail',
        message: 'Your message could not be sent, please try again later',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Your message was successfully sent, thank you!',
    });
  });
};

