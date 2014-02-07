(function($) {
	$(function() {
		
		$(document).on("click", "#change-task-priority", function() {
			PriorityDragSorter.obtainAllPriority();
		}).on("click", "#save-priority-btn", function() {
			if(!$("#save-priority-btn").hasClass("disabled")) {
				PriorityDragSorter.saveTaskPriority();
			}
		});
		
	});
})(jQuery);