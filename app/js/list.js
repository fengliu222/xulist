define(function(require, exports, module){
	var $ = require("jquery");
	var _ = require("_");
	var BackBone = require("backbone");
	var Store = require("Store");
	

	var listModel = BackBone.Model.extend({
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
				done:!this.get("finish")
			})
		},
		clear:function(){
			this.destroy();
		}

	});

	var listCollection = BackBone.Collection.extend({
		model: listModel,
		localStorage:new Store("xuTodo"),
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
		el:$("#list_block"),
		initialize:function(){
			_.bindAll(this,'render','remove');
			this.model.bind('change',this.render);
			this.model.bind('distory',this.remove);
		},
		render:function(){
			var temp = _.template($("#listItem").html(),{content:$("#todo_input").val(),done:false});
			$(this.el).html(temp);
			this.input = this.$(".edit");
		},
		events:{
			"click .done" : 	  "toggleDone",
			"click .removeThis" : "remove",
			"dblclick .content" : "activeEdit",
			"keyup .edit" : 	  "update"
		},
		toggleDone:function(){
			this.model.toggleDone();
		},
		remove:function(){
			this.model.clear();
		},
		activeEdit:function(){
			this.input.addClass("editing");
			this.input.focus();
		},
		update:function(){
			this.input.removeClass("editing");
			this.model.save({content:this.input.val()});
		}
	});

	var appView = BackBone.View.extend({
		el: $("#content"),
		
		events:{
			"keyup #todo_input" : "addOne"
		},

		initialize:function(){
			console.log(Store);
			_.bindAll(this,"addOne","addAll");
			this.input = $("#todo_input");
			todos.bind("add",this.addOne);
			//todos.bind("change", this.addOne);
			todos.bind("reset", this.addAll);
			todos.bind("all", this.render);

			todos.fetch();
		},
		render:function(){

		},
		addOne:function(e,todo){

			if(e.keyCode == 13){
				var view = new listView({
					model:listModel
				});
				this.$("list_block").append(view.render())
			}
			
		},
		addAll:function(){
			todos.each(this.addOne)
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