(function($) {
	$(function() {
		$(document).on("click", "#add-paper-d-task-btn", function() {
			// 先获取所有输入控件
			
			// 再获取所有输入控件的值（去掉前后空格）
			
			// 对输入控件的值进行检测，如果不对，显示error tip
			
			// 通过检测，则ajax提交结果，提交成功后触发reset事件
			
		}).on("click", ".add-new-stage-btn", function() {
			var this_element = $(this), target_id = this_element.data("target"), 
				item = this_element.data("item"), type = this_element.data("type");
			// console.log("target_id: " + target_id + "; item: " + item + "; type: " + type);
			var target_element = $(target_id), total_stage_num = parseInt(target_element.data("totalStageNum"));
			// console.log("total_stage_num: " + total_stage_num);
			var stage_step = total_stage_num + 1;
			// console.log("stage_step: " + stage_step);
			var new_stage_html = formOneStageHtml(item, type, stage_step, "", "", "hidden");
			target_element.data("totalStageNum", stage_step).append(new_stage_html);
			$("#" + item + "-stage-wrapper-" + type + "-" + stage_step).slideDown("slow");
			if(total_stage_num == 1) {
				target_element.find(".delete-stage-btn").slideDown("slow");
			}
		}).on("click", ".delete-stage-btn", function() {
			var this_btn = $(this),
				item = this_btn.data("item"), type = this_btn.data("type"),
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
				
				stage_wrapper.html(formOneStageSubHtml(item, type, stage_step, stage_name, stage_time)).data("step", stage_step).attr("data-step", stage_step).attr("id", item + "-stage-wrapper-" + type + "-" + (i - 1));
			}
			
			var new_total_stage_num = total_stage_num - 1;
			// console.log("new_total_stage_num: " + new_total_stage_num);
			main_container_element.data("totalStageNum", new_total_stage_num);
			wrapper_element.slideUp("slow", function() {
				$(this).remove();
			});
			
			if(new_total_stage_num == 1) {
				main_container_element.find(".delete-stage-btn").slideUp("slow");
			}
		});
		
	});
})(jQuery);