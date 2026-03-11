const { Resend } = require('resend');
// const oauth = require('../configuration/oauth');
// const nodemailer = require('nodemailer');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendEmail = async (req, res) => {
  try {
    const { name, lastname, email, message, subject = '' } = req.body;

    const { error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['faouzi.aitelhara@gmail.com'],
      replyTo: email,
      subject: `[ENQUIRY]: ${subject} - from ${name} ${lastname}`,
      text: `Message from: ${name} ${lastname}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <p><strong>Message from:</strong> ${name} ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

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

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      status: 'fail',
      message: 'Your message could not be sent, please try again later',
    });
  }
};

// exports.sendEmail = (req, res) => {
//   const { name, lastname, email, message, subject = '' } = req.body;

//   let mailOptions = {
//     from: name,
//     to: 'faouzi.aitelhara@gmail.com, joebarne15@gmail.com',
//     subject: `[ENQUIRY]: ${subject} - from ${name} ${lastname}`,
//     text: message,
//     html:
//       'Message from: ' +
//       name +
//       lastname +
//       '<br></br> Email: ' +
//       email +
//       '<br></br> Message: ' +
//       message,
//   };

//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: oauth,
//   });

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//       return res.status(400).json({
//         error,
//         status: 'fail',
//         message: 'Your message could not be sent, please try again later',
//       });
//     }
//     return res.status(200).json({
//       status: 'success',
//       message: 'Your message was successfully sent, thank you!',
//     });
//   });
// };
