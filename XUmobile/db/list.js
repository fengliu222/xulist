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

			})
		}
	},
	update : function(data,cb){
	
		//listModel.update()

		 listModel.update(
		 	{
		 		_id:data.body._id
		 	},
		 	{
			 	$set : {
			 		content : data.body.content,
			 		finish :  data.body.finish
			 	}
		 	},
		 	{},
		 	function(err,num){
		 		if(err) cb(err,num);
		 		if(num) cb(null,num);
		 });
	},
	removeOne : function(id,cb){
		console.log(id);
		listModel.remove({_id : id},function(){
			if(cb) cb();
		});
	}
}