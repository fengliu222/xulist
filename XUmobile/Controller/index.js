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
    login:function(username,password){
       var loginres = db.login(username,password);
       if(loginres) res.redirect("index");
    }
}