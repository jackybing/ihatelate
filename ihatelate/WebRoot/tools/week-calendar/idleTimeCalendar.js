$(document).ready(function() {
	

   var $calendar = $('#calendar');
   var id = 10;
   var my_date = new Date();
   var todayTag = my_date.getDay(), curTodayTag = todayTag == 0 ? 7 : todayTag;

   function computeTag(startDate) {
	   var dayNum = startDate.getDay();
	   return dayNum == 0 ? 7 : dayNum;
   }
   function computeDay(myTag) {
	   var retDay = "mon";
	   if(myTag == 1) {
		   retDay = "mon";
	   } else if(myTag == 2) {
		   retDay = "tue";
	   } else if(myTag == 3) {
		   retDay = "wed";
	   } else if(myTag == 4) {
		   retDay = "thu";
	   } else if(myTag == 5) {
		   retDay = "fri";
	   } else if(myTag == 6) {
		   retDay = "sat";
	   } else if(myTag == 7) {
		   retDay = "sun";
	   }
	   return retDay;
   }
   function computeTime(standardTime) {
	   standardTime = standardTime.toString();
	   var firstColonIndex = standardTime.indexOf(":");
	   return standardTime.substring(firstColonIndex - 2, firstColonIndex + 6);
   }
   function getCurFreeTimeArray(myTag, curFreeTime) {
	   var retFreeTimeArray = [];
	   if(myTag == 1) {
		   retFreeTimeArray = curFreeTime["mon"];
	   } else if(myTag == 2) {
		   retFreeTimeArray = curFreeTime["tue"];
	   } else if(myTag == 3) {
		   retFreeTimeArray = curFreeTime["wed"];
	   } else if(myTag == 4) {
		   retFreeTimeArray = curFreeTime["thu"];
	   } else if(myTag == 5) {
		   retFreeTimeArray = curFreeTime["fri"];
	   } else if(myTag == 6) {
		   retFreeTimeArray = curFreeTime["sat"];
	   } else if(myTag == 7) {
		   retFreeTimeArray = curFreeTime["sun"];
	   }
	   return retFreeTimeArray;
   }
   
   $calendar.weekCalendar({
      timeslotsPerHour : 4,
      allowCalEventOverlap : true,
      overlapEventsSeparate: true,
      //newEventText: "增加空闲时间",
      //timeSeparator: " 到 ",
      //shortMonths: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      //longDays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      firstDayOfWeek: todayTag,
      //dateFormat: "Y年M月d日",
      timeFormat: "H:i",
      use24Hour: true,
      businessHours :{start: 0, end: 24, limitDisplay: false },
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
         var $dialogContent = $("#event_edit_container");
         resetForm($dialogContent);
         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         var titleField = $dialogContent.find("input[name='title']");
         var bodyField = $dialogContent.find("textarea[name='body']");

         $dialogContent.dialog({
        	draggable: false,
        	resizable: false,
            modal: true,
            //title: "新建空闲时间",
            title: "New Free Time",
            close: function() {
               $dialogContent.dialog("destroy");
               $dialogContent.hide();
               $('#calendar').weekCalendar("removeUnsavedEvents");
            },
            buttons: {
               //"保存" : function() {
            	"Save" : function() {
                  calEvent.id = id;
                  id++;
                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  calEvent.title = titleField.val();
                  calEvent.body = bodyField.val();
				  // Start: 201311211709 添加空闲时间
                  /*var myTag = computeTag(calEvent.start);
                  freeTime = '[{"tag":"' + myTag + '","day":"' + computeDay(myTag) + '","startTime":"' + computeTime(calEvent.start) + '","endTime":"' + computeTime(calEvent.end) + '"}]';
                  $.ajax({
						url: "freeTimeAction!setFreeTime.action",
						data: {
							freeTime: freeTime
						},
						type: 'post',
						success: function(json_data){
							var data = JSON.parse(json_data);
							data = JSON.parse(data);
							if(data.status == "200") {
								$calendar.weekCalendar("removeUnsavedEvents");
                  				$calendar.weekCalendar("updateEvent", calEvent);
							} else {
								$calendar.weekCalendar("removeUnsavedEvents");
								alert(data.info);
							}
						}
				  });*/
                  // End  : 201311211709 添加空闲时间
                  $calendar.weekCalendar("removeUnsavedEvents");
                  $calendar.weekCalendar("updateEvent", calEvent);
                  $dialogContent.dialog("close");
               },
               //"取消" : function() {
               "Cancel" : function() {
                  $dialogContent.dialog("close");
               }
            }
         }).dialog("open");
         
         $dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));
         setupStartAndEndTimeFields(startField, endField, calEvent, $calendar.weekCalendar("getTimeslotTimes", calEvent.start));

      },
      eventDrop : function(calEvent, $event) {
      },
      eventResize : function(calEvent, $event) {
      },
      eventClick : function(calEvent, $event) {

         if (calEvent.readOnly) {
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
            //title: "编辑 - " + calEvent.title,
            title: "Edit - " + calEvent.title,
            close: function() {
               $dialogContent.dialog("destroy");
               $dialogContent.hide();
               $('#calendar').weekCalendar("removeUnsavedEvents");
            },
            buttons: {
               //"保存" : function() {
				"Save" : function() {
                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  calEvent.title = titleField.val();
                  calEvent.body = bodyField.val();

                  $calendar.weekCalendar("updateEvent", calEvent);
                  $dialogContent.dialog("close");
               },
               //"删除" : function() {
               "Delete" : function() {
                  $calendar.weekCalendar("removeEvent", calEvent.id);
                  $dialogContent.dialog("close");
               },
               //"取消" : function() {
               "Cancel" : function() {
                  $dialogContent.dialog("close");
               }
            }
         }).show();

         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         $dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));
         setupStartAndEndTimeFields(startField, endField, calEvent, $calendar.weekCalendar("getTimeslotTimes", calEvent.start));
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
      }
   });

   function resetForm($dialogContent) {
      //$dialogContent.find("input[name=title]").val("空闲时间");
	   $dialogContent.find("input[name=title]").val("Free Time");
      $dialogContent.find("textarea").val("");
   }

   function getEventData() {
	   var dateObj = new Date();
       var year = dateObj.getFullYear();
       var month = dateObj.getMonth();
       var day = dateObj.getDate();
      var weekday = dateObj.getDay();
		
      // Start: 201311212024 ajax读取空闲时间数据
      var eventArray = [];
      $.ajax({
			url: "freeTimeAction!obtainFreeTime.action",
			data: {
				
			},
			type: 'post',
			async: false,
			success: function(json_data){
				var data = JSON.parse(json_data);
				data = JSON.parse(data);
				if(data.status == "200") {
					var freeTime = data.freeTime;
					// console.log(freeTime);
					freeTime = JSON.parse(freeTime);
					// console.log(freeTime);
					// console.log(weekday + " : " + year + " : " + month + " : " + day);
					for(fIndex in freeTime) {
						var curFreeTime = freeTime[fIndex], tag = parseInt(fIndex) + 1;
						var dayShift = tag - curTodayTag;
						dayShift = dayShift < 0 ? dayShift + 7 : dayShift;
						// console.log("dayShift: " + dayShift);
						// console.log(tag);
						// console.log(curFreeTime);
						var curFreeTimeArray = getCurFreeTimeArray(tag, curFreeTime);
						// console.log(curFreeTimeArray);
						for(cftIndex in curFreeTimeArray) {
							var aFreeTime4Today = curFreeTimeArray[cftIndex];
							var startTime = aFreeTime4Today.startTime, endTime = aFreeTime4Today.endTime;
							var eventObj = {
				               "id": id++,
				               "start": new Date(year, month, day + dayShift, startTime.substring(0, 2), startTime.substring(3, 5)),
				               "end": new Date(year, month, day + dayShift, endTime.substring(0, 2), endTime.substring(3, 5)),
				               //"title":"空闲时间"
				               "title":"Free Time"
				            }
							eventArray.push(eventObj);
						}
					}
				} else {
					alert(data.info);
				}
			}
	  });
      // End  : 201311212024 ajax读取空闲时间数据
      
      return {
         events : eventArray
      };
   }


   /*
    * Sets up the start and end time fields in the calendar event
    * form for editing based on the calendar event being edited
    */
   function setupStartAndEndTimeFields($startTimeField, $endTimeField, calEvent, timeslotTimes) {

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

});