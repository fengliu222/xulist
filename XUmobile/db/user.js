var mdb = require('mongoose');
var Schema = mdb.Schema;
var db;

var userSchema = new Schema({
        username:String,
        password:String,
        email:String,
        role:String,
        Department:String,
        registDate:Date
    })
    ,postSchema = new Schema({
        createdate:Date,//创建日期
        status:String, // red yellow green,优先级
        partner:[userSchema],//参与人
        complete:Boolean,//是否完成？
        title:String,//标题
        description:String,//具体描述
        demand:String//需求


    })
    ,projectSchema = new Schema({
        projectname:String,
        createdate:Date
    });

//Define model
var userModel = mdb.model("user",userSchema);
var postModel = mdb.model("post",postSchema);
var projectModel = mdb.model("project",projectSchema);


module.exports = {
    init:function(){
        db=mdb.connect('mongodb://localhost/xulist');
    },
    register:function(username,password,email,role,department,callback){
       console.log(email);
        var userdoc = {
            username:username,
            password:password,
            email:email,
            role:role,
            Department:department,
            registDate:new Date()
        }
        userModel.create(userdoc,function(err,doc){
            if(err){
                controller.resErr(err);
            }else{
                if(callback) callback(doc);
            }
        })
    },
    login:function(username,password){
        var emailreg=/[a-z0-9-]{1,30}@[a-z0-9-]{1,65}.[a-z]{3}/;
        userModel.findOne({
            "$or":[{"username":username},{"email":username}]
        },function(err,user){
            if(err || user==null) {
                console.log(err);
                return false;
            }else{
                if(password == user.password){
                    //success
                    console.log(user);
                    console.log("success");
                }else{
                    //failed
                    console.log("fail")

                }
            }
        });
    },
    getUserByName:function(username,callback){
        userModel.findOne({
            "$or":[{"username":username},{"email":username}]
        },function(err,user){
            if(callback) callback(err,user);
        });
    },
    createProject:function(projectname){

    }

}