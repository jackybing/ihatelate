(function($) {
	$(function() {
		// scroll to element
		var isInScrolling = false;
        function scrollToElement(targetEle) {
            if(!isInScrolling) {
                isInScrolling = true;
                var anh = targetEle.offset().top - 95;
                /*console.log(anh);*/
                $("html,body").stop().animate({scrollTop: anh}, 
                    { 
                        duration: 500, 
                        queue: false, 
                        complete: function() { 
                            isInScrolling = false;
                            // targetEle.focus().select();
                        } 
                    }
                );
            }
        }
		// 展示error tip的function
		function showErrorTip(element, msg) {
			scrollToElement(element);
			element.parents(".control-group").addClass("error").find(".help-inline").text(msg);
		}
		// function to clear error tips
		function clearMyErrorTip(myself) {
            var myControlGroupParent = myself.parents(".control-group");
            if(myControlGroupParent.hasClass("error")) {
                myControlGroupParent.removeClass("error").find(".help-inline").text("");
            }
        }
		// clear error tip for controls
		$("input").on("input", function() {
            clearMyErrorTip($(this));
        });
        $("input").on("change", function() {
            clearMyErrorTip($(this));
        });
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
        
		// 通过事件委托绑定事件
		$(document).on("click", ".add-non-quant-task-btn", function() {
			var this_btn = $(this), item = this_btn.data("item"), type = this_btn.data("type");
			console.log("item: " + item + "; type: " + type);
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
				is_active = is_active_element.parent().hasClass("switch-on") == true ? "1" : "0";;
			console.log("task_name: " + task_name + "; start_time: " + start_time + "; end_time: " + end_time);
			console.log("total_day: " + total_day + "; paper_name: " + paper_name + "; is_active: " + is_active);
			// 对输入控件的值进行检测，如果不对，显示error tip
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
			if(paper_name == "") {
				showErrorTip(paper_name_element, "Please input a paper name");
				is_validate = false;
			}
			// 获取stages的container，以获得step的总数
			var stages_container = $("#" + item + "-stages-" + type), total_step_num = stages_container.data("totalStageNum");
			console.log("total_step_num: " + total_step_num);
			// 先check所有的stages是不是有name，time是不是为整数
			
			// 通过检测，则ajax提交结果，提交成功后触发reset事件
			
			
		}).on("click", ".add-new-stage-btn", function() {
			var this_element = $(this), wrapper_id = this_element.data("wrapperId"),
				item = this_element.data("item"), type = this_element.data("type"),
				target_id = "#" + item + "-stages-" + type;
			// console.log("target_id: " + target_id + "; item: " + item + "; type: " + type);
			var target_element = $(target_id), total_stage_num = parseInt(target_element.data("totalStageNum")),
				wrapper_element = target_element.find(wrapper_id), step = wrapper_element.data("step");
			// console.log("total_stage_num: " + total_stage_num);
			// var stage_step = total_stage_num + 1;
			var add_stage_step = step + 1;
			// console.log("add_stage_step: " + add_stage_step);
			
			for(var i = total_stage_num; i >= add_stage_step; i--) {
				var stage_wrapper = $("#" + item + "-stage-wrapper-" + type + "-" +  i);
				var stage_name = stage_wrapper.find("#" + item + "-sname-" + type + "-" + i).val(),
					stage_time = stage_wrapper.find("#" + item + "-stime-" + type + "-" + i).val(),
					tmp_stage_step = i + 1;
				stage_wrapper.html(formOneStageSubHtml(item, type, tmp_stage_step, stage_name, stage_time)).data("step", tmp_stage_step).attr("data-step", tmp_stage_step).attr("id", item + "-stage-wrapper-" + type + "-" + tmp_stage_step);
			}
			
			var new_stage_html = formOneStageHtml(item, type, add_stage_step, "", "", "hide");
			target_element.data("totalStageNum", total_stage_num + 1);
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
				// console.log("main_container_id: " + main_container_id + "; wrapper_id: " + wrapper_id);
				var main_container_element = $(main_container_id), wrapper_element = main_container_element.find(wrapper_id), 
					total_stage_num = main_container_element.data("totalStageNum"), step = wrapper_element.data("step");
				// console.log("total_stage_num: " + total_stage_num + "; step: " + step);
				
				for(var i = step + 1; i <= total_stage_num; i++) {
					var stage_wrapper = $("#" + item + "-stage-wrapper-" + type + "-" +  i);
					var stage_name = stage_wrapper.find("#" + item + "-sname-" + type + "-" + i).val(),
						stage_time = stage_wrapper.find("#" + item + "-stime-" + type + "-" + i).val(),
						stage_step = i - 1;
					
					stage_wrapper.html(formOneStageSubHtml(item, type, stage_step, stage_name, stage_time)).data("step", stage_step).attr("data-step", stage_step).attr("id", item + "-stage-wrapper-" + type + "-" + stage_step);
				}
				
				var new_total_stage_num = total_stage_num - 1;
				// console.log("new_total_stage_num: " + new_total_stage_num);
				main_container_element.data("totalStageNum", new_total_stage_num);
				wrapper_element.slideUp("slow", function() {
					$(this).remove();
				});
				
				if(new_total_stage_num == 1) {
					main_container_element.find(".delete-stage-btn").addClass("disabled").removeAttr("disabled");
				}
			}
				
		}).on("click", ".add-new-stage-beginning-btn", function() {
			var this_btn = $(this), item = this_btn.data("item"), type = this_btn.data("type");
			// console.log("item: " + item + "; type: " + type);
			// papers-stage-wrapper-d-1
			var stages_container_id = "#" + item + "-stages-" + type, wrappers_prefix = "#" + item + "-stage-wrapper-" + type + "-",
				wrappers_str_prefix = item + "-stage-wrapper-" + type + "-",
				stage_name_prefix = "#" + item + "-sname-" + type + "-", stage_time_prefix = "#" + item + "-stime-" + type + "-";
			var stages_container = $(stages_container_id), total_stage_num = parseInt(stages_container.data("totalStageNum"));
			// console.log("total_stage_num: " + total_stage_num);
			// 先将已有的wrapper都+1
			for(var i = total_stage_num; i > 0; i--) {
				var stage_wrapper = $(wrappers_prefix +  i);
				var stage_name = stage_wrapper.find(stage_name_prefix + i).val(),
					stage_time = stage_wrapper.find(stage_time_prefix + i).val(),
					tmp_stage_step = i + 1;
				// console.log("tmp_stage_step: " + tmp_stage_step);
				stage_wrapper.html(formOneStageSubHtml(item, type, tmp_stage_step, stage_name, stage_time)).data("step", tmp_stage_step).attr("data-step", tmp_stage_step).attr("id", wrappers_str_prefix + tmp_stage_step);
			}
			// 再增加一个wrapper
			$(formOneStageHtml(item, type, 1, "", "", "hide")).prependTo(stages_container.data("totalStageNum", total_stage_num + 1)).slideDown("slow");
			if(total_stage_num == 1) {
				stages_container.find(".delete-stage-btn").removeClass("disabled").removeAttr("disabled");
			}
		});
		
	});
})(jQuery);