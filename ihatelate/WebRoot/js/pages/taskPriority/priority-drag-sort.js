(function($) {
	$(function() {
		var PriorityDragSorter = {
			enableDragSorter: function() {
				$("#tp-drag-sorter").dragsort({ 
					dragSelector: "div.tp-ds-subdiv", 
					scrollContainer: "#priority-drag-sort .modal-body",
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
			genOneDragSortBoxHtml: function(priority_task) {
				var box_html_array = [], cur_task_type = priority_task.type, cur_task_id = priority_task.id,
					start_time = priority_task.startTime.substring(0, 10), end_time = priority_task.endTime.substring(0, 10);
				box_html_array.push('<li><div class="alert alert-info tp-ds-subdiv" data-task-id="', cur_task_id, '">');
				if(cur_task_type == "10") {
				  	box_html_array.push('Task #', cur_task_id, ': ', priority_task.name, '. Reading Book《', priority_task.title, '》. From ', start_time, ' to ', end_time, '.');
				} else if(cur_task_type == "11") {
				  	box_html_array.push('Task #', cur_task_id, ': ', priority_task.name, '. Open Class "', priority_task.className, '". From ', start_time, ' to ', end_time, '.');
				} else if(cur_task_type == "12") {
				  	box_html_array.push('Task #', cur_task_id, ': ', priority_task.name, '. Taking Exercise "', priority_task.exerciseName, '". From ', start_time, ' to ', end_time, '.');
				} else if(cur_task_type == "20") {
				  	box_html_array.push('Task #', cur_task_id, ': ', priority_task.name, '. Write Paper 《', priority_task.paperName, '》. From ', start_time, ' to ', end_time, '.');
				} else if(cur_task_type == "21") {
				  	box_html_array.push('Task #', cur_task_id, ': ', priority_task.name, '. Apply for University 《', priority_task.universityName, '》. From ', start_time, ' to ', end_time, '.');
				}
				box_html_array.push('</div></li>');
				return box_html_array.join("");
			},
			genDragSortList: function(priority_list) {
				var drag_sort_html_array = [], this_ptr = this;
				drag_sort_html_array.push('<ul  id="tp-drag-sorter" class="unstyled">');
				for(var priority_task_idx in priority_list) {
					var priority_task = priority_list[priority_task_idx];
					drag_sort_html_array.push(this_ptr.genOneDragSortBoxHtml(priority_task));
				}
				drag_sort_html_array.push('</ul>');
				$("#priority-drag-sort .modal-body").html(drag_sort_html_array.join(""));
				this_ptr.enableDragSorter();
			},
			obtainAllPriority: function() {
				var this_ptr = this;
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
								// console.log("response_data: ");
								// console.log(response_data);
								if(response_data.status == "200") {
									var priority_list = response_data.lists;
									console.log("priority_list: ");
									console.log(priority_list);
									this_ptr.genDragSortList(priority_list);
									$("#priority-drag-sort").modal('show');
								} else {
									if(window.console && window.console.log) {
										console.log(response_data);
									}
									alert("Server is crashed when obtaining task priority information");
								}
								
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