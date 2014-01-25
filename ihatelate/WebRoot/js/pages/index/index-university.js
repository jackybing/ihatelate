(function($) {
	$(function() {
        function resetUniversityTaskForm(item, type) {
        	var common_prefix = "#" + item + "-" + type + "-task-form input";
        	$(common_prefix + "[type=text]").not("[id*=-sname-]").val("").trigger("change");
        	$(common_prefix + "[id*=-sname-]").trigger("change");
        }
        
		// 通过事件委托绑定事件
		$(document).on("click", ".reset-non-quant-u-task-btn", function() {
			var this_btn = $(this);
			resetUniversityTaskForm(this_btn.data("item"), this_btn.data("type"));
		}).on("click", ".add-non-quant-u-task-btn", function() {
			var this_btn = $(this), item = this_btn.data("item"), type = this_btn.data("type");
			// 先获取所有输入控件
			var task_name_element = $("#" + item + "-task-name-" + type), 
				start_time_element = $("#" + item + "-start-time-" + type),
				end_time_element = $("#" + item + "-end-time-" + type),
				total_day_element = $("#" + item + "-total-day-" + type),
				university_name_element = $("#" + item + "-name-" + type),
				deadline_element = $("#" + item + "-deadline-" + type),
				material_element = $("#" + item + "-material-" + type),
				is_active_element = $("#" + item + "-is-active-" + type);
			// 再获取所有输入控件的值（去掉前后空格）
			var task_name = $.trim(task_name_element.val()), start_time = $.trim(start_time_element.val()),
				end_time = $.trim(end_time_element.val()), total_day = $.trim(total_day_element.val()),
				university_name = $.trim(university_name_element.val()),
				deadline = $.trim(deadline_element.val()), material = $.trim(material_element.val()),
				is_active = is_active_element.parent().hasClass("switch-on") ? "1" : "0";
			// 对输入控件的值进行检测，如果不对，显示error tip
			var is_validate = true;
			if(task_name == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(task_name_element, "Please input a task name");
				is_validate = false;
			}
			if(start_time == "" && end_time == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(start_time_element, "Please input a start date and an end date");
				is_validate = false;
			} else if(start_time == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(start_time_element, "Please input a start date");
				is_validate = false;
			} else if(end_time == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(end_time_element, "Please input an end date");
				is_validate = false;
			}
			if(start_time == "" || end_time == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_element, "Please input Date Range first");
				is_validate = false;
			} else if(total_day == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_element, "Please input days you plan to spend on this task");
				is_validate = false;
			} else if(isNaN(total_day)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_element, "Please input an integer");
				is_validate = false;
			} else if(parseInt(total_day) != parseFloat(total_day)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_element, "Please input an integer, not a float");
				is_validate = false;
			} else {
				total_day = parseInt(total_day);
				total_day_element.val(total_day).trigger("change");
				var date_range_days = IHL_TaskFormOprtObj.computeDateRangeDays(start_time, end_time);
				if(total_day < 1) {
					IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_element, "You must cost at least 1 day on this task");
					is_validate = false;
				} else if(total_day > date_range_days) {
					IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_element, "You must cost no more than " + date_range_days + " days (on date range)");
					is_validate = false;
				}
			}
			if(university_name == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(university_name_element, "Please input an university name");
				is_validate = false;
			}
			if(deadline == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(deadline_element, "Please input a deadline");
				is_validate = false;
			}
			if(material == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(material_element, "Please input material");
				is_validate = false;
			}
			// 获取stages的container，以获得step的总数
			var stages_container = $("#" + item + "-stages-" + type), total_step_num = parseInt(stages_container.data("totalStageNum"));
			// 先check所有的stages是不是有name，time是不是为整数
			var cur_sname_prefix = "#" + item + "-sname-" + type + "-",
				cur_stime_prefix = "#" + item + "-stime-" + type + "-";
			var stages = [];
			
			var task_id = stages_container.data("taskId"),
				orig_check_stages = default_university_template.check_stages;
			
			for(var i = 1; i <= total_step_num; i++) {
				var cur_sname_element = $(cur_sname_prefix + i),
					cur_stime_element = $(cur_stime_prefix + i);
				var cur_sname = cur_sname_element.val(), cur_stime = cur_stime_element.val();
				// console.log("cur_sname[" + i + "]: " + cur_sname + "; cur_stime[" + i + "]: " + cur_stime);
				if(cur_sname == "") {
					IHL_ErrorTipObj.showErrTipAndScroll2Ele(cur_sname_element, "Please input a stage name");
					is_validate = false;
				}
				if(cur_stime == "") {
					IHL_ErrorTipObj.showErrTipAndScroll2Ele(cur_stime_element, "Please input a stage time");
					is_validate = false;
				} else if(isNaN(cur_stime)) {
					IHL_ErrorTipObj.showErrTipAndScroll2Ele(cur_stime_element, "Please input an integer");
					is_validate = false;
				} else if(parseInt(cur_stime) != parseFloat(cur_stime)) {
					IHL_ErrorTipObj.showErrTipAndScroll2Ele(cur_stime_element, "Please input an integer, not a float");
					is_validate = false;
				}
				// 向stages里面push stage
				if(is_validate) {
					stages.push({step: i, name: cur_sname, time: cur_stime});
				}
				// 检查模板是否dirty
				if(task_id != -1 && orig_check_stages[i - 1] != cur_sname) {
					task_id = -1;
					stages_container.data("taskId", task_id);
				}
			}
			
			// 通过检测，则ajax提交结果，提交成功后触发reset事件
			if(is_validate) {
				IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Adding task ...<h1>");
				$.ajax({
					url: "applyUniversityTaskAction!create.action",
					data: {
						name: task_name,
						startTime: start_time,
						endTime: end_time,
						totalDay: total_day,
						type: "21",
						isActive: is_active,
						universityName: university_name,
						deadline: deadline,
						material: material,
						taskID: stages_container.data("taskId"),
						stages: JSON.stringify(stages)
					},
					type: "post",
					success: function(json_data) {
						var data = $.parseJSON(json_data);
						IHL_BlockMsgObj.unblockMsg(function() { 
                            if(data.statusCode == "200") {
								$.growlUI('Success', data.info);
								resetUniversityTaskForm(item, type);
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
			
		});
		
	});
})(jQuery);