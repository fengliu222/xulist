define(function(require,exports,module){
    window.$= require('jquery');
    var fv = require("./formValidator")
    $(function(){
        $("#login").css({
            "top":"100px",
            "opacity":1.0
        })

        $("#username").bind("blur",function(){

            if(fv.idValid($.trim($("#username").val()))){
                $("#confirmlogin").removeClass("unava").addClass("ava").bind("click",function(){

                });
            }else{
                $("#confirmlogin").removeClass("ava").addClass("unava").unbind();
            }
        })
    });
})