(function($) {
	$(function() {
		// function to clear error tips
		function clearMyErrorTip(myself) {
            var myControlGroupParent = myself.parents(".control-group");
            if(myControlGroupParent.hasClass("error")) {
                myControlGroupParent.removeClass("error").find(".help-inline").text("");
            }
        }
		// clear error tip for controls
		$("input").live("input", function() {
            clearMyErrorTip($(this));
        });
		// Start: 下面是绑定的反馈按钮点击事件
		$("#fb-book-btn").live("click", function() {
			var task_id = $(this).attr("data-id");
			var fb_book_page_num_element = $("#fb-book-page-num");
			var fb_book_page_num = fb_book_page_num_element.val();
			// 对输入控件的值进行检测，如果不对，显示error tip
			var is_validate = true;
			if(fb_book_page_num == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_book_page_num_element, "Please input a page number");
				is_validate = false;
			} else if(isNaN(fb_book_page_num)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_book_page_num_element, "Please input an integer");
				is_validate = false;
			} else if(parseInt(fb_book_page_num) != parseFloat(fb_book_page_num)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_book_page_num_element, "Please input an integer, not a float");
				is_validate = false;
			}
			// 通过检测，则ajax提交结果，提交成功后触发reset事件
			if(is_validate) {
				IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Submiting feedback ...<h1>");
				$.ajax({
					url: "bookTaskAction!feedback.action",
					data: {
						id: task_id,
						completedPageNum: parseInt(fb_book_page_num)
					},
					success: function(response_data) {
						response_data = JSON.parse(JSON.parse(response_data));
						IHL_BlockMsgObj.unblockMsg(function() { 
                            if(response_data.statusCode == "200") {
								$('#calendar').weekCalendar("refresh");
		    					$("#detail-info-dialog").dialog("close");
		    					IHL_BlockMsgObj.showGrowlMsg("Feedback completed", response_data.info);
							} else {
								var fb_info = response_data.info;
								IHL_BlockMsgObj.showGrowlMsg("Feedback completed", fb_info);
								IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_book_page_num_element, fb_info);
							}
                        });
						
					}
				});
			}
			
		});
		
		$("#fb-class-btn").live("click", function() {
			var task_id = $(this).attr("data-id");
			var fb_class_time_element = $("#fb-class-time");
			var fb_class_time = fb_class_time_element.val();
			// 对输入控件的值进行检测，如果不对，显示error tip
			var is_validate = true;
			if(fb_class_time == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_class_time_element, "Please input a class time");
				is_validate = false;
			} else if(isNaN(fb_class_time)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_class_time_element, "Please input an integer");
				is_validate = false;
			} else if(parseInt(fb_class_time) != parseFloat(fb_class_time)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_class_time_element, "Please input an integer, not a float");
				is_validate = false;
			}
			// 通过检测，则ajax提交结果，提交成功后触发reset事件
			if(is_validate) {
				IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Submiting feedback ...<h1>");
				$.ajax({
					url: "openClassTaskAction!feedback.action",
					data: {
						id: task_id,
						classTime: parseInt(fb_class_time)
					},
					success: function(response_data) {
						response_data = JSON.parse(JSON.parse(response_data));
						IHL_BlockMsgObj.unblockMsg(function() { 
                            if(response_data.statusCode == "200") {
								$('#calendar').weekCalendar("refresh");
		    					$("#detail-info-dialog").dialog("close");
		    					IHL_BlockMsgObj.showGrowlMsg("Feedback completed", response_data.info);
							} else {
								var fb_info = response_data.info;
								IHL_BlockMsgObj.showGrowlMsg("Feedback completed", fb_info);
								IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_class_time_element, fb_info);
							}
                        });
						
					}
				});
			}
			
		});
		
		$("#fb-exercise-btn").live("click", function() {
			var task_id = $(this).attr("data-id");
			var fb_group_count_element = $("#fb-exercise-group");
			var fb_group_count = fb_group_count_element.val();
			// 对输入控件的值进行检测，如果不对，显示error tip
			var is_validate = true;
			if(fb_group_count == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_group_count_element, "Please input a group count");
				is_validate = false;
			} else if(isNaN(fb_group_count)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_group_count_element, "Please input an integer");
				is_validate = false;
			} else if(parseInt(fb_group_count) != parseFloat(fb_group_count)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_group_count_element, "Please input an integer, not a float");
				is_validate = false;
			}
			// 通过检测，则ajax提交结果，提交成功后触发reset事件
			if(is_validate) {
				IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Submiting feedback ...<h1>");
				$.ajax({
					url: "exerciseTaskAction!feedback.action",
					data: {
						id: task_id,
						completedGroupCount: parseInt(fb_group_count)
					},
					success: function(response_data) {
						response_data = JSON.parse(JSON.parse(response_data));
						IHL_BlockMsgObj.unblockMsg(function() { 
                            if(response_data.statusCode == "200") {
								$('#calendar').weekCalendar("refresh");
		    					$("#detail-info-dialog").dialog("close");
		    					IHL_BlockMsgObj.showGrowlMsg("Feedback completed", response_data.info);
							} else {
								var fb_info = response_data.info;
								IHL_BlockMsgObj.showGrowlMsg("Feedback completed", fb_info);
								IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_group_count_element, fb_info);
							}
                        });
						
					}
				});
			}
			
		});
		
		$("#fb-paper-btn").live("click", function() {
			var task_id = $(this).attr("data-id"), task_type = $(this).attr("data-task-type");
			var fb_paper_time_element = $("#fb-paper-time");
			var fb_paper_time = fb_paper_time_element.val();
			// console.log("task_type: " + task_type);
			// 对输入控件的值进行检测，如果不对，显示error tip
			var is_validate = true;
			if(fb_paper_time == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_paper_time_element, "Please input a stage time");
				is_validate = false;
			} else if(isNaN(fb_paper_time)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_paper_time_element, "Please input an integer");
				is_validate = false;
			} else if(parseInt(fb_paper_time) != parseFloat(fb_paper_time)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_paper_time_element, "Please input an integer, not a float");
				is_validate = false;
			}
				
			// 通过检测，则ajax提交结果，提交成功后触发reset事件
			if(is_validate) {
				fb_paper_time = parseInt(fb_paper_time);
				if(fb_paper_time > NonQuantStageInfo_Module.cur_stage_left_time) {
					// console.log("showPaperDialog task_id: " + task_id);
					window.parent.IHL_NonQuantFbHelper.showPaperDialog(task_id, fb_paper_time, task_type);
					
				} else {
					NonQuantStageInfo_Module.feedbackPaperTime(task_id, fb_paper_time, task_type);
					
				}
				
			}
			
		});
		// End  : 上面是绑定的反馈按钮点击事件
		
	});
})(jQuery);