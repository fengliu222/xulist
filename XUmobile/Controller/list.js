 var db = require('../db');
var setting = require("../setting");

module.exports = {
	init : function(req,res){
		console.log(req);
	},
	read : function(req,res){
		console.log(req);
		res.end("123");
	},
	add : function(req,res){

	},
	update : function(req,res){

	},
	delete : function(req,res){

	}
}