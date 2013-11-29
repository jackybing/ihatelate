(function($) {
	$(function() {
		var default_template = {
			taskId: -1,
			stages: [{"1":"开题"},{"2":"写正文"},{"3":"答辩"}],
			initDefaultStages: function() {
				console.log("taskId: " + this.taskId + "; stages: " + this.stages.toString());
			},
			obtainDefaultStages: function() {
				var that = this;
				$.ajax({
					url: "stageAction!obtainDefaultStage.action",
					data: { type: 20 },
					async: false,
					success: function(json_data_obj) {
						var data_obj = $.parseJSON(json_data_obj);
						// console.log(data_obj);
						if(data_obj.statusCode == "200") {
							that.taskId = data_obj.taskID;
							that.stages = data_obj.stages;
							that.initDefaultStages();
						}
					}
				});
			}
		};
		default_template.obtainDefaultStages();
		
		
		
		
		
	});
})(jQuery);