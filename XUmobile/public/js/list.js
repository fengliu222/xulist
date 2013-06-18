define(function(require, exports, module){
	var $ = require("jquery");
	var _ = require("_");
	var BackBone = require("backbone");
	var Store = require("Store");
	

	var listModel = BackBone.Model.extend({
		urlRoot:"",
		defaults:{	
			content : 	"Empty Todo",
			finish : 	false
		},
		initialize:function(){
			if(!this.get("content")){
				this.set({
					"content": this.defaults.content
				});
			}
		},
		toggle:function(){
			this.save({
				finish:!this.get("finish")
			})
		},
		clear:function(){
			this.destroy();
		}

	});

	var listCollection = BackBone.Collection.extend({
		model: listModel,
		url:"http://127.0.0.1:3000/list/",
		done:function(){
			return this.filter(function(todo){
				todo.get("finish");
			})
		},
		remaining:function(){
			return this.without.apply(this,this.done());
		},
		nextOrder:function(){
			if(!this.length) return 1;
			return this.last().get("order") + 1; //最新一条记录的编号
		},
		comparator:function(todo){
			return todo.get("order");
		}

	});


	var listView = BackBone.View.extend({
		initialize:function(){
			_.bindAll(this,'render','remove');
			this.model.bind('change',this.render);
			this.model.bind('distory',this.remove);

			this.input = this.$(".editBlock input");

		},
		render:function(){
			var temp = _.template($("#listItem").html(),this.model.toJSON());

			$(this.el).html(temp);
			return this;
		},
		events:{
			"click .done" : 	  "toggleDone",
			"click .removeThis" : "clear",
			"dblclick .content" : "activeEdit",
			"keyup .edit" : 	  "update",
			"blur .edit" :        "cancelUpdate"
		},
		toggleDone:function(){
			this.model.toggle();
		},
		clear:function(){
			this.model.clear();
			this.$el.remove();
		},
		activeEdit:function(){
			this.$(".content").hide();
			this.$(".editBlock").show();
			this.$(".editBlock input").val(this.$(".content").html())
			this.$(".editBlock input").focus();
		},
		update:function(e){
			if(e.keyCode!=13) return;

			this.$(".content").show();
			this.$(".editBlock").hide();
			this.model.save({content:this.$(".editBlock input").val()});
		},
		cancelUpdate:function(){
			this.$(".content").show();
			this.$(".editBlock").hide();
		}
	});

	var appView = BackBone.View.extend({
		el: $("#content"),
		
		events:{
			"keyup #todo_input" : "createOnEnter"
		},

		initialize:function(){
			_.bindAll(this,"addOne","addAll");
			this.input = $("#todo_input");
			todos.bind("add",this.addOne);
			//todos.bind("change", this.addOne);
			todos.bind("reset", this.addAll);
			//todos.bind("all", this.render);

			todos.fetch({
				success:function(collection,response){
					console.log("123");
				}
			});
		 
		},
		render:function(){
			console.log("1");
		},
		addOne:function(todo){

			var view = new listView({
				model:todo
			});

			$("#list_block").prepend(view.render().el);
		},
		createOnEnter:function(e){
			if(e.keyCode == 13){
				todos.create({content:this.input.val()});
				this.input.val(" ");
			}
		},
		addAll:function(){

			todos.each(this.addOne,this);
		},
		newAttr:function(){
			return {
				content: this.input.val(),
				order:   todos.nextOrder(),
				done:    false
			}
		}
	});

	var todos = new listCollection;
	var app = new appView;
	app.render();
})