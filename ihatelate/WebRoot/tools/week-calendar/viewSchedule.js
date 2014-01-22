(function($) {
	$(function() {
		// Start: 201311241721 init dialog
		// var dialog_top = 0;
		var refresh_callback_func;
		var $dialogDetailInfo = $("#detail-info-dialog");
		$dialogDetailInfo.dialog({
	      	draggable: true,
	    	resizable: false,
	    	autoOpen: false,
	        modal: true,
	        width: 750,
	        open: function( event, ui ) {
	        	// $("#ui-dialog-title-detail-info-dialog").parents(".ui-dialog.ui-widget.ui-widget-content.ui-corner-all").css("top", dialog_top);
	        	 	
	        },
	        close: function() {
	           
	        },
	        buttons: {
	           "Close" : function() {
	              $dialogDetailInfo.dialog("close");
	           }
	        }
	    });
		// End  : 201311241721 init dialog
		
		// Start: 201401201826 生成反馈form
		function genFeedbackForm(calEvent) {
			var cur_task_type = calEvent.type, ret_form_html_array = [];
			if(cur_task_type == "10") {	// Read Book
				ret_form_html_array.push('<div class="form-horizontal">',
				  	'<div class="control-group">',
					    '<label class="control-label" for="fb-book-page-num">Completed Page: </label>',
					    '<div class="controls">',
					      	'<input type="text" id="fb-book-page-num" placeholder="Completed Page Number" style="width: 180px; margin-right: 10px;" />',
					      	'<span class="help-inline"></span>',
					      	
					    '</div>',
					'</div>',
					'<div class="control-group">',
						'<div class="controls">',
							'<button class="btn btn-success" id="fb-book-btn" data-id="' + calEvent.id + '">Feedback</button>',
						'</div>',
					'</div>',
				'</div>');
				
			} else if(cur_task_type == "11") {	// Open Class
				ret_form_html_array.push('<div class="form-horizontal">',
				  	'<div class="control-group">',
					    '<label class="control-label" for="fb-class-time">Completed Time: </label>',
					    '<div class="controls">',
					      	'<input type="text" id="fb-class-time" placeholder="Completed Class Time" style="width: 180px; margin-right: 10px;" />',
					      	'<span class="help-inline"></span>',
					      	
					    '</div>',
					'</div>',
					'<div class="control-group">',
						'<div class="controls">',
							'<button class="btn btn-success" id="fb-class-btn" data-id="' + calEvent.id + '">Feedback</button>',
						'</div>',
					'</div>',
				'</div>');
				
			} else if(cur_task_type == "12") {	// 健身
				ret_form_html_array.push('<div class="form-horizontal">',
				  	'<div class="control-group">',
					    '<label class="control-label" for="fb-exercise-group">Completed Group: </label>',
					    '<div class="controls">',
					      	'<input type="text" id="fb-exercise-group" placeholder="Completed Group Count" style="width: 180px; margin-right: 10px;" />',
					      	'<span class="help-inline"></span>',
					      	
					    '</div>',
					'</div>',
					'<div class="control-group">',
						'<div class="controls">',
							'<button class="btn btn-success" id="fb-exercise-btn" data-id="' + calEvent.id + '">Feedback</button>',
						'</div>',
					'</div>',
				'</div>');
				
			} else if(cur_task_type == "20") {	// 写论文
				ret_form_html_array = NonQuantStageInfo_Module.obtainStageHtml(calEvent.id);
				
			} else if(cur_task_type == "21") {	// 申请大学
				
			}
			return ret_form_html_array.join("");
		}
		// End  : 201401201826 生成反馈form
		
		// Start: 201312110844 生成对话框detail table的tbody
		function genDiTbBody(calEvent) {
			var html_array = [], cur_task_type = calEvent.type;
			if(cur_task_type == "10") {
				html_array.push("<tr><td class='detail-info-table-td-1'>Book Title:</td><td colspan='3'>", calEvent.title, 
					"</td></tr>", "<tr><td class='detail-info-table-td-1'>Start Page:</td><td>", calEvent.start_page, 
					"</td><td class='detail-info-table-td-1'>End Page:</td><td>", calEvent.end_page, "</td></tr>");
			} else if(cur_task_type == "11") {
				html_array.push("<tr><td class='detail-info-table-td-1'>Class Name:</td><td colspan='3'>", calEvent.class_name,
					"</td></tr>", "<tr><td class='detail-info-table-td-1'>Start Class:</td><td>", calEvent.start_class,
					"</td><td class='detail-info-table-td-1'>End Class:</td><td>", calEvent.end_class, "</td></tr>",
					"<tr><td class='detail-info-table-td-1'>Start Time:</td><td>", calEvent.start_class_time,
					"</td><td class='detail-info-table-td-1'>End Time:</td><td>", calEvent.end_class_time, "</td></tr>");
			} else if(cur_task_type == "12") {
				html_array.push("<tr><td class='detail-info-table-td-1'>Exercise Name:</td><td>", calEvent.exercise_name,
					"</td><td class='detail-info-table-td-1'>Group:</td><td>", calEvent.group, "</td></tr>");
			} else if(cur_task_type == "20") {
				html_array.push("<tr><td class='detail-info-table-td-1'>Paper Name:</td><td colspan='3'>", calEvent.paper_name,
					"</td></tr>", "<tr><td class='detail-info-table-td-1'>Start Stage:</td><td>", calEvent.start_stage,
					"</td><td class='detail-info-table-td-1'>End Stage:</td><td>", calEvent.end_stage, "</td></tr>",
					"<tr><td class='detail-info-table-td-1'>Start Step:</td><td>", calEvent.start_step,
					"</td><td class='detail-info-table-td-1'>End Step:</td><td>", calEvent.end_step, "</td></tr>",
					"<tr><td class='detail-info-table-td-1'>Start Time:</td><td>", calEvent.start_paper_time,
					"</td><td class='detail-info-table-td-1'>End Time:</td><td>", calEvent.end_paper_time, "</td></tr>");
			} else if(cur_task_type == "21") {
				html_array.push("<tr><td class='detail-info-table-td-1'>University Name:</td><td colspan='3'>", calEvent.university_name,
					"</td></tr>", "<tr><td class='detail-info-table-td-1'>Start Stage:</td><td>", calEvent.start_stage,
					"</td><td class='detail-info-table-td-1'>End Stage:</td><td>", calEvent.end_stage, "</td></tr>",
					"<tr><td class='detail-info-table-td-1'>Start Step:</td><td>", calEvent.start_step,
					"</td><td class='detail-info-table-td-1'>End Step:</td><td>", calEvent.end_step, "</td></tr>",
					"<tr><td class='detail-info-table-td-1'>Start Time:</td><td>", calEvent.start_university_time,
					"</td><td class='detail-info-table-td-1'>End Time:</td><td>", calEvent.end_university_time, "</td></tr>");
			}
			html_array.push("<tr><td class='detail-info-table-td-1'>Time Period:</td><td colspan='3'>From ",
					calEvent.start_time, " to ", calEvent.end_time, "</td></tr>");
			return html_array.join("");
		}
		// End  : 201312110844 生成对话框detail table的tbody
		
	   var $calendar = $('#calendar');
	   var id = 10;
	   var my_date = new Date();
	   var todayTag = my_date.getDay(), curTodayTag = todayTag == 0 ? 7 : todayTag;
	
	   $calendar.weekCalendar({
	      timeslotsPerHour : 4,
	      allowCalEventOverlap : false,
	      overlapEventsSeparate: true,
	      // newEventText: "创建新事件",
	      // timeSeparator: " 到 ",
	      // shortMonths: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	      // longDays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
	      firstDayOfWeek: todayTag,
	      // dateFormat: "Y年M月d日",
	      timeFormat: "H:i",
	      use24Hour: true,
	      businessHours :{start: 0, end: 24, limitDisplay: true },
	      daysToShow : 7,
	      height : function($calendar) {
	         return $(window).height() - $("h1").outerHeight() - 1;
	      },
	      eventRender : function(calEvent, $event) {
	         if (calEvent.end.getTime() < new Date().getTime()) {
	            $event.css("backgroundColor", "#aaa");
	            $event.find(".wc-time").css({
	               "backgroundColor" : "#999",
	               "border" : "1px solid #888"
	            });
	         }
	      },
	      draggable : function(calEvent, $event) {
	         return calEvent.readOnly != true;
	      },
	      resizable : function(calEvent, $event) {
	         return calEvent.readOnly != true;
	      },
	      eventNew : function(calEvent, $event) {
	    	  $calendar.weekCalendar("removeUnsavedEvents");
	    	  
	    	  /*var $dialogContent = $("#event_edit_container");
	         resetForm($dialogContent);
	         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
	         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
	         var titleField = $dialogContent.find("input[name='title']");
	         var bodyField = $dialogContent.find("textarea[name='body']");
	
	         $dialogContent.dialog({
	        	draggable: false,
	        	resizable: false,
	            modal: true,
	            title: "新建日历事件",
	            close: function() {
	               $dialogContent.dialog("destroy");
	               $dialogContent.hide();
	               $('#calendar').weekCalendar("removeUnsavedEvents");
	            },
	            buttons: {
	               "保存" : function() {
	                  calEvent.id = id;
	                  id++;
	                  calEvent.start = new Date(startField.val());
	                  calEvent.end = new Date(endField.val());
	                  calEvent.title = titleField.val();
	                  calEvent.body = bodyField.val();
	
	                  $calendar.weekCalendar("removeUnsavedEvents");
	                  $calendar.weekCalendar("updateEvent", calEvent);
	                  $dialogContent.dialog("close");
	               },
	               "取消" : function() {
	                  $dialogContent.dialog("close");
	               }
	            }
	         }).dialog("open");
	         
	         $dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));*/
	         // setupStartAndEndTimeFields(startField, endField, calEvent, $calendar.weekCalendar("getTimeslotTimes", calEvent.start));
	
	      },
	      eventDrop : function(calEvent, $event) {
	      },
	      eventResize : function(calEvent, $event) {
	      },
	      eventClick : function(calEvent, $event) {
	    	  /*dialog_top = $($event[0]).offset().top;
	          dialog_top = parseFloat(dialog_top);
	          if(dialog_top > 1514) {
	        	  dialog_top = 1514;
	          }*/
	    	  
	    	  /*$("#did-task-id").text(calEvent.id);
	    	  $("#did-title").text(calEvent.title);
	    	  $("#did-start-time").text(calEvent.start_time);
	    	  $("#did-end-time").text(calEvent.end_time);
	    	  $("#did-start-page").text(calEvent.start_page);
	    	  $("#did-end-page").text(calEvent.end_page);*/
	          
	          // to move the first row of tbody to thead
	          // console.log(calEvent);
	          var first_tr = $dialogDetailInfo.find("#detail-info-table tbody").html(genDiTbBody(calEvent)).find("tr:first");
	          $("#detail-info-table thead").html(first_tr);
	          
	          // Generate the feedback
	          $("#vs-fb-div").html(genFeedbackForm(calEvent));
	          
	    	  $dialogDetailInfo.dialog("open");
	    	  
	    	  /*window.setTimeout(function() {
	         	$("html,body", window.parent.document).scrollTop(parseFloat(dialog_top) + 160);
	         }, 100);*/
	         /*if (calEvent.readOnly) {
	            return;
	         }
	
	         var $dialogContent = $("#event_edit_container");
	         resetForm($dialogContent);
	         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
	         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
	         var titleField = $dialogContent.find("input[name='title']").val(calEvent.title);
	         var bodyField = $dialogContent.find("textarea[name='body']");
	         bodyField.val(calEvent.body);
	
	         $dialogContent.dialog({
	            modal: true,
	            title: "编辑 - " + calEvent.title,
	            close: function() {
	               $dialogContent.dialog("destroy");
	               $dialogContent.hide();
	               $('#calendar').weekCalendar("removeUnsavedEvents");
	            },
	            buttons: {
	               "保存" : function() {
	
	                  calEvent.start = new Date(startField.val());
	                  calEvent.end = new Date(endField.val());
	                  calEvent.title = titleField.val();
	                  calEvent.body = bodyField.val();
	
	                  $calendar.weekCalendar("updateEvent", calEvent);
	                  $dialogContent.dialog("close");
	               },
	               "删除" : function() {
	                  $calendar.weekCalendar("removeEvent", calEvent.id);
	                  $dialogContent.dialog("close");
	               },
	               "取消" : function() {
	                  $dialogContent.dialog("close");
	               }
	            }
	         }).show();
	
	         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
	         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
	         $dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));*/
	         // setupStartAndEndTimeFields(startField, endField, calEvent, $calendar.weekCalendar("getTimeslotTimes", calEvent.start));
	         $(window).resize().resize(); //fixes a bug in modal overlay size ??
	
	      },
	      eventMouseover : function(calEvent, $event) {
	    	  
	      },
	      eventMouseout : function(calEvent, $event) {
	      },
	      noEvents : function() {
	
	      },
	      data : function(start, end, callback) {
	         callback(getEventData());
	      },
	      calendarAfterLoad: function(calendar) {
	    	  	// Start: 201311241706 将每个任务的height和z-index保存
				$(".wc-day-column-inner.ui-droppable .wc-cal-event.ui-corner-all").each(function() {
					var this_element = $(this);
					this_element.data("height", this_element.css("height")).data("zIndex", this_element.css("z-index"));
					var before = this_element.height();
					var after = this_element.css("height", "auto").height();
					this_element.css("height", this_element.data("height"));
					if(after < before) {
						this_element.data("isHoverChangeHeight", "false");
					}
				}).hover(function() {
					var this_element = $(this);
					if(this_element.data("isHoverChangeHeight") != "false") {
						this_element.css("height", "auto").css("z-index", "999");
					}
						
				}, function() {
					var this_element = $(this);
					this_element.css("height", this_element.data("height")).css("z-index", this_element.data("zIndex"));
				});
				// End  : 201311241706 将每个任务的height和z-index保存
				var IHL_IndexInitObj_avatars = window.parent.IHL_IndexInitObj;
				IHL_IndexInitObj_avatars.iframes_schedule = true;
				IHL_IndexInitObj_avatars.endInit(refresh_callback_func);
	      }
	   });
	
	   function resetForm($dialogContent) {
	      $dialogContent.find("input").val("");
	      $dialogContent.find("textarea").val("");
	   }
	
	    function genEveObjByType(cur_task_id, cur_task_type, cur_task_schedule_info) {
			var ret_event_obj;
			
			if(cur_task_type == "10") {
				var title = cur_task_schedule_info.title, start_page = cur_task_schedule_info.startPage,
					end_page = cur_task_schedule_info.endPage;
			  	ret_event_obj = {
	                "title": title,
	                "start_page": start_page,
	                "end_page": end_page,
	                "body_desc": ("Task #" + cur_task_id + ": <br />Reading Book<br />《" + title + "》<br />P" + start_page + " - P" + end_page)
	            };
			} else if(cur_task_type == "11") {
				var class_name = cur_task_schedule_info.className, start_class = cur_task_schedule_info.startClass,
					end_class = cur_task_schedule_info.endClass, start_class_time = cur_task_schedule_info.startTime,
					end_class_time = cur_task_schedule_info.endTime;
			  	ret_event_obj = {
			  		"title": class_name,
	                "class_name": class_name,
	                "start_class": start_class,
	                "end_class": end_class,
	                "start_class_time": start_class_time,
	                "end_class_time": end_class_time,
	                "body_desc": ("Task #" + cur_task_id + ": <br />Open Class<br />" + class_name + "<br />Class " + start_class + ", " + start_class_time + " min<br /> to <br />Class " + end_class + ", " + end_class_time + "min")
	            };
			} else if(cur_task_type == "12") {
			  	var exercise_name = cur_task_schedule_info.exerciseName, group = cur_task_schedule_info.group;
			  	ret_event_obj = {
			  		"title": exercise_name,
	                "exercise_name": exercise_name,
	                "group": group,
	                "body_desc": ("Task #" + cur_task_id + ": <br />Taking Exercise<br />" + exercise_name + "<br />" + group + " groups")
	            };
			} else if(cur_task_type == "20") {
				var paper_name = cur_task_schedule_info.paperName, start_stage = cur_task_schedule_info.startStage,
					end_stage = cur_task_schedule_info.endStage, start_step = cur_task_schedule_info.startStep,
					end_step = cur_task_schedule_info.endStep, start_paper_time = cur_task_schedule_info.startTime,
					end_paper_time = cur_task_schedule_info.endTime;
			  	ret_event_obj = {
			  		"title": paper_name,
	                "paper_name": paper_name,
	                "start_stage": start_stage,
	                "end_stage": end_stage,
	                "start_step": start_step,
	                "end_step": end_step,
	                "start_paper_time": start_paper_time,
	                "end_paper_time": end_paper_time,
	                "body_desc": ("Task #" + cur_task_id + ": <br />Write Paper<br />《" + paper_name + "》<br />Stage " + start_stage + " Step " + start_step + " Time " + start_paper_time + "<br />To<br />" + "Stage " + end_stage + " Step " + end_step + " Time " + end_paper_time)
	            };
			} else if(cur_task_type == "21") {
				var university_name = cur_task_schedule_info.universityName, start_stage = cur_task_schedule_info.startStage,
					end_stage = cur_task_schedule_info.endStage, start_step = cur_task_schedule_info.startStep,
					end_step = cur_task_schedule_info.endStep, start_university_time = cur_task_schedule_info.startTime,
					end_university_time = cur_task_schedule_info.endTime;
			  	ret_event_obj = {
			  		"title": university_name,
	                "university_name": university_name,
	                "start_stage": start_stage,
	                "end_stage": end_stage,
	                "start_step": start_step,
	                "end_step": end_step,
	                "start_university_time": start_university_time,
	                "end_university_time": end_university_time,
	                "body_desc": ("Task #" + cur_task_id + ": <br />Apply for University<br />" + university_name + "<br />Stage " + start_stage + " Step " + start_step + " Time " + start_university_time + "<br />To<br />" + "Stage " + end_stage + " Step " + end_step + " Time " + end_university_time)
	            };
			}
			
			return ret_event_obj;
		}
	   
	    function getEventData() {
	    	var ihl_vs_is_not_first = window.parent.IHL_IndexInitObj.iframes_schedule;
	    	if(ihl_vs_is_not_first) {
	    		var year = new Date().getFullYear();
		      	var month = new Date().getMonth();
		      	var day = new Date().getDate();
			  	
		      	// Start: 201311212024 ajax读取空闲时间数据
		      	var eventArray = [];
		      	$.ajax({
					url: "scheduleAction!schedule.action",
					data: {
						
					},
					type: 'post',
					async: false,
					success: function(json_data){
						try {
							var data = JSON.parse(json_data);
							data = JSON.parse(data);
							if(data.statusCode == "200") {
								var schedule_array_str = data.scheduel;
								var schedule_array = JSON.parse(schedule_array_str);
								for(var sIndex in schedule_array) {
									var schedule = schedule_array[sIndex];
									for(var s_tag in schedule) {
										var dayShift = s_tag - curTodayTag;
										dayShift = dayShift < 0 ? dayShift + 7 : dayShift;
										
										var task_array = schedule[s_tag];
										
										for(var task_index in task_array) {
											var cur_task = task_array[task_index];
											if(cur_task) {
												var cur_task_id = cur_task.taskID, cur_task_schedule_info = cur_task.scheduleInfo,
													cur_task_time_array = cur_task.time, cur_task_type = cur_task.type;
												if(cur_task_id && cur_task_schedule_info && cur_task_time_array && cur_task_type) {
													for(var time_idx in cur_task_time_array) {
														var time_obj = cur_task_time_array[time_idx], start_time = time_obj.startTime,
															end_time = time_obj.endTime;
														var eventObj = genEveObjByType(cur_task_id, cur_task_type, cur_task_schedule_info);
														eventObj.id = cur_task_id;
														eventObj.type = cur_task_type;
														eventObj.start = new Date(year, month, day + dayShift, start_time.substring(0, 2), start_time.substring(3, 5));
														eventObj.end = new Date(year, month, day + dayShift, end_time.substring(0, 2), end_time.substring(3, 5));
														eventObj.start_time = start_time;
														eventObj.end_time = end_time;
														eventObj.readOnly = true;
														
														/*eventObj = eventObj || {
											               "id": cur_task_id,
											               "type": cur_task_type,
											               "start": new Date(year, month, day + dayShift, start_time.substring(0, 2), start_time.substring(3, 5)),
											               "end": new Date(year, month, day + dayShift, end_time.substring(0, 2), end_time.substring(3, 5)),
											               "start_time": start_time,
											               "end_time": end_time,
											               readOnly : true
											            };*/
														eventArray.push(eventObj);
														
													}
												}
													
											}
												
										}
									}
								}
							}
							
						} catch(exception) {
							window.parent.location.reload();
						}
						
					}
			  	});
		      	// End  : 201311212024 ajax读取空闲时间数据
		      	return { events : eventArray };
	    	} else {
	    		return {events: []};
	    	}
		        
	   	}
	
	
	   /*
	    * Sets up the start and end time fields in the calendar event
	    * form for editing based on the calendar event being edited
	    */
	   function setupStartAndEndTimeFields($startTimeField, $endTimeField, calEvent, timeslotTimes) {
			$startTimeField.html("");
			$endTimeField.html("");
	      for (var i = 0; i < timeslotTimes.length; i++) {
	         var startTime = timeslotTimes[i].start;
	         var endTime = timeslotTimes[i].end;
	         var startSelected = "";
	         if (startTime.getTime() === calEvent.start.getTime()) {
	            startSelected = "selected=\"selected\"";
	         }
	         var endSelected = "";
	         if (endTime.getTime() === calEvent.end.getTime()) {
	            endSelected = "selected=\"selected\"";
	         }
	         $startTimeField.append("<option value=\"" + startTime + "\" " + startSelected + ">" + timeslotTimes[i].startFormatted + "</option>");
	         $endTimeField.append("<option value=\"" + endTime + "\" " + endSelected + ">" + timeslotTimes[i].endFormatted + "</option>");
	
	      }
	      $endTimeOptions = $endTimeField.find("option");
	      $startTimeField.trigger("change");
	   }
	
	   var $endTimeField = $("select[name='end']");
	   var $endTimeOptions = $endTimeField.find("option");
	
	   //reduces the end time options to be only after the start time options.
	   $("select[name='start']").change(function() {
	      var startTime = $(this).find(":selected").val();
	      var currentEndTime = $endTimeField.find("option:selected").val();
	      $endTimeField.html(
	            $endTimeOptions.filter(function() {
	               return startTime < $(this).val();
	            })
	            );
	
	      var endTimeSelected = false;
	      $endTimeField.find("option").each(function() {
	         if ($(this).val() === currentEndTime) {
	            $(this).attr("selected", "selected");
	            endTimeSelected = true;
	            return false;
	         }
	      });
	
	      if (!endTimeSelected) {
	         //automatically select an end date 2 slots away.
	         $endTimeField.find("option:eq(1)").attr("selected", "selected");
	      }
	
	   });
		
	    $("#ihl-calendar-refresh").click(function() {
	    	if(!refresh_callback_func) {
	    		refresh_callback_func = function() {
	    			window.parent.IHL_BlockMsgObj.showGrowlMsg("Refreshing finished", "You can view your schedule now!");
	    		};
	    	}
	    	$calendar.weekCalendar("refresh");
	    	$dialogDetailInfo.dialog("close");
		});
	});
})(jQuery);