// Task Form Operation 相关对象
var IHL_TaskFormOprtObj = {
	computeDateRangeDays: function(sDate1, sDate2) {
		var aDate, oDate1, oDate2, iDays;
        aDate = sDate1.split("-");
        oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);  //转换为12-18-2002格式 
        aDate = sDate2.split("-");
        oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); 
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24);  //把相差的毫秒数转换为天数 
        return iDays;
	}
}
// Error Tip 的相关对象
var IHL_ErrorTipObj = {
	isInScrolling: false,
	scrollToElement: function(targetEle) {
		var that = this;
		if(!that.isInScrolling) {
            that.isInScrolling = true;
            var anh = targetEle.offset().top - 95;
            $("html,body").stop().animate({scrollTop: anh}, 
                { 
                    duration: 500, 
                    queue: false, 
                    complete: function() { 
                        that.isInScrolling = false;
                        // targetEle.focus().select();
                    } 
                }
            );
        }
	},
	showErrTipAndScroll2Ele: function(element, msg) {
		this.scrollToElement(element);
		element.parents(".control-group").addClass("error").find(".help-inline").text(msg);
	}
};
// Block Message 展示和消除的对象
var IHL_BlockMsgObj = {
	showGrowlMsg: function(title, msg) {
		$.growlUI(title, msg);
	},
	is_blocked: false,
	timer_id: 0,
	confirmBlockExe: function() {
		this.timer_id = window.setTimeout(function() {
			if(this_ptr.is_blocked) {
				if(confirm("服务器长时间无响应，是否继续等待？")) {
					IHL_BlockMsgObj.confirmBlockExe();
				} else {
					window.loacation.reload();
				}
			}
		}, 60000);
	},
	showBlockMsg: function(msg, element, callback) {
		var this_ptr = this;
		this_ptr.is_blocked = true;
		var blockUIoptions = { 
            message: msg,
            css: { 
                border: 'none', 
                padding: '15px', 
                backgroundColor: '#000', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px',
                'border-radius': '10px',
                opacity: .5, 
                color: '#fff' 
            }
        };
		// 是否回调
		if(callback && typeof(callback) == "function") {
			blockUIoptions.onBlock = callback;
		}
		if(element) {
            element.block(blockUIoptions);
        } else {
            $.blockUI(blockUIoptions);
        }
		// 防止session超时造成无响应异常
		this_ptr.confirmBlockExe();
	},
	unblockMsg: function(callback_func) {
		var this_ptr = this;
		window.clearInterval(this_ptr.timer_id);
		this.is_blocked = false;
		$.unblockUI({
            onUnblock: function(){ 
                if(callback_func && typeof(callback_func) == "function") {
                	callback_func();
                }
            }
        });
	}
};
// 默认写论文初始化的对象
function formOneStageSubHtml(item, type, stage_step, stage_name, stage_time, sname_tip, stime_tip) {
	var sname_err_class, stime_err_class;
	if(sname_tip) {
		sname_err_class = " error";
	} else {
		sname_tip = "";
		sname_err_class = ""
	}
	if(stime_tip) {
		stime_err_class = " error";
	} else {
		stime_tip = "";
		stime_err_class = ""
	}
	var ret_html = '<div class="control-group' + sname_err_class + '">' +
			              '<label class="control-label" for="' + item + '-sname-' + type + '-' + stage_step + '">Stage ' + stage_step + ' Name:</label>' +
			              '<div class="controls">' +
				              '<input value="' + stage_name + '" type="text" id="' + item + '-sname-' + type + '-' + stage_step + '" placeholder="Stage ' + stage_step + ' Name" class="input-width-280px">' +
				              '<span class="help-inline">' + sname_tip + '</span>' +
			              '</div>' +
		             '</div>' +
		             '<div class="control-group' + stime_err_class + '">' +
			              '<label class="control-label" for="' + item + '-stime-' + type + '-' + stage_step + '">Stage ' + stage_step + ' Time:</label>' +
			              '<div class="controls">' +
				              '<input value="' + stage_time + '" type="text" id="' + item + '-stime-' + type + '-' + stage_step + '" placeholder="Stage ' + stage_step + ' Time" class="input-width-280px">' +
				              '<span class="help-inline">' + stime_tip + '</span>' +
			              '</div>' +
		             '</div>' +
		             '<div class="control-group">' +
			              '<div class="controls">' +
				              '<button data-item="' + item + '" data-type="' + type + '" data-wrapper-id="#' + item + '-stage-wrapper-' + type + '-' + stage_step + '" class="btn btn-danger delete-stage-btn">Delete this Stage</button>' +
				              '<button data-item="' + item + '" data-type="' + type + '" data-wrapper-id="#' + item + '-stage-wrapper-' + type + '-' + stage_step + '" class="btn btn-primary add-new-stage-btn margin-left-5px">Add a New Stage After Me</button>' +
			              '</div>' +
		             '</div>' +
		             '<div style="width: 98%; height: 1px; border-bottom: 1px solid rgb(210, 210, 210); margin: -10px 0 10px 19px;"></div>';
	return ret_html;
}
function formOneStageHtml(item, type, stage_step, stage_name, stage_time, hidden_class) {
	var class_str =  hidden_class ? 'class="' + hidden_class + '"' : "";
	var ret_html = '<div id="' + item + '-stage-wrapper-' + type + '-' + stage_step + '" data-step="' + stage_step + '"' + class_str + '>' +
						formOneStageSubHtml(item, type, stage_step, stage_name, stage_time) +
			       '</div>';
	return ret_html;
}
var default_papers_template = {
	taskId: -1,
	stages: '[{"1":"开题"},{"2":"写正文"},{"3":"答辩"}]',
	check_stages: [],
	initDefaultStages: function() {
		var taskId = this.taskId, stages = $.trim(this.stages);
		stages = stages.substring(1, stages.length - 1).split(",");
		var stages_html_array = [];
		var stage_step = 0, total_step_num = stages.length;
		for(var step_idx = 1; step_idx <= total_step_num; step_idx++) {
			for(var stages_idx in stages) {
				var stages_obj = $.parseJSON(stages[stages_idx]);
				for(stage_step in stages_obj) {
					if(step_idx == stage_step) {
						var stage_name = stages_obj[stage_step];
						this.check_stages.push(stage_name);
						var stage_html = formOneStageHtml("papers", "d", stage_step, stage_name, "");
						stages_html_array.push(stage_html);
					}
					
				}
				
			}
		}
			
		$("#papers-stages-d").data("taskId", this.taskId).data("totalStageNum", total_step_num).html(stages_html_array.join(""));
		IHL_IndexInitObj.template_papers_default = true;
	},
	obtainDefaultStages: function() {
		var that = this;
		$.ajax({
			url: "stageAction!obtainDefaultStage.action",
			data: { type: 20 },
			async: false,
			success: function(json_data_obj) {
				var data_obj = $.parseJSON(json_data_obj);
				if(data_obj.statusCode == "200") {
					that.taskId = data_obj.taskID;
					that.stages = data_obj.stages;
					that.initDefaultStages();
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(textStatus + " \n" + errorThrown + " \nWe are fixing some bugs, please be back later.");
				$("#logout-btn").click();
			}
		});
	}
};

var default_university_template = {
	taskId: -1,
	stages: '[{"1":"开题"},{"2":"写正文"},{"3":"答辩"}]',
	check_stages: [],
	initDefaultStages: function() {
		var taskId = this.taskId, stages = $.trim(this.stages);
		stages = stages.substring(1, stages.length - 1).split(",");
		var stages_html_array = [];
		var stage_step = 0, total_step_num = stages.length;
		for(var step_idx = 1; step_idx <= total_step_num; step_idx++) {
			for(var stages_idx in stages) {
				var stages_obj = $.parseJSON(stages[stages_idx]);
				for(stage_step in stages_obj) {
					if(step_idx == stage_step) {
						var stage_name = stages_obj[stage_step];
						this.check_stages.push(stage_name);
						var stage_html = formOneStageHtml("university", "d", stage_step, stage_name, "");
						stages_html_array.push(stage_html);
					}
					
				}
				
			}
		}
			
		$("#university-stages-d").data("taskId", this.taskId).data("totalStageNum", total_step_num).html(stages_html_array.join(""));
		IHL_IndexInitObj.template_university_default = true;
	},
	obtainDefaultStages: function() {
		var that = this;
		$.ajax({
			url: "stageAction!obtainDefaultStage.action",
			data: { type: 21 },
			async: false,
			success: function(json_data_obj) {
				var data_obj = $.parseJSON(json_data_obj);
				if(data_obj.statusCode == "200") {
					that.taskId = data_obj.taskID;
					that.stages = data_obj.stages;
					that.initDefaultStages();
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(textStatus + " \n" + errorThrown + " \nWe are fixing some bugs, please be back later.");
				$("#logout-btn").click();
			}
		});
	}
};

// 进行计算的对象
var IHL_Compute = {
	computeFullDayTag: function(day_index) {
		var ret_full_day_tag = "Monday";
		if(day_index == 1) {
			ret_full_day_tag = "Monday";
	   	} else if(day_index == 2) {
			ret_full_day_tag = "Tuesday";
	   	} else if(day_index == 3) {
		   	ret_full_day_tag = "Wednesday";
	   	} else if(day_index == 4) {
		   	ret_full_day_tag = "Thursday";
	   	} else if(day_index == 5) {
		   	ret_full_day_tag = "Friday";
	   	} else if(day_index == 6) {
		   	ret_full_day_tag = "Saturday";
	   	} else if(day_index == 7) {
		   	ret_full_day_tag = "Sunday";
	   	}
	   	return ret_full_day_tag;
	},
	genTimelineLi: function(cur_timeline) {
		var cur_task_id = cur_timeline.taskID, cur_task_type = cur_timeline.type, ret_html = "", 
			cur_tl_info = cur_timeline.scheduleInfo, cur_tl_time_array = cur_timeline.time,
			cur_tl_time = cur_tl_time_array[0], start_time = cur_tl_time.startTime, 
			end_time = cur_tl_time.endTime;
		if(start_time == end_time) {
			cur_tl_time = cur_tl_time_array[cur_tl_time_array.length - 1];
			start_time = cur_tl_time.startTime, end_time = cur_tl_time.endTime;
		}
			
		if(cur_task_type == "10") {
			var title = cur_tl_info.title, start_page = cur_tl_info.startPage,
				end_page = cur_tl_info.endPage;
			ret_html = "<li>" +
				         	"<h3>" + start_time + "<span>to " + end_time + "</span></h3>" +
				          	"<dl>" +
				            	"<dt>Reading 《" + title + "》" +
									"<span>Task #" + cur_task_id + ": P" + start_page + " - P" + end_page + "</span>" +
								"</dt>" +
				          	"</dl>" +
				        "</li>";
		} else if(cur_task_type == "11") {
			var class_name = cur_tl_info.className, start_class = cur_tl_info.startClass,
				end_class = cur_tl_info.endClass, start_class_time = cur_tl_info.startTime,
				end_class_time = cur_tl_info.endTime;
			ret_html = "<li>" +
				         	"<h3>" + start_time + "<span>to " + end_time + "</span></h3>" +
				          	"<dl>" +
				            	"<dt>Attend open class: " + class_name +
									"<span>Task #" + cur_task_id + ": Class " + start_class + ", " + start_class_time + " min, to Class " + end_class + ", " + end_class_time + "min" + "</span>" +
								"</dt>" +
				          	"</dl>" +
				        "</li>";
			
		} else if(cur_task_type == "12") {
		  	var exercise_name = cur_tl_info.exerciseName, group = cur_tl_info.group;
		  	ret_html = "<li>" +
				         	"<h3>" + start_time + "<span>to " + end_time + "</span></h3>" +
				          	"<dl>" +
				            	"<dt>Taking Exercise: " + exercise_name +
									"<span>" + "Task #" + cur_task_id + ": " + group + " groups" +  "</span>" +
								"</dt>" +
				          	"</dl>" +
				        "</li>";
		} else if(cur_task_type == "20") {
			var paper_name = cur_tl_info.paperName, start_stage = cur_tl_info.startStage,
				end_stage = cur_tl_info.endStage, start_step = cur_tl_info.startStep,
				end_step = cur_tl_info.endStep, start_paper_time = cur_tl_info.startTime,
				end_paper_time = cur_tl_info.endTime;
			ret_html = "<li>" +
				         	"<h3>" + start_time + "<span>to " + end_time + "</span></h3>" +
				          	"<dl>" +
				            	"<dt>Write Paper 《" + paper_name + "》" +
									"<span>Task #" + cur_task_id + ": Stage " + start_stage + " Step " + start_step + " Time " + start_paper_time + ", to " + "Stage " + end_stage + " Step " + end_step + " Time " + end_paper_time + "</span>" +
								"</dt>" +
				          	"</dl>" +
				        "</li>";
		} else if(cur_task_type == "21") {
			var university_name = cur_tl_info.universityName, start_stage = cur_tl_info.startStage,
				end_stage = cur_tl_info.endStage, start_step = cur_tl_info.startStep,
				end_step = cur_tl_info.endStep, start_university_time = cur_tl_info.startTime,
				end_university_time = cur_tl_info.endTime;
			ret_html = "<li>" +
				         	"<h3>" + start_time + "<span>to " + end_time + "</span></h3>" +
				          	"<dl>" +
				            	"<dt>Apply for University " + university_name +
									"<span>" + "Task #" + cur_task_id + ": Stage " + start_stage + " Step " + start_step + " Time " + start_university_time + ", To " + "Stage " + end_stage + " Step " + end_step + " Time " + end_university_time + "</span>" +
								"</dt>" +
				          	"</dl>" +
				        "</li>";
		}
		return ret_html;
	}
	
};

// 进行初始化的对象
var IHL_IndexInitObj = {
	iframes_idle: false,		// idle iframe 初始化完毕设置为true
	iframes_schedule: false,	// schedule iframe 初始化完毕设置为true
	template_papers_default: false, // 写论文模板（默认）初始化完毕设置为true
	template_university_default: false, // 申请大学模板（默认）初始化完毕设置为true
	startInit: function() {
		this.initUsernameDiv();
		this.initTimeline();
		this.initDefaultStages();
		this.initIframes();
		this.endInit();
	},
	initTimeline: function() {
		var tl_date = new Date(), tl_today_index = tl_date.getDay(), tl_today_index = tl_today_index == 0 ? 7 : tl_today_index;
		var today_full_tag = IHL_Compute.computeFullDayTag(tl_today_index);
		$("#index-tl-weekday").text(today_full_tag);
		$.ajax({
			url: "scheduleAction!scheduleToday.action",
			success: function(data) {
				data = $.parseJSON(data);
				if(data.statusCode == "200") {
					var schedule = data.scheduel;
					schedule_array = $.parseJSON(schedule);
					var today_schedule = schedule_array[0];
					var timeline_ul_array = [];
					for(var today_index in today_schedule) {
						var today_full_tag = IHL_Compute.computeFullDayTag(today_index), 
							today_timeline_array = today_schedule[today_index];
						$("#index-tl-weekday").text(today_full_tag);
						
						for(var tl_index in today_timeline_array) {
							var cur_timeline = today_timeline_array[tl_index];
							timeline_ul_array.push(IHL_Compute.genTimelineLi(cur_timeline));
						}
						
					}
					$("#index-tl-ul").html(timeline_ul_array.join("")).find("li:first").addClass("green");
					
					
				} else {
					alert("Failed to obtain your schedule!");
				}
			}
		});
	},
	initUsernameDiv: function() {
		$.ajax({
			url:"userAction!obtainUserInfo.action",
			success: function(data) {
				data = $.parseJSON(data);
				if(data.statusCode == "200") {
					var user = data.user;
					$("#username-div").text(user.userName);
				} else {
					$("#username-div").text("Obtain username failed");
				}
			}
		});
		
	},
	initDefaultStages: function() {
		default_papers_template.obtainDefaultStages();
		default_university_template.obtainDefaultStages();
	},
	initIframes: function() {
		$("#itc-iframe").attr("src", "jumpAction!idleTimeCalendar");
		$("#vs-iframe").attr("src", "jumpAction!viewSchedule");
	},
	endInit: function(callback_func) {
		var is_validate = this.iframes_idle && this.iframes_schedule && this.template_papers_default && this.template_university_default;
		if(is_validate) {
			IHL_BlockMsgObj.unblockMsg(function() {
				window.setTimeout(function() {
					$("#index-timeline-container ul").slideDown("slow");
				}, 100);
			});
		}
		
	}
};

(function($) {
	$(function() {
		IHL_IndexInitObj.startInit();
		$(document).on("click", "#logout-btn", function() {
			$.ajax({
				url: "userAction!logout.action",
				success: function(json_data) {
					var data = $.parseJSON(json_data);
					if(data.statusCode == "200") {
						IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>" + data.info + "</h1>", undefined, function() {
							window.location.reload();
						});
					}
				}
			});

		});
	});
})(jQuery);