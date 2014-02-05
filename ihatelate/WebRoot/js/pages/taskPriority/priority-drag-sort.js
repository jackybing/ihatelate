(function($) {
	$(function() {
		var PriorityDragSorter = {
			enableDragSorter: function() {
				$("#tp-drag-sorter").dragsort({ 
					dragSelector: "div.tp-ds-subdiv", 
					dragEnd: function() {
						var priority_id_array = $("#tp-drag-sorter .tp-ds-subdiv").map(function() { 
							return $(this).data("taskId"); 
						}).get();
						console.log("priority_id_array: ");
						console.log(priority_id_array);
						$("#tp-drag-sorter").data("priorityIdArray", priority_id_array.join("|"));
						// console.log("priority_id_array: ");
						// console.log($("#tp-drag-sorter").data("priorityIdArray").split("|"));
					}
				});
			},
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
		PriorityDragSorter.enableDragSorter();
	});
})(jQuery);