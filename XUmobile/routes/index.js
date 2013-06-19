
/*
 * GET home page.
 */
var index = require("../Controller/");
// var user = require("../Controller/user");
// var project = require("../Controller/project");
var list = require("../Controller/list");

exports=module.exports = function(app){

    app.get('/',index.view);
    app.get('/app',index.appview);
    app.post('/login',index.login);
    app.post('/register',index.register);
 
 	app.get("/list/",list.read);
    app.get("/list/:id",list.readOne);
    app.post("/list",list.add);
    app.put("/list/",list.update);
    app.delete("/list/:id",list.delete);
};