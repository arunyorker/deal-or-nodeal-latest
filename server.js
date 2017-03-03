var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('deal', ['deal']);
app.use(express.static(__dirname + "/"));
app.get('/chooseCase', function (req, res) {
	db.deal.find(function (err, data) {
		res.json(data);
		console.log(data);
	})
});
app.listen(3000, function () {
	console.log("server running ... listen to port 3000");
})