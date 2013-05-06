define(function (require, exports, module) {
    window.$ = require('jquery');
    var fv = require("./formValidator");
    $(function () {
        $("#login").css({
            "top": "100px",
            "opacity": 1.0
        })

        $("#username").bind("blur", function () {

            if (fv.idValid($.trim($("#username").val()))) {
                $("#confirmlogin").removeClass("unava").addClass("ava").bind("click", function () {

                });
            }else{
                $("#confirmlogin").removeClass("ava").addClass("unava").unbind();
            }
        });

        $("#register_button").on("click",function() {
            $("#login").css("-webkit-transform","perspective(600px) rotateY(90deg)");
            setTimeout(function (){
                $("#login").hide();
                $("#register").show();
                setTimeout(function() {
                $("#register").css("-webkit-transform","rotateY(0deg)");
                }, 10);
            },500);
        });

        $("#register_post").on("click",function(){
            $.post("/register",{
                "username": $("#reg_username").val(),
                "email": $("#reg_email").val(),
                "password": $("#reg_password").val()
            },function(data){
                console.log(data);
            })
        });
        $("#confirmlogin").on("click",function() {
            $.post("/login",{
                "username":$("#login_username").val(),
                "password":$("#login_password").val()
            },function(data){
                console.log("a")
                console.log(data);
            })
        })
    });
})