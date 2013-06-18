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

}