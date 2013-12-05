function showGrowlMsg(title, msg) {
	$.growlUI(title, msg);
}
// Block Message 展示和消除的对象
var IHL_BlockMsgObj = {
	showBlockMsg: function(msg, element, callback) {
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
	},
	unblockMsg: function(callback_func) {
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
function formOneStageSubHtml(item, type, stage_step, stage_name, stage_time) {
	var ret_html = '<div class="control-group">' +
			              '<label class="control-label" for="' + item + '-sname-' + type + '-' + stage_step + '">Stage ' + stage_step + ' Name:</label>' +
			              '<div class="controls">' +
				              '<input value="' + stage_name + '" type="text" id="' + item + '-sname-' + type + '-' + stage_step + '" placeholder="Stage ' + stage_step + ' Name" class="input-width-280px">' +
				              '<span class="help-inline"></span>' +
			              '</div>' +
		             '</div>' +
		             '<div class="control-group">' +
			              '<label class="control-label" for="' + item + '-stime-' + type + '-' + stage_step + '">Stage ' + stage_step + ' Time:</label>' +
			              '<div class="controls">' +
				              '<input value="' + stage_time + '" type="text" id="' + item + '-stime-' + type + '-' + stage_step + '" placeholder="Stage ' + stage_step + ' Time" class="input-width-280px">' +
				              '<span class="help-inline"></span>' +
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
// 进行初始化的对象
var IHL_IndexInitObj = {
	iframes_idle: false,		// idle iframe 初始化完毕设置为true
	iframes_schedule: false,	// schedule iframe 初始化完毕设置为true
	template_papers_default: false, // 写论文模板（默认）初始化完毕设置为true
	startInit: function() {
		var that = this;
		IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Initializing ... Please wait ...</h1>", undefined, function() {
			that.initIframes();
			that.initDefaultStages();
			that.endInit();
		});
		
	},
	initDefaultStages: function() {
		default_papers_template.obtainDefaultStages();
	},
	initIframes: function() {
		$("#itc-iframe").attr("src", "jumpAction!idleTimeCalendar");
		$("#vs-iframe").attr("src", "jumpAction!viewSchedule");
	},
	endInit: function(callback_func) {
		// console.log("iframes_idle: " + this.iframes_idle + "; iframes_schedule: " + this.iframes_schedule + "; template_papers_default: " + this.template_papers_default);
		var is_validate = this.iframes_idle && this.iframes_schedule && this.template_papers_default;
		if(is_validate) {
			IHL_BlockMsgObj.unblockMsg();
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