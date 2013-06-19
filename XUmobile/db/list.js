var mdb = require('mongoose');
var Schema = mdb.Schema;
var db=mdb.connect('mongodb://localhost/xulist');

var listSchema = new Schema({
        content : 	{
        	default: "Empty Todo",
        	type: 	 "String"
        },
		finish : 	{
			default: "false",
			type: 	 "String"
		}
    });

var listModel = mdb.model("list",listSchema);

exports = module.exports = {
	readAll : function(cb){
		var buf = [];
		listModel.find({},function(err,data){
			if(err) throw e;
			if(cb) cb(data);
			console.log(data);
		});

		 
	},
	findOne : function(id,cb){
		listModel.findById(id,function(data){
			if(cb) cb(data);
		})
	},
	addOne : function(data){
		if(data){
			listModel.create(data.body,function(err,doc){
				//console.log(doc);
			})
		}
	},
	update : function(data){
		console.log(data.body._id);
		//listModel.update()

		 listModel.find({_id:data.body._id},function(data){
		 		console.log(data);

		 })
	}
}