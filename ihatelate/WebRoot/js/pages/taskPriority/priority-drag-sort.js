(function($) {
	$(function() {
		var PriorityDragSorter = {
			obtainAllPriority: function() {
				$.ajax({
					url: "modifyPriorityAction!obtainAll.action",
					beforeSend: function() {
						IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Loading ...<h1>");
					},
					success: function(response_data) {
						IHL_BlockMsgObj.unblockMsg(function() {
							if(response_data == "{timeout:true}") {
								window.parent.location.reload();
							} else {
								response_data = $.parseJSON(response_data);
								console.log("response_data: ");
								console.log(response_data);
								if(response_data.status == "200") {
									var priority_list = response_data.lists;
									console.log("priority_list: ");
									console.log(priority_list);
								} else {
									console.log(response_data);
									alert("Server is crashed when obtaining task priority information");
								}
								
								$("#priority-drag-sort").modal('show');
							}
			                    
		                });
						
					}
				});
			}
		};
		$(document).on("click", "#change-task-priority", function() {
			PriorityDragSorter.obtainAllPriority();
		});
		
	});
})(jQuery);