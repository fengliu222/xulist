
/*
 * GET home page.
 */
var index = require("../Controller/");
var user = require("../Controller/user");
var project = require("../Controller/project");
var list = require("../Controller/list");

exports=module.exports = function(app){
    app.get('/',index.view);

};