(function($) {
	$(function() {
		// Start: 对于新的VS界面，根据屏幕可视区域自适应高度的对象和方法
		var ResizeVsIframeObj = {
			cache_resize_height: 0,
			resizeVsIframe: function() {
				// console.log("resize " + this.cache_resize_height);
				var tmp_height = this.cache_resize_height - 194;
				$("#vs-iframe").height(tmp_height).contents().find("#detail-info-dialog")
				.css("max-height", (tmp_height - 140) + "px");
				var tmp_dialog_max_height = this.cache_resize_height * 0.75 - 120;
				$(".modal-body").css("max-height", tmp_dialog_max_height);
			}
		};
		ResizeVsIframeObj.cache_resize_height = document.body.clientHeight;
		ResizeVsIframeObj.resizeVsIframe();
		
		$(window).on("resize", function() {
			var visible_height = document.body.clientHeight;
			if(ResizeVsIframeObj.cache_resize_height != visible_height) {
				ResizeVsIframeObj.cache_resize_height = visible_height;
				ResizeVsIframeObj.resizeVsIframe();
			}
			
		});
		$(document).on("click", "#view-schedule-btn", function() {
			ResizeVsIframeObj.resizeVsIframe();
		});
		// End  : 对于新的VS界面，根据屏幕可视区域自适应高度的对象和方法
		
		// Start: 点击dialog的按钮后会发生的事情
		$(document).on("click", "#fb-nq-paper-confirm", function() {
			var dataEle = $("#fb-paper-modal-label"), 
				task_id = dataEle.data("taskId"), fb_paper_time = dataEle.data("fbPaperTime"),
				task_type = dataEle.data("taskType");
			// console.log($(this).text() + " | " + task_id + " | " + fb_paper_time);
			var nq_stage_info_module = $("#vs-iframe")[0].contentWindow.NonQuantStageInfo_Module;
			nq_stage_info_module.feedbackPaperTime(task_id, fb_paper_time, task_type);
			$('#fb-paper-modal').modal('hide');
		}).on("click", "#fb-nq-paper-modify", function() {
			var dataEle = $("#fb-paper-modal-label"), 
				task_id = dataEle.data("taskId"), fb_paper_time = dataEle.data("fbPaperTime"),
				task_type = dataEle.data("taskType");
			// console.log($(this).text() + " | " + task_id + " | " + fb_paper_time);
			$('#fb-paper-modal').modal('hide');
			TiModify.showTaskInfoModal(task_id);
			
		});
		// End  : 点击dialog的按钮后会发生的事情
		
		// Start: 保存任务信息修改的按钮被点击
		$(document).on("click", "#save-fbmti-btn", function() {
			var this_ele = $(this);
			if(!this_ele.hasClass("disabled")) {
				var task_type = this_ele.data("taskType"),
					stage_num = this_ele.data("stageNum");
				TiSave.saveModifiedTi(task_type, stage_num);
			}
				
		});
		// End  : 保存任务信息修改的按钮被点击
		
		
	});
})(jQuery);