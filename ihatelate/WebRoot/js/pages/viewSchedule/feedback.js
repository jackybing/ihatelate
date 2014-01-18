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
		// 下面是绑定的反馈按钮点击事件
		$("#fb-book-btn").live("click", function() {
			var task_id = $(this).attr("data-id");
			var fb_book_page_num_element = $("#fb-book-page-num");
			var fb_book_page_num = fb_book_page_num_element.val();
			// 对输入控件的值进行检测，如果不对，显示error tip
			var is_validate = true;
			if(fb_book_page_num == "") {
				window.parent.IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_book_page_num_element, "Please input a page number");
				is_validate = false;
			} else if(isNaN(fb_book_page_num)) {
				window.parent.IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_book_page_num_element, "Please input an integer");
				is_validate = false;
			} else if(parseInt(fb_book_page_num) != parseFloat(fb_book_page_num)) {
				window.parent.IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_book_page_num_element, "Please input an integer, not a float");
				is_validate = false;
			}
			// 通过检测，则ajax提交结果，提交成功后触发reset事件
			if(is_validate) {
				$.ajax({
					url: "bookTaskAction!feedback.action",
					data: {
						id: task_id,
						completedPageNum: fb_book_page_num
					},
					success: function(response_data) {
						response_data = JSON.parse(JSON.parse(response_data));
						console.log(response_data);
						if(response_data.statusCode == "200") {
							$('#calendar').weekCalendar("refresh");
	    					$("#detail-info-dialog").dialog("close");
	    					window.parent.IHL_BlockMsgObj.showGrowlMsg("Feedback completed", response_data.info);
						} else {
							var fb_info = response_data.info;
							window.parent.IHL_BlockMsgObj.showGrowlMsg("Feedback completed", fb_info);
							window.parent.IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_book_page_num_element, fb_info);
						}
						
					}
				});
			}
			
		});
		
	});
})(jQuery);