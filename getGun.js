
var cheerio = require("cheerio"),
	fs = require("fs"),
	request = require("request"),
    nodemailer = require('nodemailer');


// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'destiny.cron.tester@gmail.com',
        pass: 'dummypassword'
    }
});


request.get('http://db.destinytracker.com/vendors/570929315', function(err, response, body){
    if (err) {
        console.error(err);
        process.exit(1);
    }

	var $ = cheerio.load(body);
	var allGuns = $(".panel.panel-warning").find(".searchTitle");
	
    allGuns.each(function testIfGun(index, gunTag){
        if ($(gunTag).text() == "D&#228;mmerung FR5") {
		// if ($(gunTag).text() == "Darius-C") {
        // if (true) {
            // NB! No need to recreate the transporter object. You can use
            // the same transporter object for all e-mails

            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: 'Destiny Cron <destiny.cron.tester@gmail.com>', // sender address
                to: 'bryanawjensen@gmail.com, sleeptotal93@gmail.com', // list of receivers
                subject: 'Found it!', // Subject line
                text: 'Found the fusion rifle!', // plaintext body
                html: '<b>We have located the fusion rifle!</b>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            });
        }
	});
});