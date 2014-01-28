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
		
		var TaskListHelper = {
			genTaskTbTrBtns: function(task_id, task_name) {
				var ret_html_array = [];
				ret_html_array.push(
				'<div class="btn-group">',
	          		'<button class="btn btn-info btn-mini" title="Edit Task Information"><i class="icon-edit"></i></button>',
		        	'<button class="btn btn-danger btn-mini delete-task-btn" title="Delete Task Information" data-name="', task_name, '" data-id="', task_id, '"><i class="icon-trash"></i></button>',
	          	'</div>');
				return ret_html_array.join("");
			},
			genTaskTbTr: function(task, idx) {
				var this_ptr = this, ret_html_array = [], task_type = task.type, idx = parseInt(idx), 
					tr_class = (idx % 2) ? "oddrow" : "evenrow", tr_idx = idx + 1, task_name = task.name,
					is_active_tr_html = task.isActive ? '<td class="highlight-success is-active-td"><i class="icon-ok"></i></td>' : '<td class="highlight-danger is-active-td"><i class="icon-remove"></i></td>',
					start_time = task.startTime.substring(0, 10), end_time = task.endTime.substring(0, 10);
				ret_html_array.push('<tr class="', tr_class, '">');
				if(task_type == "10") {	// Read Book
					ret_html_array.push(
          			'<td>', tr_idx, '</td>',
          			'<td>', task_name, '</td>',
          			'<td>', start_time, '</td>',
          			'<td>', end_time, '</td>',
          			'<td>', task.totalDay, '</td>',
          			is_active_tr_html,
          			'<td>Reading</td>',
          			'<td>', task.title, '</td>');
				} else if(task_type == "11") {	// Open Class
					ret_html_array.push(
          			'<td>', tr_idx, '</td>',
          			'<td>', task_name, '</td>',
          			'<td>', start_time, '</td>',
          			'<td>', end_time, '</td>',
          			'<td>', task.totalDay, '</td>',
          			is_active_tr_html,
          			'<td>Open Class</td>',
          			'<td>', task.className, '</td>');
				} else if(task_type == "12") {	// 健身
					ret_html_array.push(
          			'<td>', tr_idx, '</td>',
          			'<td>', task_name, '</td>',
          			'<td>', start_time, '</td>',
          			'<td>', end_time, '</td>',
          			'<td>', task.totalDay, '</td>',
          			is_active_tr_html,
          			'<td>Exercise</td>',
          			'<td>', task.exerciseName, '</td>');
				} else if(task_type == "20") {	// 写论文
					ret_html_array.push(
          			'<td>', tr_idx, '</td>',
          			'<td>', task_name, '</td>',
          			'<td>', start_time, '</td>',
          			'<td>', end_time, '</td>',
          			'<td>', task.totalDay, '</td>',
          			is_active_tr_html,
          			'<td>Paper</td>',
          			'<td>', task.paperName, '</td>');
				} else if(task_type == "21") {	// 申请大学
					ret_html_array.push(
          			'<td>', tr_idx, '</td>',
          			'<td>', task_name, '</td>',
          			'<td>', start_time, '</td>',
          			'<td>', end_time, '</td>',
          			'<td>', task.totalDay, '</td>',
          			is_active_tr_html,
          			'<td>University</td>',
          			'<td>', task.universityName, '</td>');
				}
				ret_html_array.push(
					'<td>',
	          			this_ptr.genTaskTbTrBtns(task.id, task_name),
          			'</td>',
          		'</tr>');
				return ret_html_array.join("");
			},
			formTaskTbBodyHtml: function(task_array) {
				var this_ptr = this, ret_html_array = [];
				for(var idx in task_array) {
					ret_html_array.push(this.genTaskTbTr(task_array[idx], idx));
				}
				return ret_html_array.join("");
			},
			formTaskTbHtml: function(task_array) {
				var this_ptr = this, ret_html_array = [];
				ret_html_array.push(
				'<table id="task-list-tb" cellspacing="1" cellpadding="3" class="tablehead table table-paper table-condensed table-striped table-sortable" style="background:#CCC;">',
		          	'<thead>',
		            	'<tr class="stathead">',
		              		'<th class="{sorter: false}" colspan="6">Common Information</th>',
		              		'<th class="{sorter: false}" colspan="2">Unique Information</th>',
		              		'<th class="{sorter: false}" title="Operations">Opts</th>',
		            	'</tr>',
		            	'<tr class="colhead">',
		              		'<th id="tl-tb-index" title="Task Index">No.</th>',
		              		'<th>Task Name</th>',
		              		'<th>Start Date</th>',
		              		'<th>End Date</th>',
		              		'<th title="Days to Spend on the Task">Days</th>',
		              		'<th class="{sorter: false}" title="is the Task Active or not">Active</th>',
		              		'<th>Task Type</th>',
		              		'<th title="Book Title, Class Name, Exercise Name, Paper Name, University Name, etc.">Task Subject</th>',
		              		'<th class="{sorter: false}" title="Operations">Opts</th>',
		            	'</tr>',
		          	'</thead>',
		          	'<tbody>',
		          		this.formTaskTbBodyHtml(task_array),
		          	'</tbody>',
				'</table>');
				return ret_html_array.join("");
			}
		};
		
		var TaskDeleteHelper = {
			deleteTaskById: function(task_id, task_name) {
				if(confirm("确定要删除任务“" + task_name + "”？")) {
					var ids_array = [];
					ids_array.push(task_id);
					$.ajax({
						url: "taskAction!deleteTaskByID.action",
						data: {
							ids: JSON.stringify(ids_array)
						},
						beforeSend: function() {
							IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Deleting Task ...<h1>");
						},
						success: function(rsps_data) {
							var rsps_obj = $.parseJSON(rsps_data);
							IHL_BlockMsgObj.unblockMsg(function() { 
		                        if(rsps_obj.statusCode == "200") {
		                        	// 刷新列表
									$("#display-task-list").click();
								} else {
									$.growlUI('Error', rsps_obj.info);
								}
		                    });
								
						}
					});
					
				}
					
			}
		};
		
		$(document).on("click", "#display-task-list", function() {
			var display_tl_btn = $(this);
			$.ajax({
				url: "taskAction!obtainAllTask.action",
				beforeSend: function() {
					IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Obtaining Task List ...<h1>");
				},
				success: function(rsps_data) {
					display_tl_btn.fadeOut("slow");
					var rsps_obj = $.parseJSON(rsps_data);
					IHL_BlockMsgObj.unblockMsg(function() { 
                        if(rsps_obj.statusCode == "200") {
							var task_array = rsps_obj.task;
							var taskTbHtml = TaskListHelper.formTaskTbHtml(task_array);
							$("#tl-tb-div").html(taskTbHtml);
							initTlTable();
							$("#task-list-wrapper").slideDown("slow");
						} else {
							$.growlUI('Error', rsps_obj.info);
						}
                    });
						
				}
			});
			
		}).on("click", "#hide-task-list", function() {
			$("#task-list-wrapper").slideUp("slow");
			$("#display-task-list").fadeIn("slow");
		}).on("click", ".delete-task-btn", function() {
			var this_ele = $(this), task_id = this_ele.data("id"), task_name = this_ele.data("name");
			TaskDeleteHelper.deleteTaskById(task_id, task_name);
		});
		
	});
})(jQuery);