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
	judgeIsCompleted: function(is_completed, target_form_div) {
		if(is_completed) {
			target_form_div.find(".not-readonly").attr("readonly", "readonly");
			target_form_div.find(".has-switch").bootstrapSwitch('setActive', false);
			target_form_div.find(".dp-changeable").addClass("dp-unchangeable").removeClass("dp-changeable");
			$("#save-fbmti-btn").addClass("disabled");
		} else {
			target_form_div.find(".not-readonly").removeAttr("readonly");
			target_form_div.find(".has-switch").bootstrapSwitch('setActive', true);
			target_form_div.find(".dp-unchangeable").addClass("dp-changeable").removeClass("dp-unchangeable");
			$("#save-fbmti-btn").removeClass("disabled");
		}
	},
	fillTaskInfoModal: function(task_info) {
		$(".fb-mti-form").hide();
		var this_ptr = this;
		console.log("taskInfo: ");
		console.log(task_info);
		var cur_task_type = task_info.type;
		$("#save-fbmti-btn").data("taskType", cur_task_type);
		var target_form_div;
		if(cur_task_type == "10") {	// Read Book
			var read_book_form_div = $("#fb-mti-form-read").show();
			read_book_form_div.find("#fb-mti-book-task-name").val(task_info.name);
			read_book_form_div.find("#fb-mti-book-start-time").val(task_info.startTime.substring(0, 10));
			read_book_form_div.find("#fb-mti-book-end-time").val(task_info.endTime.substring(0, 10));
			read_book_form_div.find("#fb-mti-book-total-day").val(task_info.totalDay);
			read_book_form_div.find("#fb-mti-book-title").val(task_info.title);
			read_book_form_div.find("#fb-mti-book-isbn").val(task_info.ISBN);
			read_book_form_div.find("#fb-mti-book-page-num").val(task_info.pageNum);
			read_book_form_div.find("#fb-mti-book-efficiency").val(task_info.efficiency);
			this_ptr.setSwitch(read_book_form_div.find("#fb-mti-book-is-active"), task_info.isActive);
			target_form_div = read_book_form_div;
		} else if(cur_task_type == "11") {	// Open Class
			var class_form_div = $("#fb-mti-form-class").show();
			class_form_div.find("#fb-mti-class-task-name").val(task_info.name);
			class_form_div.find("#fb-mti-class-start-time").val(task_info.startTime.substring(0, 10));
			class_form_div.find("#fb-mti-class-end-time").val(task_info.endTime.substring(0, 10));
			class_form_div.find("#fb-mti-class-total-day").val(task_info.totalDay);
			class_form_div.find("#fb-mti-class-name").val(task_info.className);
			class_form_div.find("#fb-mti-class-amount").val(task_info.amount);
			class_form_div.find("#fb-mti-class-each-time").val(task_info.timeForPerClass);
			class_form_div.find("#fb-mti-class-remark").val(task_info.remark);
			this_ptr.setSwitch(class_form_div.find("#fb-mti-class-is-active"), task_info.isActive);
			target_form_div = class_form_div;
		} else if(cur_task_type == "12") {	// 健身
			var exercise_form_div = $("#fb-mti-form-exercise").show();
			exercise_form_div.find("#fb-mti-exercise-task-name").val(task_info.name);
			exercise_form_div.find("#fb-mti-exercise-start-time").val(task_info.startTime.substring(0, 10));
			exercise_form_div.find("#fb-mti-exercise-end-time").val(task_info.endTime.substring(0, 10));
			exercise_form_div.find("#fb-mti-exercise-total-day").val(task_info.totalDay);
			exercise_form_div.find("#fb-mti-exercise-name").val(task_info.exerciseName);
			exercise_form_div.find("#fb-mti-exercise-group-count").val(task_info.groupCount);
			exercise_form_div.find("#fb-mti-exercise-group-time").val(task_info.timePerGroup);
			this_ptr.setSwitch(exercise_form_div.find("#fb-mti-exercise-is-active"), task_info.isActive);
			target_form_div = exercise_form_div;
			
		} else if(cur_task_type == "20") {	// 写论文
			var paper_form_div = $("#fb-mti-form-paper").show();
			paper_form_div.find("#fb-mti-paper-task-name").val(task_info.name);
			paper_form_div.find("#fb-mti-paper-start-time").val(task_info.startTime.substring(0, 10));
			paper_form_div.find("#fb-mti-paper-end-time").val(task_info.endTime.substring(0, 10));
			paper_form_div.find("#fb-mti-paper-total-day").val(task_info.totalDay);
			paper_form_div.find("#fb-mti-paper-name").val(task_info.paperName);
			this_ptr.setSwitch(paper_form_div.find("#fb-mti-paper-is-active"), task_info.isActive);
			this_ptr.fillStages(paper_form_div.find("#fb-mti-paper-stages"), task_info.stages, task_info.id, task_info.type);
			target_form_div = paper_form_div;
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
			target_form_div = univer_form_div;
		}
		this_ptr.judgeIsCompleted(task_info.isCompleted, target_form_div);
		
	},
	showTaskInfoModal: function(task_id) {
		// console.log("Data task_id on showTaskInfoModal: " + task_id);
		$("#fb-paper-modal-label").data("taskId", task_id);
		var this_ptr = this;
		$.ajax({
			url: "taskAction!obtainTaskByTaskID.action",
			data: {
				id: task_id
			},
			beforeSend: function() {
				IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Loading ...<h1>");
			},
			success: function(response_data) {
				IHL_BlockMsgObj.unblockMsg(function() {
					if(response_data == "{timeout:true}") {
						window.parent.location.reload();
					} else {
						response_data = $.parseJSON(response_data);
						// console.log("response_data: ");
						// console.log(response_data);
						if(response_data.statusCode == "200") {
							var task_info = response_data.taskInfo;
							this_ptr.fillTaskInfoModal(task_info);
							
						} else {
							console.log(response_data);
							alert("Server is crashed when obtaining task information");
						}
						
						$("#fb-modify-task-info").modal("show");
					}
	                    
                });
					
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
			is_active = is_active_ele.parent().hasClass("switch-on") ? "1" : "0";
		// 对输入控件的值进行检测，如果不对，显示error tip
		var is_validate = true;
		if(task_name == "") {
			IHL_ErrorTipObj.showErrTip(task_name_ele, "Please input a task name");
			is_validate = false;
		}
		if(start_time == "" && end_time == "") {
			IHL_ErrorTipObj.showErrTip(start_time_ele, "Please input a start date and an end date");
			is_validate = false;
		} else if(start_time == "") {
			IHL_ErrorTipObj.showErrTip(start_time_ele, "Please input a start date");
			is_validate = false;
		} else if(end_time == "") {
			IHL_ErrorTipObj.showErrTip(end_time_ele, "Please input an end date");
			is_validate = false;
		}
		if(start_time == "" || end_time == "") {
			IHL_ErrorTipObj.showErrTip(total_day_ele, "Please input Date Range first");
			is_validate = false;
		} else if(total_day == "") {
			IHL_ErrorTipObj.showErrTip(total_day_ele, "Please input days you plan to spend on this task");
			is_validate = false;
		} else if(isNaN(total_day)) {
			IHL_ErrorTipObj.showErrTip(total_day_ele, "Please input an integer");
			is_validate = false;
		} else if(parseInt(total_day) != parseFloat(total_day)) {
			IHL_ErrorTipObj.showErrTip(total_day_ele, "Please input an integer, not a float");
			is_validate = false;
		} else {
			total_day = parseInt(total_day);
			total_day_ele.val(total_day).trigger("change");
			var date_range_days = IHL_TaskFormOprtObj.computeDateRangeDays(start_time, end_time);
			if(total_day < 1) {
				IHL_ErrorTipObj.showErrTip(total_day_ele, "You must cost at least 1 day on this task");
				is_validate = false;
			} else if(total_day > date_range_days) {
				IHL_ErrorTipObj.showErrTip(total_day_ele, "You must cost no more than " + date_range_days + " days (on date range)");
				is_validate = false;
			}
		}
		if(paper_name == "") {
			IHL_ErrorTipObj.showErrTip(paper_name_ele, "Please input a paper name");
			is_validate = false;
		}
		// 检测stages数据
		var stages = [], stage_num = parseInt(stage_num);
		for(var i = 1; i <= stage_num; i++) {
			var sname_ele = $("#fb-mti-paper-sname-" + i), stime_ele = $("#fb-mti-paper-stime-" + i);
			var sname = $.trim(sname_ele.val()), stime = $.trim(stime_ele.val());
			if(sname == "") {
				IHL_ErrorTipObj.showErrTip(sname_ele, "Please input a stage name");
				is_validate = false;
			}
			if(stime == "") {
				IHL_ErrorTipObj.showErrTip(stime_ele, "Please input a stage time");
				is_validate = false;
			} else if(isNaN(stime)) {
				IHL_ErrorTipObj.showErrTip(stime_ele, "Please input an integer");
				is_validate = false;
			} else if(parseInt(stime) != parseFloat(stime)) {
				IHL_ErrorTipObj.showErrTip(stime_ele, "Please input an integer, not a float");
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
				async: false,
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
			is_active = is_active_ele.parent().hasClass("switch-on") ? "1" : "0";
		// 对输入控件的值进行检测，如果不对，显示error tip
		var is_validate = true;
		if(task_name == "") {
			IHL_ErrorTipObj.showErrTip(task_name_ele, "Please input a task name");
			is_validate = false;
		}
		if(start_time == "" && end_time == "") {
			IHL_ErrorTipObj.showErrTip(start_time_ele, "Please input a start date and an end date");
			is_validate = false;
		} else if(start_time == "") {
			IHL_ErrorTipObj.showErrTip(start_time_ele, "Please input a start date");
			is_validate = false;
		} else if(end_time == "") {
			IHL_ErrorTipObj.showErrTip(end_time_ele, "Please input an end date");
			is_validate = false;
		}
		if(start_time == "" || end_time == "") {
			IHL_ErrorTipObj.showErrTip(total_day_ele, "Please input Date Range first");
			is_validate = false;
		} else if(total_day == "") {
			IHL_ErrorTipObj.showErrTip(total_day_ele, "Please input days you plan to spend on this task");
			is_validate = false;
		} else if(isNaN(total_day)) {
			IHL_ErrorTipObj.showErrTip(total_day_ele, "Please input an integer");
			is_validate = false;
		} else if(parseInt(total_day) != parseFloat(total_day)) {
			IHL_ErrorTipObj.showErrTip(total_day_ele, "Please input an integer, not a float");
			is_validate = false;
		} else {
			total_day = parseInt(total_day);
			total_day_ele.val(total_day).trigger("change");
			var date_range_days = IHL_TaskFormOprtObj.computeDateRangeDays(start_time, end_time);
			if(total_day < 1) {
				IHL_ErrorTipObj.showErrTip(total_day_ele, "You must cost at least 1 day on this task");
				is_validate = false;
			} else if(total_day > date_range_days) {
				IHL_ErrorTipObj.showErrTip(total_day_ele, "You must cost no more than " + date_range_days + " days (on date range)");
				is_validate = false;
			}
		}
		if(university_name == "") {
			IHL_ErrorTipObj.showErrTip(university_name_ele, "Please input an university name");
			is_validate = false;
		}
		if(deadline == "") {
			IHL_ErrorTipObj.showErrTip(deadline_ele, "Please input a deadline");
			is_validate = false;
		}
		if(material == "") {
			IHL_ErrorTipObj.showErrTip(material_ele, "Please input material");
			is_validate = false;
		}
		// 检测stages数据
		var stages = [], stage_num = parseInt(stage_num);
		for(var i = 1; i <= stage_num; i++) {
			var sname_ele = $("#fb-mti-university-sname-" + i), stime_ele = $("#fb-mti-university-stime-" + i);
			var sname = $.trim(sname_ele.val()), stime = $.trim(stime_ele.val());
			if(sname == "") {
				IHL_ErrorTipObj.showErrTip(sname_ele, "Please input a stage name");
				is_validate = false;
			}
			if(stime == "") {
				IHL_ErrorTipObj.showErrTip(stime_ele, "Please input a stage time");
				is_validate = false;
			} else if(isNaN(stime)) {
				IHL_ErrorTipObj.showErrTip(stime_ele, "Please input an integer");
				is_validate = false;
			} else if(parseInt(stime) != parseFloat(stime)) {
				IHL_ErrorTipObj.showErrTip(stime_ele, "Please input an integer, not a float");
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
				async: false,
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
	saveReadBookMti: function() {
		// 获取控件
		var task_name_ele = $("#fb-mti-book-task-name"), start_time_ele = $("#fb-mti-book-start-time"),
			end_time_ele = $("#fb-mti-book-end-time"), total_day_ele = $("#fb-mti-book-total-day"),
			book_title_ele = $("#fb-mti-book-title"), isbn_ele = $("#fb-mti-book-isbn"),
			page_num_ele = $("#fb-mti-book-page-num"), efficiency_ele = $("#fb-mti-book-efficiency"),
			is_active_ele = $("#fb-mti-book-is-active");
		// 获取值
		var task_name = $.trim(task_name_ele.val()), start_time = $.trim(start_time_ele.val()),
			end_time = $.trim(end_time_ele.val()), total_day = $.trim(total_day_ele.val()),
			book_title = $.trim(book_title_ele.val()), isbn = $.trim(isbn_ele.val()),
			page_num = $.trim(page_num_ele.val()), efficiency = $.trim(efficiency_ele.val()),
			is_active = is_active_ele.parent().hasClass("switch-on") ? "1" : "0";
		// 检测输入值是否合法
		var is_validate = true;
		if(task_name == "") {
			IHL_ErrorTipObj.showErrTip(task_name_ele, "Please input a task name");
			is_validate = false;
		}
		if(start_time == "" && end_time == "") {
			IHL_ErrorTipObj.showErrTip(start_time_ele, "Please input a start date and an end date");
			is_validate = false;
		} else if(start_time == "") {
			IHL_ErrorTipObj.showErrTip(start_time_ele, "Please input a start date");
			is_validate = false;
		} else if(end_time == "") {
			IHL_ErrorTipObj.showErrTip(end_time_ele, "Please input an end date");
			is_validate = false;
		}
		if(start_time == "" || end_time == "") {
			IHL_ErrorTipObj.showErrTip(total_day_ele, "Please input Date Range first");
			is_validate = false;
		} else if(total_day == "") {
			IHL_ErrorTipObj.showErrTip(total_day_ele, "Please input days you plan to spend on this task");
			is_validate = false;
		} else if(isNaN(total_day)) {
			IHL_ErrorTipObj.showErrTip(total_day_ele, "Please input an integer");
			is_validate = false;
		} else if(parseInt(total_day) != parseFloat(total_day)) {
			IHL_ErrorTipObj.showErrTip(total_day_ele, "Please input an integer, not a float");
			is_validate = false;
		} else {
			total_day = parseInt(total_day);
			total_day_ele.val(total_day).trigger("change");
			var date_range_days = IHL_TaskFormOprtObj.computeDateRangeDays(start_time, end_time);
			if(total_day < 1) {
				IHL_ErrorTipObj.showErrTip(total_day_ele, "You must cost at least 1 day on this task");
				is_validate = false;
			} else if(total_day > date_range_days) {
				IHL_ErrorTipObj.showErrTip(total_day_ele, "You must cost no more than " + date_range_days + " days (on date range)");
				is_validate = false;
			}
		}
		if(book_title == "") {
			IHL_ErrorTipObj.showErrTip(book_title_ele, "Please input a book title");
			is_validate = false;
		}
		if(isbn == "" && page_num == "") {
			IHL_ErrorTipObj.showErrTip(isbn_ele, "Please input a book title and choose a book");
			IHL_ErrorTipObj.showErrTip(page_num_ele, "Please input a book title and choose a book");
			is_validate = false;
		}
		if(efficiency == "") {
			IHL_ErrorTipObj.showErrTip(efficiency_ele, "Please input your efficiency");
			is_validate = false;
		} else if(isNaN(efficiency)) {
			IHL_ErrorTipObj.showErrTip(efficiency_ele, "Please input an integer");
			is_validate = false;
		} else if(parseInt(efficiency) != parseFloat(efficiency)) {
			IHL_ErrorTipObj.showErrTip(efficiency_ele, "Please input an integer, not a float");
			is_validate = false;
		} else {
			efficiency = parseInt(efficiency);
			efficiency_ele.val(efficiency).trigger("change");
			if(efficiency < 1) {
				IHL_ErrorTipObj.showErrTip(efficiency_ele, "You must cost at least 1 minutes to finish 1 page");
				is_validate = false;
			}
		}
		// 若通过检测 则提交并保存
		if(is_validate) {
			IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Saving ...<h1>");
			var task_id = $("#fb-paper-modal-label").data("taskId");
			$.ajax({
				url: "bookTaskAction!update.action",
				data: {
					id: task_id,
					name: task_name,
					startTime: start_time,
					endTime: end_time,
					totalDay: total_day,
					isActive: is_active,
					title: book_title,
					ISBN: isbn,
					pageNum: page_num,
					efficiency: efficiency
				},
				type: "post",
				async: false,
				success: function(json_data) {
					var data = $.parseJSON(json_data);
					// console.log(data);
					IHL_BlockMsgObj.unblockMsg(function() { 
                        if(data.statusCode == "200") {
							$.growlUI('Success', data.info);
							/*var vs_iframe_ele = $("#vs-iframe"), vs_fb_div_ele = vs_iframe_ele.contents().find("#vs-fb-div");
							if(vs_fb_div_ele) {
								vs_fb_div_ele.html(vs_iframe_ele[0].contentWindow.NonQuantStageInfo_Module.obtainStageHtml(task_id, "21").join(""));
							}*/
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
			this_ptr.saveReadBookMti();
		} else if(task_type == "11") {	// Open Class
			
			
		} else if(task_type == "12") {	// 健身
			
			
		} else if(task_type == "20") {	// 写论文
			this_ptr.savePaperMti(stage_num);
		} else if(task_type == "21") {	// 申请大学
			this_ptr.saveUniversityMti(stage_num);
		}
		if($("#task-list-wrapper").is(":visible")) {
			// 刷新任务列表
			$("#display-task-list").click();
		}
	}
};