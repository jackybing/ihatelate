var tiModify = {
	setSwitch: function(switch_check_ele, is_active) {
		if(is_active) {
			switch_check_ele.parent().removeClass("switch-off").addClass("switch-on");
		} else {
			switch_check_ele.parent().removeClass("switch-on").addClass("switch-off");
		}
	},
	obtainStagesCompletionArray: function(task_id) {
		var ret_array = [];
		$.ajax({
			url: "writePaperTaskAction!obtainStagesInfo.action",
			data: {
				id: task_id
			},
			async: false,
			success: function(response_data) {
				response_data = $.parseJSON(response_data);
				if(response_data.statusCode == "200") {
					var stages = response_data.stages;
					for(var s_key in stages) {
						var s_val = stages[s_key];
						var s_step = s_key.substring(0, s_key.indexOf(":"));
						var s_val_splt_idx = s_val.indexOf(":");
						var s_total = parseInt(s_val.substring(0, s_val_splt_idx)), s_comp = parseInt(s_val.substring(s_val_splt_idx + 1));
						console.log("s_step: " + s_step);
						console.log("s_comp: " + s_comp);
						console.log("s_total: " + s_total);
						ret_array[s_step - 1] = (s_comp == s_total);
					}
				}
			}
		});
		console.log("ret_array: ");
		console.log(ret_array);
		return ret_array;
	},
	fillStages: function(stages_well_ele, stages, task_id) {
		var this_ptr = this;
		var stages_completion_array = this_ptr.obtainStagesCompletionArray(task_id);
		var stages_array = [], stages_html_array = [];
		for(var s_idx in stages) {
			var stage = stages[s_idx], step = stage.step;
			console.log(stage);
			stages_array[step - 1] = stage;
			
		}
		console.log(stages_array);
		for(var s_idx in stages_array) {
			var stage = stages_array[s_idx], step = stage.step, name = stage.name, time = stage.time;
			var is_completed = stages_completion_array[s_idx], class_readonly = is_completed ? " readonly" : "";
			stages_html_array.push('<div id="fb-mti-paper-stage-wrapper-', step, '" data-step="', step, '">',
  				'<div class="control-group">',
  					'<label class="control-label" for="fb-mti-paper-sname-', step, '">Stage ', step, ' Name:</label>',
  					'<div class="controls">',
  						'<input value="', name, '" type="text" id="fb-mti-paper-sname-', step, '" placeholder="Stage ', step, ' Name" class="input-width-280px"', class_readonly, ' />',
  						'<span class="help-inline"></span>',
  					'</div>',
  				'</div>',
  				'<div class="control-group">',
  					'<label class="control-label" for="fb-mti-paper-stime-', step, '">Stage ', step, ' Time:</label>',
  					'<div class="controls">',
  						'<input value="', time, '" type="text" id="fb-mti-paper-stime-', step, '" placeholder="Stage ', step, ' Time" class="input-width-280px"', class_readonly, ' />',
  						'<span class="help-inline"></span>',
  					'</div>',
  				'</div>',
  			'</div>');
			
		}
		stages_well_ele.html(stages_html_array.join(""));
	},
	fillTaskInfoModal: function(task_info) {
		var this_ptr = this;
		console.log("taskInfo: ");
		console.log(task_info);
		var cur_task_type = task_info.type;
		if(cur_task_type == "10") {	// Read Book
			
			
		} else if(cur_task_type == "11") {	// Open Class
			
			
		} else if(cur_task_type == "12") {	// 健身
			
			
		} else if(cur_task_type == "20") {	// 写论文
			var paper_form_div = $("#fb-mti-form-paper").show();
			paper_form_div.find("#fb-mti-paper-task-name").val(task_info.name);
			paper_form_div.find("#fb-mti-paper-start-time").val(task_info.startTime.substring(0, 10));
			paper_form_div.find("#fb-mti-paper-end-time").val(task_info.endTime.substring(0, 10));
			paper_form_div.find("#fb-mti-paper-total-day").val(task_info.totalDay);
			paper_form_div.find("#fb-mti-paper-name").val(task_info.paperName);
			this_ptr.setSwitch(paper_form_div.find("#fb-mti-paper-is-active"), task_info.isActive);
			this_ptr.fillStages($("#fb-mti-paper-stages"), task_info.stages, task_info.id);
			
		} else if(cur_task_type == "21") {	// 申请大学
			
		}
		
	},
	showTaskInfoModal: function(task_id) {
		var this_ptr = this;
		$.ajax({
			url: "taskAction!obtainTaskByTaskID.action",
			data: {
				id: task_id
			},
			success: function(response_data) {
				response_data = $.parseJSON(response_data);
				console.log("response_data: ");
				console.log(response_data);
				if(response_data.statusCode == "200") {
					var task_info = response_data.taskInfo;
					this_ptr.fillTaskInfoModal(task_info);
					
				} else {
					alert("Server is crashed when obtaining task information");
				}
				
				$("#fb-modify-task-info").modal("show");
			}
		});
		
	}

};