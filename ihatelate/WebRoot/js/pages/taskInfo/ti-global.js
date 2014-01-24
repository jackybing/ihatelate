var tiModify = {
	showTaskInfoModal: function(task_id) {
		$("#fb-modify-task-info").modal("show");
		$.ajax({
			url: "taskAction!obtainTaskByTaskID.action",
			data: {
				id: task_id
			},
			success: function(response_data) {
				response_data = $.parseJSON(response_data);
				console.log("response_data: ");
				console.log(response_data);
				if(response_data.statusCode == "200") {
					var task_info = response_data.taskInfo;
					console.log("taskInfo: ");
					console.log(task_info);
					
				}
				
			}
		});
		
	}

};