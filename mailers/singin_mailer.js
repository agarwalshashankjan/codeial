const nodemailer = require("../config/nodemailer");

exports.signin = (user) => {
  console.log("inside new signin mailer");
  nodemailer.transporter.sendMail(
    {
      from: "george.ch3cooh@gmail.com", // sender address
      to: user.email, // list of receivers
      subject: "Hello ✔ User signed in", // Subject line
      text: "Hello, new signin found.... Is this You?", // plain text body
      html: `<h1>Hello ${user.name}? Take Action</h1>`, // html body
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      } else {
        console.log("Mail Sent", info);
        return;
      }
    }
  );
};
