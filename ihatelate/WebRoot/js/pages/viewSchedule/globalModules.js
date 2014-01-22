var IHL_BlockMsgObj = window.parent.IHL_BlockMsgObj,
	IHL_ErrorTipObj = window.parent.IHL_ErrorTipObj;
// Start: 201401202120 反馈 非量化Stage信息组织模块
var NonQuantStageInfo_Module = {
	computeBarWidth: function(stage_total_time, stage_completed_time) {
		return stage_completed_time / stage_total_time * 100;
	},
	judgeTrClass: function(stage_total_time, stage_completed_time) {
		var ret_class = "warning";
		if(stage_total_time == stage_completed_time) {
			ret_class = "success";
		} else if(stage_completed_time == 0) {
			ret_class = "error";
		}
		return ret_class;
	},
	judgeBarClass: function(tr_class) {
		var ret_bar_class = "";
		if(tr_class != "error") {
			ret_bar_class = " bar-" + tr_class;
		}
		return ret_bar_class;
	},
	cur_stage_left_time: 0,
	obtainStageHtml: function(task_id) {
		var ret_form_html_array = [], this_ptr = this;
		$.ajax({
			url: "writePaperTaskAction!obtainStagesInfo.action",
			data: {
				id: task_id
			},
			async: false,
			success: function(response_data) {
				if(response_data == "{timeout:true}") {
					window.parent.location.reload();
				} else {
					response_data = JSON.parse(JSON.parse(response_data));
					// console.log("response_data: ");
					// console.log(response_data);
					if(response_data.statusCode == "200") {
						var stages = response_data.stages;
						// console.log("stages: ");
						// console.log(stages);
						ret_form_html_array.push('<table class="table table-striped table-hover table-condensed">',
							'<thead style="text-align: center;">',
				                '<tr>',
				                  	'<th>Index</th>',
				                  	'<th>Stage Name</th>',
				                  	'<th>Completion Progress</th>',
				                  	'<th>Status</th>',
				                '</tr>',
				            '</thead>',
			            	'<tbody>');
						var is_fb_ctrl_set = false;
						for(var st_key in stages) {
							var st_val = stages[st_key];
							// console.log("st_key: " + st_key);
							// console.log("st_val: " + st_val);
							var st_index_sp_name_idx = st_key.indexOf(":"),
								st_total_sp_completed_idx = st_val.indexOf(":");
							var stage_index = st_key.substring(0, st_index_sp_name_idx), 
								stage_name = st_key.substring(st_index_sp_name_idx + 1),
								stage_total_time = st_val.substring(0, st_total_sp_completed_idx), 
								stage_completed_time = st_val.substring(st_total_sp_completed_idx + 1);
							// console.log("st_index_sp_name_idx: " + st_index_sp_name_idx);
							// console.log("stage_index: " + stage_index);
							// console.log("stage_name: " + stage_name);
							// console.log("st_total_sp_completed_idx: " + st_total_sp_completed_idx);
							// console.log("stage_total_time: " + stage_total_time);
							// console.log("stage_completed_time: " + stage_completed_time);
							var bar_width = this_ptr.computeBarWidth(stage_total_time, stage_completed_time),
								tr_class = this_ptr.judgeTrClass(stage_total_time, stage_completed_time),
								progress_div_class = tr_class == "warning" ? " active" : "",
								bar_class = this_ptr.judgeBarClass(tr_class);
							ret_form_html_array.push('<tr class="' + tr_class + '">',
			                  	'<td>' + stage_index + '</td>',
			                  	'<td>' + stage_name + '</td>',
			                  	'<td>',
			                  		'<div class="progress progress-striped' + progress_div_class + '">',
									  	'<div class="bar' + bar_class + '" style="width: ' + bar_width + '%;"></div>',
									'</div>',
			                  	'</td>',
			                  	'<td>' + stage_completed_time + ' / ' + stage_total_time + '</td>',
			                '</tr>');
							if(!is_fb_ctrl_set && tr_class != "success") {
								// console.log(stage_completed_time + " / " + stage_total_time);
								// console.log("this_ptr.cur_stage_left_time before: " + this_ptr.cur_stage_left_time);
								this_ptr.cur_stage_left_time = stage_total_time - stage_completed_time; 
								// console.log("this_ptr.cur_stage_left_time after: " + this_ptr.cur_stage_left_time);
								
								ret_form_html_array.push('<tr class="info">',
									'<td colspan="4">',
										'<div class="form-horizontal">',
										  	'<div class="control-group">',
											    '<label class="control-label" for="fb-paper-time">Completed Time: </label>',
											    '<div class="controls">',
											      	'<input type="text" id="fb-paper-time" placeholder="Completed Stage Time" style="width: 180px; margin-right: 10px;" />',
											      	'<span class="help-inline"></span>',
											      	
											    '</div>',
											'</div>',
											'<div class="control-group">',
												'<div class="controls">',
													'<button class="btn btn-success" id="fb-paper-btn" data-id="' + task_id + '">Feedback</button>',
												'</div>',
											'</div>',
										'</div>',
									'</td>',
								'</tr>');
								is_fb_ctrl_set = true;
							}
							
						}
						ret_form_html_array.push('</tbody></table>');
						
					} else {
						ret_form_html_array.push('<div class="alert alert-error">',
	 								'<strong>获取任务反馈信息失败</strong>',
						'</div>');
						
					}
					
				}
					
			}
		});
		return ret_form_html_array;
	},
	feedbackPaperTime: function(task_id, fb_paper_time) {
		IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Submiting feedback ...<h1>");
		$.ajax({
			url: "writePaperTaskAction!feedback.action",
			data: {
				id: task_id,
				stageTime: parseInt(fb_paper_time)
			},
			success: function(response_data) {
				response_data = JSON.parse(JSON.parse(response_data));
				$("#vs-fb-div").html(NonQuantStageInfo_Module.obtainStageHtml(task_id).join(""));
				IHL_BlockMsgObj.unblockMsg(function() { 
                    if(response_data.statusCode == "200") {
						$('#calendar').weekCalendar("refresh");
    					// $("#detail-info-dialog").dialog("close");
    					IHL_BlockMsgObj.showGrowlMsg("Feedback completed", response_data.info);
					} else {
						var fb_info = response_data.info;
						IHL_BlockMsgObj.showGrowlMsg("Feedback completed", fb_info);
						IHL_ErrorTipObj.showErrTipAndScroll2Ele(fb_paper_time_element, fb_info);
					}
                });
				
			}
		});
					
	}
	
};
// End  : 201401202120 反馈 非量化Stage信息组织模块