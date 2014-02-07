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
						$("#tp-drag-sorter").data("priorityIdArray", priority_id_array.join("|"));
						var save_priority_btn = $("#save-priority-btn");
						if(save_priority_btn.hasClass("disabled")) {
							save_priority_btn.removeClass("disabled");
						}
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
			sortPriorityList: function(priority_list) {
				var ret_list = [], sort_obj = {};
				for(var pri_idx in priority_list) {
					var pri_task = priority_list[pri_idx], priority_level = pri_task.priority;
					if(sort_obj[priority_level]) {
						sort_obj[priority_level].push(pri_task);
					} else {
						var pri_level_array = [];
						pri_level_array.push(pri_task);
						sort_obj[priority_level] = pri_level_array;
					}
				}
				for(var sort_key in sort_obj) {
					ret_list = ret_list.concat(sort_obj[sort_key]);
				}
				return ret_list;
			},
			genDragSortList: function(priority_list) {
				var drag_sort_html_array = [], this_ptr = this, priority_id_array = [];
				drag_sort_html_array.push('<ul  id="tp-drag-sorter" class="unstyled">');
				priority_list = this_ptr.sortPriorityList(priority_list);
				for(var priority_task_idx in priority_list) {
					var priority_task = priority_list[priority_task_idx];
					drag_sort_html_array.push(this_ptr.genOneDragSortBoxHtml(priority_task));
					priority_id_array.push(priority_task.id);
				}
				drag_sort_html_array.push('</ul>');
				$("#priority-drag-sort .modal-body").html(drag_sort_html_array.join(""));
				this_ptr.enableDragSorter();
				$("#tp-drag-sorter").data("priorityIdArray", priority_id_array.join("|"));
				$("#save-priority-btn").addClass("disabled");
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
								if(response_data.status == "200") {
									var priority_list = response_data.lists;
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
			},
			formIdPriorityStr: function(priority_id_array) {
				var id_priority_array = [];
				for(var id_idx in priority_id_array) {
					id_priority_array.push({"ID": priority_id_array[id_idx], "priority": parseInt(id_idx) + 1});
				}
				return JSON.stringify(id_priority_array);
			},
			saveTaskPriority: function() {
				var priority_id_array = $("#tp-drag-sorter").data("priorityIdArray").split("|"),
					id_priority_str = this.formIdPriorityStr(priority_id_array);
				$.ajax({
					url: "modifyPriorityAction!modifyPriority.action",
					beforeSend: function() {
						IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Saving ...<h1>");
					},
					data: {
						IDPriorityStr: id_priority_str
					},
					success: function(response_data) {
						IHL_BlockMsgObj.unblockMsg(function() {
							if(response_data == "{timeout:true}") {
								window.parent.location.reload();
							} else {
								response_data = $.parseJSON(response_data);
								if(response_data.status == "200") {
									IHL_IndexInitObj.initTimeline();
									$("#save-priority-btn").addClass("disabled");
									IHL_BlockMsgObj.showGrowlMsg("Success", "Task Priority Saved Successfully");
								} else {
									if(window.console && window.console.log) {
										console.log(response_data);
									}
									alert("Server is crashed when saving task priority information");
								}
								
							}
			                    
		                });
						
					}
				});
			}
		};
		$(document).on("click", "#change-task-priority", function() {
			PriorityDragSorter.obtainAllPriority();
		}).on("click", "#save-priority-btn", function() {
			if(!$("#save-priority-btn").hasClass("disabled")) {
				PriorityDragSorter.saveTaskPriority();
			}
		});
		
	});
})(jQuery);