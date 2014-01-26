var TiModify = {
	setSwitch: function(switch_check_ele, is_active) {
		if(is_active) {
			switch_check_ele.parent().removeClass("switch-off").addClass("switch-on");
		} else {
			switch_check_ele.parent().removeClass("switch-on").addClass("switch-off");
		}
	},
	obtainStagesCompletionArray: function(task_id, task_type) {
		var ret_array = [];
		var type_url_dict = {
			"20": "writePaperTaskAction!obtainStagesInfo.action",
			"21": "applyUniversityTaskAction!obtainStagesInfo.action"
		};
		$.ajax({
			url: type_url_dict[task_type],
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
						ret_array[s_step - 1] = (s_comp == s_total);
					}
				}
			}
		});
		return ret_array;
	},
	fillStages: function(stages_well_ele, stages, task_id, task_type) {
		var this_ptr = this;
		var stages_completion_array = this_ptr.obtainStagesCompletionArray(task_id, task_type);
		var stages_array = [], stages_html_array = [];
		
		var type_token_dict = {
			"20": "paper",
			"21": "university"
		};
		var type_token = type_token_dict[task_type];
		
		$("#save-fbmti-btn").data("stageNum", stages.length);
		for(var s_idx in stages) {
			var stage = stages[s_idx], step = stage.step;
			// console.log(stage);
			stages_array[step - 1] = stage;
		}
		for(var s_idx in stages_array) {
			var stage = stages_array[s_idx], step = stage.step, name = stage.name, time = stage.time;
			var is_completed = stages_completion_array[s_idx], class_readonly = is_completed ? " readonly" : "";
			stages_html_array.push('<div id="fb-mti-', type_token, '-stage-wrapper-', step, '" data-step="', step, '">',
  				'<div class="control-group">',
  					'<label class="control-label" for="fb-mti-', type_token, '-sname-', step, '">Stage ', step, ' Name:</label>',
  					'<div class="controls">',
  						'<input value="', name, '" type="text" id="fb-mti-', type_token, '-sname-', step, '" placeholder="Stage ', step, ' Name" class="input-width-280px"', class_readonly, ' />',
  						'<span class="help-inline"></span>',
  					'</div>',
  				'</div>',
  				'<div class="control-group">',
  					'<label class="control-label" for="fb-mti-', type_token, '-stime-', step, '">Stage ', step, ' Time:</label>',
  					'<div class="controls">',
  						'<input value="', time, '" type="text" id="fb-mti-', type_token, '-stime-', step, '" placeholder="Stage ', step, ' Time" class="input-width-280px"', class_readonly, ' />',
  						'<span class="help-inline"></span>',
  					'</div>',
  				'</div>',
  			'</div>');
			
		}
		stages_well_ele.html(stages_html_array.join(""));
	},
	fillTaskInfoModal: function(task_info) {
		$(".fb-mti-form").hide();
		var this_ptr = this;
		// console.log("taskInfo: ");
		// console.log(task_info);
		var cur_task_type = task_info.type;
		$("#save-fbmti-btn").data("taskType", cur_task_type);
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
			this_ptr.fillStages(paper_form_div.find("#fb-mti-paper-stages"), task_info.stages, task_info.id, task_info.type);
			
		} else if(cur_task_type == "21") {	// 申请大学
			var univer_form_div = $("#fb-mti-form-university").show();
			univer_form_div.find("#fb-mti-university-task-name").val(task_info.name);
			univer_form_div.find("#fb-mti-university-start-time").val(task_info.startTime.substring(0, 10));
			univer_form_div.find("#fb-mti-university-end-time").val(task_info.endTime.substring(0, 10));
			univer_form_div.find("#fb-mti-university-total-day").val(task_info.totalDay);
			univer_form_div.find("#fb-mti-university-name").val(task_info.universityName);
			univer_form_div.find("#fb-mti-university-deadline").val(task_info.deadline);
			univer_form_div.find("#fb-mti-university-material").val(task_info.material);
			this_ptr.setSwitch(univer_form_div.find("#fb-mti-university-is-active"), task_info.isActive);
			this_ptr.fillStages(univer_form_div.find("#fb-mti-university-stages"), task_info.stages, task_info.id, task_info.type);
			
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
				// console.log("response_data: ");
				// console.log(response_data);
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
// 保存编辑过的任务信息
var TiSave = {
	savePaperMti: function(stage_num) {
		// 获取控件
		var task_name_ele = $("#fb-mti-paper-task-name"), start_time_ele = $("#fb-mti-paper-start-time"),
			end_time_ele = $("#fb-mti-paper-end-time"), total_day_ele = $("#fb-mti-paper-total-day"),
			paper_name_ele = $("#fb-mti-paper-name"), is_active_ele = $("#fb-mti-paper-is-active");
		// 获取值
		var task_name = $.trim(task_name_ele.val()), start_time = $.trim(start_time_ele.val()),
			end_time = $.trim(end_time_ele.val()), total_day = $.trim(total_day_ele.val()),
			paper_name = $.trim(paper_name_ele.val()),
			is_active = is_active_ele.parent().hasClass("switch-on") ? "1" : "0";;
		// 对输入控件的值进行检测，如果不对，显示error tip
		var is_validate = true;
		if(task_name == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(task_name_ele, "Please input a task name");
			is_validate = false;
		}
		if(start_time == "" && end_time == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(start_time_ele, "Please input a start date and an end date");
			is_validate = false;
		} else if(start_time == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(start_time_ele, "Please input a start date");
			is_validate = false;
		} else if(end_time == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(end_time_ele, "Please input an end date");
			is_validate = false;
		}
		if(start_time == "" || end_time == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_ele, "Please input Date Range first");
			is_validate = false;
		} else if(total_day == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_ele, "Please input days you plan to spend on this task");
			is_validate = false;
		} else if(isNaN(total_day)) {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_ele, "Please input an integer");
			is_validate = false;
		} else if(parseInt(total_day) != parseFloat(total_day)) {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_ele, "Please input an integer, not a float");
			is_validate = false;
		} else {
			total_day = parseInt(total_day);
			total_day_ele.val(total_day).trigger("change");
			var date_range_days = IHL_TaskFormOprtObj.computeDateRangeDays(start_time, end_time);
			if(total_day < 1) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_ele, "You must cost at least 1 day on this task");
				is_validate = false;
			} else if(total_day > date_range_days) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_ele, "You must cost no more than " + date_range_days + " days (on date range)");
				is_validate = false;
			}
		}
		if(paper_name == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(paper_name_ele, "Please input a paper name");
			is_validate = false;
		}
		// 检测stages数据
		var stages = [], stage_num = parseInt(stage_num);
		for(var i = 1; i <= stage_num; i++) {
			var sname_ele = $("#fb-mti-paper-sname-" + i), stime_ele = $("#fb-mti-paper-stime-" + i);
			var sname = $.trim(sname_ele.val()), stime = $.trim(stime_ele.val());
			if(sname == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(sname_ele, "Please input a stage name");
				is_validate = false;
			}
			if(stime == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(stime_ele, "Please input a stage time");
				is_validate = false;
			} else if(isNaN(stime)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(stime_ele, "Please input an integer");
				is_validate = false;
			} else if(parseInt(stime) != parseFloat(stime)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(stime_ele, "Please input an integer, not a float");
				is_validate = false;
			}
			if(is_validate) {
				stages.push({step: i, name: sname, time: stime});
			}
			
		}
		// 若通过检测 则提交并保存
		if(is_validate) {
			IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Saving ...<h1>");
			var task_id = $("#fb-paper-modal-label").data("taskId");
			$.ajax({
				url: "writePaperTaskAction!update.action",
				data: {
					id: task_id,
					name: task_name,
					startTime: start_time,
					endTime: end_time,
					totalDay: total_day,
					isActive: is_active,
					paperName: paper_name,
					stages: JSON.stringify(stages)
				},
				type: "post",
				success: function(json_data) {
					var data = $.parseJSON(json_data);
					// console.log(data);
					IHL_BlockMsgObj.unblockMsg(function() { 
                        if(data.statusCode == "200") {
							$.growlUI('Success', data.info);
							var vs_iframe_ele = $("#vs-iframe"), vs_fb_div_ele = vs_iframe_ele.contents().find("#vs-fb-div");
							if(vs_fb_div_ele) {
								vs_fb_div_ele.html(vs_iframe_ele[0].contentWindow.NonQuantStageInfo_Module.obtainStageHtml(task_id, "20").join(""));
							}
						} else {
							$.growlUI('Error', data.info);
						}
                    });

				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					IHL_BlockMsgObj.unblockMsg(function() { 
                        $.growlUI('Error', textStatus + " " + errorThrown);
                    });
				}
			});
		}
			
	},
	saveUniversityMti: function(stage_num) {
		// 获取控件
		var task_name_ele = $("#fb-mti-university-task-name"), start_time_ele = $("#fb-mti-university-start-time"),
			end_time_ele = $("#fb-mti-university-end-time"), total_day_ele = $("#fb-mti-university-total-day"),
			university_name_ele = $("#fb-mti-university-name"), deadline_ele = $("#fb-mti-university-deadline"),
			material_ele = $("#fb-mti-university-material"), is_active_ele = $("#fb-mti-university-is-active");
		// 获取值
		var task_name = $.trim(task_name_ele.val()), start_time = $.trim(start_time_ele.val()),
			end_time = $.trim(end_time_ele.val()), total_day = $.trim(total_day_ele.val()),
			university_name = $.trim(university_name_ele.val()), deadline = $.trim(deadline_ele.val()),
			material = $.trim(material_ele.val()),
			is_active = is_active_ele.parent().hasClass("switch-on") ? "1" : "0";;
		// 对输入控件的值进行检测，如果不对，显示error tip
		var is_validate = true;
		if(task_name == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(task_name_ele, "Please input a task name");
			is_validate = false;
		}
		if(start_time == "" && end_time == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(start_time_ele, "Please input a start date and an end date");
			is_validate = false;
		} else if(start_time == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(start_time_ele, "Please input a start date");
			is_validate = false;
		} else if(end_time == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(end_time_ele, "Please input an end date");
			is_validate = false;
		}
		if(start_time == "" || end_time == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_ele, "Please input Date Range first");
			is_validate = false;
		} else if(total_day == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_ele, "Please input days you plan to spend on this task");
			is_validate = false;
		} else if(isNaN(total_day)) {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_ele, "Please input an integer");
			is_validate = false;
		} else if(parseInt(total_day) != parseFloat(total_day)) {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_ele, "Please input an integer, not a float");
			is_validate = false;
		} else {
			total_day = parseInt(total_day);
			total_day_ele.val(total_day).trigger("change");
			var date_range_days = IHL_TaskFormOprtObj.computeDateRangeDays(start_time, end_time);
			if(total_day < 1) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_ele, "You must cost at least 1 day on this task");
				is_validate = false;
			} else if(total_day > date_range_days) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_ele, "You must cost no more than " + date_range_days + " days (on date range)");
				is_validate = false;
			}
		}
		if(university_name == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(university_name_ele, "Please input an university name");
			is_validate = false;
		}
		if(deadline == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(deadline_ele, "Please input a deadline");
			is_validate = false;
		}
		if(material == "") {
			IHL_ErrorTipObj.showErrTipAndScroll2Ele(material_ele, "Please input material");
			is_validate = false;
		}
		// 检测stages数据
		var stages = [], stage_num = parseInt(stage_num);
		for(var i = 1; i <= stage_num; i++) {
			var sname_ele = $("#fb-mti-university-sname-" + i), stime_ele = $("#fb-mti-university-stime-" + i);
			var sname = $.trim(sname_ele.val()), stime = $.trim(stime_ele.val());
			if(sname == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(sname_ele, "Please input a stage name");
				is_validate = false;
			}
			if(stime == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(stime_ele, "Please input a stage time");
				is_validate = false;
			} else if(isNaN(stime)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(stime_ele, "Please input an integer");
				is_validate = false;
			} else if(parseInt(stime) != parseFloat(stime)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(stime_ele, "Please input an integer, not a float");
				is_validate = false;
			}
			if(is_validate) {
				stages.push({step: i, name: sname, time: stime});
			}
			
		}
		// 若通过检测 则提交并保存
		if(is_validate) {
			IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Saving ...<h1>");
			var task_id = $("#fb-paper-modal-label").data("taskId");
			$.ajax({
				url: "applyUniversityTaskAction!update.action",
				data: {
					id: task_id,
					name: task_name,
					startTime: start_time,
					endTime: end_time,
					totalDay: total_day,
					isActive: is_active,
					universityName: university_name,
					stages: JSON.stringify(stages),
					deadline: deadline,
					material: material
				},
				type: "post",
				success: function(json_data) {
					var data = $.parseJSON(json_data);
					// console.log(data);
					IHL_BlockMsgObj.unblockMsg(function() { 
                        if(data.statusCode == "200") {
							$.growlUI('Success', data.info);
							var vs_iframe_ele = $("#vs-iframe"), vs_fb_div_ele = vs_iframe_ele.contents().find("#vs-fb-div");
							if(vs_fb_div_ele) {
								vs_fb_div_ele.html(vs_iframe_ele[0].contentWindow.NonQuantStageInfo_Module.obtainStageHtml(task_id, "21").join(""));
							}
						} else {
							$.growlUI('Error', data.info);
						}
                    });

				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					IHL_BlockMsgObj.unblockMsg(function() { 
                        $.growlUI('Error', textStatus + " " + errorThrown);
                    });
				}
			});
		}
			
	},
	saveModifiedTi: function(task_type, stage_num) {
		var this_ptr = this;
		if(task_type == "10") {	// Read Book
				
				
		} else if(task_type == "11") {	// Open Class
			
			
		} else if(task_type == "12") {	// 健身
			
			
		} else if(task_type == "20") {	// 写论文
			this_ptr.savePaperMti(stage_num);
		} else if(task_type == "21") {	// 申请大学
			this_ptr.saveUniversityMti(stage_num);
		}
	}
};