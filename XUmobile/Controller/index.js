var db = require('../db');
var setting = require("../setting");
function checkSessionExist(){

}
module.exports ={
    view:function(req,res){
        res.render("login.ejs",{
            title:setting.site_title
        });
    },
    login:function(req,res){
       var loginres = db.login(req.body.username,req.body.password);
       //if(loginres) res.redirect("index");
    },
    register:function(req,res){
//        if(db.getUserByName(req.body.username,function(err,data){
//
//        }))
       var regres = db.register(req.body.username,req.body.password,req.body.email);

    }
}