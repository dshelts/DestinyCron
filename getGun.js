
var cheerio = require("cheerio"),
	fs = require("fs"),
	request = require("request");
request.get('http://db.destinytracker.com/vendors/570929315', function(err, response, body){ 
	var $ = cheerio.load(body);
	var allGuns = $(".panel.panel-warning").find(".searchTitle");
	allGuns.each(function testIfGun(index, entry){
		if($(entry).text() == "D&#228;mmerung FR5") console.log("Found Fusion Rifle blue");		
	} );

});