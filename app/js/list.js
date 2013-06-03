define(function(require, exports, module){
	var $ = require("jquery");

	var listModel = BackBone.Model.extend({
		defaults:{	
			content : "Empty Todo",
			finish : false
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
				done:!this.get("finish");
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
		initialize:function(models,options){
			// this.bind("add",options.view.addOneList);
			// this.bind("remove",options.view.removeOneList);
			// this.bind("done",options.view.doneOneList);
			// this.bind("update",options.view.updateOneList);
		}
	});

	var listView = BackBone.View.extend({
		el:$("#list_block"),
		initialize:function(){
			this.render();
		},
		render:function(){
			var temp = _.template($("#listItem").html(),{content:content,done:done});
			this.el.html(temp);
		}
		events:{
			"keyup .todo_input" : "add",
			"click .done" : "toggleDone",
			"click .removeThis" : "remove",
			"dblclick .content" : "activeEdit"
		},

	});

})