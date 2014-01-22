(function($) {
	$(function() {
		// Start: 对于新的VS界面，根据屏幕可视区域自适应高度的对象和方法
		var ResizeVsIframeObj = {
			cache_resize_height: 0,
			resizeVsIframe: function() {
				// console.log("resize " + this.cache_resize_height);
				$("#vs-iframe").height(this.cache_resize_height - 194);
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
		// End  : 对于新的VS界面，根据屏幕可视区域自适应高度的对象和方法
		// Start: 点击dialog的按钮后会发生的事情
		$(document).on("click", "#fb-nq-paper-confirm", function() {
			var dataEle = $("#fb-paper-modal-label"), 
				task_id = dataEle.data("taskId"), fb_paper_time = dataEle.data("fbPaperTime");
			// console.log($(this).text() + " | " + task_id + " | " + fb_paper_time);
			var nq_stage_info_module = $("#vs-iframe")[0].contentWindow.NonQuantStageInfo_Module;
			nq_stage_info_module.feedbackPaperTime(task_id, fb_paper_time);
			$('#fb-paper-modal').modal('hide');
		}).on("click", "#fb-nq-paper-modify", function() {
			var dataEle = $("#fb-paper-modal-label"), 
				task_id = dataEle.data("taskId"), fb_paper_time = dataEle.data("fbPaperTime");
			console.log($(this).text() + " | " + task_id + " | " + fb_paper_time);
			
		});
		// End  : 点击dialog的按钮后会发生的事情
	});
})(jQuery);