(function($) {
	$(function() {
		$(document).on("click", "#fb-nq-paper-confirm", function() {
			var dataEle = $("#fb-paper-modal-label"), 
				task_id = dataEle.data("taskId"), fb_paper_time = dataEle.data("fbPaperTime");
			// console.log($(this).text() + " | " + task_id + " | " + fb_paper_time);
			var nq_stage_info_module = $("#vs-iframe")[0].contentWindow.NonQuantStageInfo_Module;
			nq_stage_info_module.feedbackPaperTime(task_id, fb_paper_time);
			$('#fb-paper-modal').modal('hide');
		});
		
	});
})(jQuery);