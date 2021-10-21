let express = require("express");
let cron = require('node-cron');
  path = require('path'),
  nodeMailer = require('nodemailer'),
  bodyParser = require('body-parser');

let app = express();

app.use(express.static('src'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/send-email', function (req, res) {
  let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          // should be replaced with real sender's account
          user: 'htest4087@gmail.com',
          pass: 'varun1811'
      },
      from: 'htest4087@gmail.com', 
  });
  let mailOptions = {
      // should be replaced with real recipient's account
      to: req.body.to,
      subject: req.body.subject,
      body: req.body.message
  };
//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           return console.log(error);
//       }
//       console.log('Message %s sent: %s', info.messageId, info.response);
//   });
cron.schedule('* * * * *', () => {
    // Send e-mail
    transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
      });
    });
  res.writeHead(301, { Location: 'index.html' });
  res.end();
});

let server = app.listen(8081, function(){
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
