(function($) {
	$(function() {
        function resetPapersTaskForm(item, type) {
        	var common_prefix = "#" + item + "-" + type + "-task-form input";
        	$(common_prefix + "[type=text]").not("[id*=-sname-]").val("").trigger("change");
        	$(common_prefix + "[id*=-sname-]").trigger("change");
        }
        
		// 绑定事件
		$(document).on("click", ".reset-non-quant-task-btn", function() {
			var this_btn = $(this);
			resetPapersTaskForm(this_btn.data("item"), this_btn.data("type"));
		}).on("click", ".add-non-quant-task-btn", function() {
			var this_btn = $(this), item = this_btn.data("item"), type = this_btn.data("type");
			// 先获取所有输入控件
			var task_name_element = $("#" + item + "-task-name-" + type), 
				start_time_element = $("#" + item + "-start-time-" + type),
				end_time_element = $("#" + item + "-end-time-" + type),
				total_day_element = $("#" + item + "-total-day-" + type),
				paper_name_element = $("#" + item + "-paper-name-" + type),
				is_active_element = $("#" + item + "-is-active-" + type);
			// 再获取所有输入控件的值（去掉前后空格）
			var task_name = $.trim(task_name_element.val()), start_time = $.trim(start_time_element.val()),
				end_time = $.trim(end_time_element.val()), total_day = $.trim(total_day_element.val()),
				paper_name = $.trim(paper_name_element.val()),
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
			if(paper_name == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(paper_name_element, "Please input a paper name");
				is_validate = false;
			}
			// 获取stages的container，以获得step的总数
			var stages_container = $("#" + item + "-stages-" + type), total_step_num = parseInt(stages_container.data("totalStageNum"));
			// 先check所有的stages是不是有name，time是不是为整数
			var cur_sname_prefix = "#" + item + "-sname-" + type + "-",
				cur_stime_prefix = "#" + item + "-stime-" + type + "-";
			var stages = [];
			
			var task_id = stages_container.data("taskId"),
				orig_check_stages = default_papers_template.check_stages;
			
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
					url: "writePaperTaskAction!create.action",
					data: {
						name: task_name,
						startTime: start_time,
						endTime: end_time,
						totalDay: total_day,
						type: "20",
						isActive: is_active,
						paperName: paper_name,
						taskID: stages_container.data("taskId"),
						stages: JSON.stringify(stages)
					},
					type: "post",
					success: function(json_data) {
						var data = $.parseJSON(json_data);
						IHL_BlockMsgObj.unblockMsg(function() { 
                            if(data.statusCode == "200") {
								$.growlUI('Success', data.info);
								resetPapersTaskForm(item, type);
								PriorityDragSorter.confirmAjustPriority();
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
			
		}).on("click", ".add-new-stage-btn", function() {
			var this_element = $(this), wrapper_id = this_element.data("wrapperId"),
				item = this_element.data("item"), type = this_element.data("type"),
				target_id = "#" + item + "-stages-" + type;
			var target_element = $(target_id), total_stage_num = parseInt(target_element.data("totalStageNum")),
				wrapper_element = target_element.find(wrapper_id), step = wrapper_element.data("step");
			var add_stage_step = step + 1;
			
			var sname_prefix = "#" + item + "-sname-" + type + "-", stime_prefix = "#" + item + "-stime-" + type + "-";
			for(var i = total_stage_num; i >= add_stage_step; i--) {
				var stage_wrapper = $("#" + item + "-stage-wrapper-" + type + "-" +  i);
				var stage_name_element = stage_wrapper.find(sname_prefix + i),
					stage_time_element = stage_wrapper.find(stime_prefix + i);
				var stage_name = stage_name_element.val(),
					stage_time = stage_time_element.val(),
					tmp_stage_step = i + 1;
				var sname_tip = stage_name_element.next(".help-inline").text(),
					stime_tip = stage_time_element.next(".help-inline").text();
				stage_wrapper.html(formOneStageSubHtml(item, type, tmp_stage_step, stage_name, stage_time, sname_tip, stime_tip)).data("step", tmp_stage_step).attr("data-step", tmp_stage_step).attr("id", item + "-stage-wrapper-" + type + "-" + tmp_stage_step);
			}
			
			var new_stage_html = formOneStageHtml(item, type, add_stage_step, "", "", "hide");
			target_element.data("totalStageNum", total_stage_num + 1).data("taskId", -1);
			wrapper_element.after(new_stage_html);
			$("#" + item + "-stage-wrapper-" + type + "-" + add_stage_step).slideDown("slow");
			if(total_stage_num == 1) {
				target_element.find(".delete-stage-btn").removeClass("disabled").removeAttr("disabled");
			}
			
		}).on("click", ".delete-stage-btn", function() {
			var this_btn = $(this);
			if(!this_btn.hasClass("disabled")) {
				var	item = this_btn.data("item"), type = this_btn.data("type"),
					main_container_id = "#" + item + "-stages-" + type, wrapper_id = this_btn.data("wrapperId");
				var main_container_element = $(main_container_id), wrapper_element = main_container_element.find(wrapper_id), 
					total_stage_num = main_container_element.data("totalStageNum"), step = wrapper_element.data("step");
				
				var sname_prefix = "#" + item + "-sname-" + type + "-", stime_prefix = "#" + item + "-stime-" + type + "-",
					stage_wrapper_prefix = "#" + item + "-stage-wrapper-" + type + "-";
				for(var i = step + 1; i <= total_stage_num; i++) {
					var stage_wrapper = $(stage_wrapper_prefix +  i);
					var stage_name_element = stage_wrapper.find(sname_prefix + i),
						stage_time_element = stage_wrapper.find(stime_prefix + i);
					var stage_name = stage_name_element.val(),
						stage_time = stage_time_element.val(),
						stage_step = i - 1;
					var sname_tip = stage_name_element.next(".help-inline").text(),
						stime_tip = stage_time_element.next(".help-inline").text();
					stage_wrapper.html(formOneStageSubHtml(item, type, stage_step, stage_name, stage_time, sname_tip, stime_tip)).data("step", stage_step).attr("data-step", stage_step).attr("id", item + "-stage-wrapper-" + type + "-" + stage_step);
				}
				
				var new_total_stage_num = total_stage_num - 1;
				main_container_element.data("totalStageNum", new_total_stage_num).data("taskId", -1);
				wrapper_element.slideUp("slow", function() {
					$(this).remove();
				});
				
				if(new_total_stage_num == 1) {
					main_container_element.find(".delete-stage-btn").addClass("disabled").attr("disabled", "disabled");
				}
			}
				
		}).on("click", ".add-new-stage-beginning-btn", function() {
			var this_btn = $(this), item = this_btn.data("item"), type = this_btn.data("type");
			
			var stages_container_id = "#" + item + "-stages-" + type, wrappers_prefix = "#" + item + "-stage-wrapper-" + type + "-",
				wrappers_str_prefix = item + "-stage-wrapper-" + type + "-",
				stage_name_prefix = "#" + item + "-sname-" + type + "-", stage_time_prefix = "#" + item + "-stime-" + type + "-";
			var stages_container = $(stages_container_id), total_stage_num = parseInt(stages_container.data("totalStageNum"));
			// 先将已有的wrapper都+1
			for(var i = total_stage_num; i > 0; i--) {
				var stage_wrapper = $(wrappers_prefix +  i);
				var stage_name_element = stage_wrapper.find(stage_name_prefix + i),
					stage_time_element = stage_wrapper.find(stage_time_prefix + i);
				var stage_name = stage_name_element.val(),
					stage_time = stage_time_element.val(),
					tmp_stage_step = i + 1;
				var sname_tip = stage_name_element.next(".help-inline").text(),
					stime_tip = stage_time_element.next(".help-inline").text();
				stage_wrapper.html(formOneStageSubHtml(item, type, tmp_stage_step, stage_name, stage_time, sname_tip, stime_tip)).data("step", tmp_stage_step).attr("data-step", tmp_stage_step).attr("id", wrappers_str_prefix + tmp_stage_step);
			}
			// 再增加一个wrapper
			$(formOneStageHtml(item, type, 1, "", "", "hide")).prependTo(stages_container.data("totalStageNum", total_stage_num + 1)).data("taskId", -1).slideDown("slow");
			if(total_stage_num == 1) {
				stages_container.find(".delete-stage-btn").removeClass("disabled").removeAttr("disabled");
			}
		});
		
	});
})(jQuery);