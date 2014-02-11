(function($) {
	$(function() {
		// reset exercise task form function
        function resetExerciseTaskForm() {
        	$("#exercise-task-form input[type=text]").not("[id*=-sname-]").val("").trigger("change");
        	$("#exercise-task-form input[id*=-sname-]").trigger("change");
        }
		$(document).on("click", "#add-exercise-task-btn", function() {
			var task_name_element = $("#exercise-task-name"), start_time_element = $("#exercise-start-time"),
				end_time_element = $("#exercise-end-time"), total_day_element = $("#exercise-total-day"),
				exercise_name_element = $("#exercise-name"), group_count_element = $("#exercise-group-count"),
				time_4_each_group_element = $("#exercise-time-4-each-group"), is_active_element = $("#exercise-is-active");
			var task_name = $.trim(task_name_element.val()), start_time = $.trim(start_time_element.val()),
				end_time = $.trim(end_time_element.val()), total_day = $.trim(total_day_element.val()),
				exercise_name = $.trim(exercise_name_element.val()), group_count = $.trim(group_count_element.val()),
				time_4_each_group = $.trim(time_4_each_group_element.val()),
				is_active = is_active_element.parent().hasClass("switch-on") ? "1" : "0";
			/*console.log("task_name: " + task_name + "; start_time: " + start_time + "; end_time: " + end_time);
			console.log("total_day: " + total_day + "; exercise_name: " + exercise_name + "; group_count: " + group_count);
			console.log("time_4_each_group: " + time_4_each_group + "; is_active: " + is_active);*/
			
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
			if(exercise_name == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(exercise_name_element, "Please input an exercise name");
				is_validate = false;
			}
			if(group_count == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(group_count_element, "Please input an group count");
				is_validate = false;
			} else if(isNaN(group_count)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(group_count_element, "Please input an integer");
				is_validate = false;
			} else if(parseInt(group_count) != parseFloat(group_count)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(group_count_element, "Please input an integer, not a float");
				is_validate = false;
			}
			if(time_4_each_group == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(time_4_each_group_element, "Please input a time for each group in minutes");
				is_validate = false;
			} else if(isNaN(time_4_each_group)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(time_4_each_group_element, "Please input an integer");
				is_validate = false;
			} else if(parseInt(time_4_each_group) != parseFloat(time_4_each_group)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(time_4_each_group_element, "Please input an integer, not a float");
				is_validate = false;
			}
			
			if(is_validate) {
				IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Adding task ...<h1>");
				$.ajax({
					url: "exerciseTaskAction!create.action",
					data: {
						name: task_name,
						startTime: start_time,
						endTime: end_time,
						totalDay: total_day,
						type: "12",
						isActive: is_active,
						exerciseName: exercise_name,
						groupCount: group_count,
						timePerGroup: time_4_each_group
					},
					type: 'post',
					success: function(json_data) {
						if(json_data == "{timeout:true}") {
							window.parent.location.reload();
						} else {
							var data = $.parseJSON(json_data);
							IHL_BlockMsgObj.unblockMsg(function() { 
	                            if(data.statusCode == "200") {
									$.growlUI('Success', data.info);
									resetExerciseTaskForm();
									PriorityDragSorter.confirmAjustPriority();
								} else {
									$.growlUI('Error', data.info);
								}
	                        });
						}

					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						IHL_BlockMsgObj.unblockMsg(function() { 
                            $.growlUI('Error', textStatus + " " + errorThrown);
                        });
					}
				});

			}
			
		}).on("click", "#reset-exercise-task-btn", function() {
			resetExerciseTaskForm();
		});
	});
})(jQuery);