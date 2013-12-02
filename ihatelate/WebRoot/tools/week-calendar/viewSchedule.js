$(document).ready(function() {
	// Start: 201311241721 init dialog
	var dialog_top = 0;
	var refresh_callback_func = undefined;
	var $dialogDetailInfo = $("#detail-info-dialog");
	$dialogDetailInfo.dialog({
      	draggable: true,
    	resizable: false,
    	autoOpen: false,
        modal: true,
        open: function( event, ui ) {
        	$("#ui-dialog-title-detail-info-dialog").parents(".ui-dialog.ui-widget.ui-widget-content.ui-corner-all").css("top", dialog_top);
        	 	
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
   var $calendar = $('#calendar');
   var id = 10;
   var my_date = new Date();
   var todayTag = my_date.getDay(), curTodayTag = todayTag == 0 ? 7 : todayTag;

   $calendar.weekCalendar({
      timeslotsPerHour : 4,
      allowCalEventOverlap : true,
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
    	  dialog_top = $($event[0]).offset().top;
          dialog_top = parseFloat(dialog_top);
          if(dialog_top > 1514) {
        	  dialog_top = 1514;
          }
    	  
    	  $("#did-task-id").text(calEvent.id);
    	  $("#did-title").text(calEvent.title);
    	  $("#did-start-time").text(calEvent.start_time);
    	  $("#did-end-time").text(calEvent.end_time);
    	  $("#did-start-page").text(calEvent.start_page);
    	  $("#did-end-page").text(calEvent.end_page);
    	  $dialogDetailInfo.dialog("open");
    	  
    	  window.setTimeout(function() {
         	$("html,body", window.parent.document).scrollTop(parseFloat(dialog_top) + 160);
         }, 100);
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

    function getEventData() {
    	var ihl_vs_is_not_first = window.parent.IHL_IndexInitObj.iframes_schedule;
    	if(ihl_vs_is_not_first) {
    		// console.log("pull data - view schedule");
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
									var cur_task_id = cur_task.taskID, cur_task_schedule_info = cur_task.scheduleInfo,
										title = cur_task_schedule_info.title, start_page = cur_task_schedule_info.startPage,
										end_page = cur_task_schedule_info.endPage, time_array = cur_task.time;
									for(var time_idx in time_array) {
										var time_obj = time_array[time_idx], start_time = time_obj.startTime,
											end_time = time_obj.endTime;
										
										var eventObj = {
							               "id": cur_task_id,
							               "start": new Date(year, month, day + dayShift, start_time.substring(0, 2), start_time.substring(3, 5)),
							               "end": new Date(year, month, day + dayShift, end_time.substring(0, 2), end_time.substring(3, 5)),
							               //"title":"空闲时间"
							               "title": title,
							               "body_desc": ("Task #" + cur_task_id + ": <br />" + title + "<br />P" + start_page + " - P" + end_page),
							               "start_time": start_time,
							               "end_time": end_time,
							               "start_page": start_page,
							               "end_page": end_page,
							               readOnly : true
							            }
										eventArray.push(eventObj);
										
									}
								}
							}
						}
					}
					
				}
		  	});
	      	// End  : 201311212024 ajax读取空闲时间数据
	      	
	      	return {
	         	events : eventArray
	         	/*[
	            	{
	               		"id":1,
	               		"start": new Date(year, month, day, 12),
	               		"end": new Date(year, month, day, 13, 30),
	               		"title":"跟李彦宏吃午饭"
	            	},
	            	{
	               		"id":2,
	               		"start": new Date(year, month, day, 14),
	               		"end": new Date(year, month, day, 14, 45),
	               		"title":"百度WDM研发会议"
	            	},
	            	{
	               		"id":3,
	               		"start": new Date(year, month, day + 1, 17),
	               		"end": new Date(year, month, day + 1, 17, 45),
	               		"title":"去南门威申国际剪头发"
	            	},
	            	{
	               		"id":4,
	               		"start": new Date(year, month, day + 1, 8),
	               		"end": new Date(year, month, day + 1, 9, 30),
	               		"title":"page、mark和plat组团队建设活动"
	            	},
	            	{
	               		"id":5,
	               		"start": new Date(year, month, day + 1, 14),
	               		"end": new Date(year, month, day + 1, 15),
	               		"title":"WD产品展示会"
	            	},
	            	{
	               		"id":6,
	               		"start": new Date(year, month, day, 10),
	               		"end": new Date(year, month, day, 11),
	               		"title":"如果我是只读的，说明朱建兵很帅",
	               		readOnly : true
	            	}
	
	         	]*/
	      	};
    	} else {
    		// console.log("empty data - view schedule");
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
    			window.parent.showGrowlMsg("Refreshing finished", "You can view your schedule now!");
    		};
    	}
    	$calendar.weekCalendar("refresh");
	});
    
    
});