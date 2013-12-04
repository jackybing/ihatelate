(function($) {
	$(function() {
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
			console.log("task_name: " + task_name + "; start_time: " + start_time + "; end_time: " + end_time);
			console.log("total_day: " + total_day + "; class_name: " + class_name + "; amount: " + amount);
			console.log("time_4_each_class: " + time_4_each_class + "; remark: " + remark + "; is_active: " + is_active);
			
		});
	});
})(jQuery);