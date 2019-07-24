const nodemailer = require('nodemailer'),
  Token = require('../model/token'),
  doeModel = require('../model/doe'),
  schoolModel = require('../model/school'),
  teacherModel = require('../model/teacher'),
  studentModel = require('../model/student');

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SIKAWAN,
    pass: process.env.EMAIL_PASS
  }
});

exports.confirmation = (req, res, next) => {
  Token.findOne({ token: req.params.token }, (err, token) => {
    if (!token) return next(err);
    Promise.all([
      doeModel.findOne({ _id: token.doe }),
      schoolModel.findOne({ _id: token.school }),
      teacherModel.findOne({ _id: token.teacher }),
      studentModel.findOne({ _id: token.student })
    ])
      .then((user) => {
        user = user[0] || user[1] || user[2] || user[3];
        if (!user) {
          return next(err);
        }
        var link = 'https://sikawanapp-staging.herokuapp.com/login';
        if (user.isVerified) return res.status(200).send(
          'The account has been verified. Please Click On The Link. <br><a href=' + link + '> Login Here');
        user.isVerified = true;
        user.save(err => {
          if (err) {
            return next(err);
          }
          res
            .status(200)
            .send('The account has been verified. Please Click On The Link. <br><a href=' + link + '> Login Here');
        });
      })
      .catch(next);
  });
};

exports.sendEmail = (req, res, next) => {
  const emailOptions = {
    from: process.env.EMAIL_SIKAWAN,
    to: req.body.email,
    subject: 'Username and Password ',
    text: 'Hello,\n\n' + 'This is your username and password for Sikawan Application . \n\n' + 'Username : ' + req.username + '\n' + 'Password : ' + req.password + '\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + req.token + '.\n'
  };
  transporter.sendMail(emailOptions, (err) => {
    if (err) {
      return next(err);
    }
  });
  res.status(200).json({
    success: true,
    message: 'Username and Password has been sent to ' + req.body.email + ' .'
  });
};


