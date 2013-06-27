var db = require('../db');
var listModel = require("../db/list");
var setting = require("../setting");

module.exports = {
	init : function(req,res){
		//console.log(req);
	},
	read : function(req,res){
		listModel.readAll(function(data){
			res.send(data);
			res.end();
		});
		//console.log( listModel.readAll())
		
	},
	readOne : function(req,res,cb){
		var id = req.params.id;
		listModel.findOne(id,function(data){
			res.end(data);
		})
	},
	add : function(req,res){
		//console.log(req);
		listModel.addOne(req);
	},
	update : function(req,res){
		console.log(req.body);
		listModel.update(req,function(err,num){
			console.log(num);
			res.end();
		});

	},
	delete : function(req,res){
		console.log(req);
		listModel.removeOne(req.params.id,function(){
			res.end();
		});
	}
}