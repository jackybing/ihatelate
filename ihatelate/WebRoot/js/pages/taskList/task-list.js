(function($) {
	$(function() {
		function initTlTable() {
			$("#task-list-tb").tablecloth({
	          	theme: "paper",
	            striped: true,
	          	sortable: true,
	          	condensed: true
	        });
			$("#tl-tb-index").click();
		}
		initTlTable();
		
		$(document).on("click", "#display-task-list", function() {
			console.log("1. obtain task list data; 2. hide Show Task List button, form task list data html;");
			console.log("3. slidedown and show task list; 4. Hide Task List button is always in the Task List Panel;");
			console.log("5. click Hide Task List button to hide Task List Panel and show Show Task List button.");
			$.ajax({
				url: "taskAction!obtainAllTask.action",
				success: function(rsps_data) {
					var rsps_obj = $.parseJSON(rsps_data);
					if(rsps_obj.statusCode == "200") {
						var task_array = rsps_obj.task;
						console.log(task_array);
						
					}
				}
			});
			
		});
		
	});
})(jQuery);