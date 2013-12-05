(function($) {
	$(function() {
		// show error tip for controls
		function showErrorTip(element, msg) {
			element.parents(".control-group").addClass("error").find(".help-inline").text(msg);
		}
		// function to compute date range days
        function computeDateRangeDays(sDate1, sDate2) {	//sDate1和sDate2是2002-12-18格式 
        	var aDate, oDate1, oDate2, iDays  
	        aDate = sDate1.split("-")  
	        oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])  //转换为12-18-2002格式 
	        aDate = sDate2.split("-") 
	        oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) 
	        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24)  //把相差的毫秒数转换为天数 
	        return iDays 
        }
        // reset open class task form function
        function resetOpenClassTaskForm() {
        	$("#open-class-task-form input[type=text], #open-class-task-form textarea").val("").trigger("change");
        }
		$(document).on("click", "#add-oc-task-btn", function() {
			var task_name_element = $("#open-class-task-name"), start_time_element = $("#open-class-start-time"),
				end_time_element = $("#open-class-end-time"), total_day_element = $("#open-class-total-day"),
				class_name_element = $("#open-class-name"), amount_element = $("#open-class-amount"),
				time_4_each_class_element = $("#open-class-time-4-each-class"),
				remark_element = $("#open-class-remark"), is_active_element = $("#open-class-is-active");
			var task_name = $.trim(task_name_element.val()), start_time = $.trim(start_time_element.val()),
				end_time = $.trim(end_time_element.val()), total_day = $.trim(total_day_element.val()),
				class_name = $.trim(class_name_element.val()), amount = $.trim(amount_element.val()),
				time_4_each_class = $.trim(time_4_each_class_element.val()), remark = $.trim(remark_element.val()),
				is_active = is_active_element.parent().hasClass("switch-on") == true ? "1" : "0";
			/*console.log("task_name: " + task_name + "; start_time: " + start_time + "; end_time: " + end_time);
			console.log("total_day: " + total_day + "; class_name: " + class_name + "; amount: " + amount);
			console.log("time_4_each_class: " + time_4_each_class + "; remark: " + remark + "; is_active: " + is_active);*/
			var is_validate = true;
			if(task_name == "") {
				showErrorTip(task_name_element, "Please input a task name");
				is_validate = false;
			}
			if(start_time == "" && end_time == "") {
				showErrorTip(start_time_element, "Please input a start date and an end date");
				is_validate = false;
			} else if(start_time == "") {
				showErrorTip(start_time_element, "Please input a start date");
				is_validate = false;
			} else if(end_time == "") {
				showErrorTip(end_time_element, "Please input an end date");
				is_validate = false;
			}
			if(start_time == "" || end_time == "") {
				showErrorTip(total_day_element, "Please input Date Range first");
				is_validate = false;
			} else if(total_day == "") {
				showErrorTip(total_day_element, "Please input days you plan to spend on this task");
				is_validate = false;
			} else if(isNaN(total_day)) {
				showErrorTip(total_day_element, "Please input an integer");
				is_validate = false;
			} else if(parseInt(total_day) != parseFloat(total_day)) {
				showErrorTip(total_day_element, "Please input an integer, not a float");
				is_validate = false;
			} else {
				total_day = parseInt(total_day);
				total_day_element.val(total_day).trigger("change");
				var date_range_days = computeDateRangeDays(start_time, end_time);
				if(total_day < 1) {
					showErrorTip(total_day_element, "You must cost at least 1 day on this task");
					is_validate = false;
				} else if(total_day > date_range_days) {
					showErrorTip(total_day_element, "You must cost no more than " + date_range_days + " days (on date range)");
					is_validate = false;
				}
			}
			if(class_name == "") {
				showErrorTip(class_name_element, "Please input a class name");
				is_validate = false;
			}
			if(amount == "") {
				showErrorTip(amount_element, "Please input an amount");
				is_validate = false;
			} else if(isNaN(amount)) {
				showErrorTip(amount_element, "Please input an integer");
				is_validate = false;
			} else if(parseInt(amount) != parseFloat(amount)) {
				showErrorTip(amount_element, "Please input an integer, not a float");
				is_validate = false;
			}
			if(time_4_each_class == "") {
				showErrorTip(time_4_each_class_element, "Please input a time for each class in minutes");
				is_validate = false;
			} else if(isNaN(time_4_each_class)) {
				showErrorTip(time_4_each_class_element, "Please input an integer");
				is_validate = false;
			} else if(parseInt(time_4_each_class) != parseFloat(time_4_each_class)) {
				showErrorTip(time_4_each_class_element, "Please input an integer, not a float");
				is_validate = false;
			}
			
			if(is_validate) {
				IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Adding task ...<h1>");
				$.ajax({
					url: "openClassTaskAction!create.action",
					data: {
						name: task_name,
						startTime: start_time,
						endTime: end_time,
						totalDay: total_day,
						type: "11",
						isActive: is_active,
						className: class_name,
						amount: amount,
						timeForPerClass: time_4_each_class,
						remark: remark
					},
					type: 'post',
					success: function(json_data) {
						var data = $.parseJSON(json_data);
						// console.log(data);
						IHL_BlockMsgObj.unblockMsg(function() { 
                            if(data.statusCode == "200") {
								$.growlUI('Success', data.info);
								resetOpenClassTaskForm();
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
			
		}).on("click", "#reset-oc-task-btn", function() {
			resetOpenClassTaskForm();
		});
	});
})(jQuery);