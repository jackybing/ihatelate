(function($) {
	$(function() {
		// init tooltips
		$('#account-setting-btn, #lang-change-btn, .top-right-btns').tooltip({
			placement: 'bottom'
		});
		// when #index-page-btn clicked
		$(document).on("click", ".top-right-btns", function() {
			/*window.location.replace("jumpAction!index");*/
			var this_btn = $(this);
			if(!this_btn.hasClass("glow")) {
				// 切换面板
				var id_str = this_btn.data("target"), cur_target = $(id_str);
				$(".top-right-btns.glow").removeClass("glow");
				this_btn.addClass("glow");
				$(".content-wrappers.selected").removeClass("selected").slideUp("slow");
				cur_target.addClass("selected").slideDown("slow", function() {
					// 加载iframe内容
					var iframe_id_str = this_btn.data("iframeId"), iframe_src = this_btn.data("iframeSrc");
					if(iframe_id_str && iframe_src) {
						// $(iframe_id_str).attr("src", iframe_src);
						IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Refreshing ... Please wait ...</h1>", undefined, function() {
							$(iframe_id_str).contents().find("#ihl-calendar-refresh").trigger("click");
						});
						
					}
				});
				
			}
		});
		// Save idle calendar events
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
		function showBlockMsg(msg, element) {
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
            if(element) {
                element.block(blockUIoptions);
            } else {
                $.blockUI(blockUIoptions);
            }
        }
		$(document).on("click", "#idle-calendar-save-btn", function() {
			showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Saving ...<h1>");
			var childFrameContents = $("#itc-iframe").contents();
			var free_time_array = [];
			for(var tmp_tag_shift = 1; tmp_tag_shift <= 7; tmp_tag_shift++) {
				var my_date = new Date();
				var todayTag = my_date.getDay(), curTodayTag = todayTag == 0 ? 7 : todayTag;
				var tag_4_this_day = curTodayTag + tmp_tag_shift - 1;
				tag_4_this_day = tag_4_this_day > 7 ? tag_4_this_day - 7 : tag_4_this_day;
				childFrameContents.find(".wc-day-column.day-" + tmp_tag_shift).find(".wc-time.ui-corner-all").each(function() {
					var this_wc_time = $(this);
					var startTime = this_wc_time.attr("start-time"), endTime = this_wc_time.attr("end-time");
					free_time_unit = '{"tag":"' + tag_4_this_day + '","day":"' + computeDay(tag_4_this_day) + '","startTime":"' + startTime + '","endTime":"' + endTime + '"}';
					free_time_array.push(free_time_unit);
				});
			}
			var free_time_str = '[' + free_time_array.join(",") + ']';
			$.ajax({
				url: "freeTimeAction!setFreeTime.action",
				data: {
					freeTime: free_time_str
				},
				type: 'post',
				success: function(json_data) {
					var data = $.parseJSON(json_data);
					$.unblockUI({
                        onUnblock: function(){ 
                            $.growlUI('Saving Result', data.info);
                        }
                    });
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$.unblockUI({
                        onUnblock: function(){ 
                            $.growlUI('Error', textStatus);
                        }
                    });
				}
			});
		});
		// init datepicker
		function initRangeDatepicker() {
			var cur_date = new Date(),
				start_date = cur_date.getFullYear() + "-" + (parseInt(cur_date.getMonth()) + 1) + "-" + cur_date.getDate() + "+00:00:00";
			$('.start-end-datepicker').datepicker({
			    format: "yyyy-mm-dd",
			    startDate: start_date,
			    autoclose: true,
			    todayHighlight: true
			});
			
		}
		initRangeDatepicker();
		
		// 从豆瓣获取书籍信息
		$(document).on("click", "#search-book-title-btn", function() {
			var book_title_element = $("#input-book-title"), book_title = $.trim(book_title_element.val());
			if(book_title == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(book_title_element, "Please input a book title");
			} else {
				showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Searching ...<h1>");
				$.getJSON("https://api.douban.com/v2/book/search?count=10&start=0&q=" + book_title + "&alt=\"xd\"&callback=?", function(result) {
					var books_array = result.books;
				    var btsr_html_array = [], btsr_is_first = true;
				    if(result.count > 0) {
				    	for(var book_idx in books_array) {
					    	var book = books_array[book_idx];
					    	if(btsr_is_first) {
					    		btsr_html_array.push('<ul class="thumbnails" style="width: 97%; margin: 3px auto;">');
					    	}
					    	btsr_html_array.push(
					    		'<li class="span6">' +
					                '<div class="thumbnail">' +
					                  '<div class="caption" style="height: 500px; overflow: hidden;">' +
					                  	'<div class="row-fluid" style="border-bottom: 1px solid rgb(218, 218, 218); margin-bottom: 10px;">' +
					                  		'<div class="span12">' +
					                  			'<h3 style="margin: 0; white-space:nowrap; overflow: hidden;">' + book.title + '</h3>' +
					                  		'</div>' +
					                  	'</div>' +
					                  	'<div class="row-fluid">' +
					                  		'<div class="span4">' +
					                  			'<ul class="thumbnails">' +
									              '<li class="span12" style="margin-bottom: 0;">' +
									                '<a href="javascript: void(0);" class="thumbnail" style="cursor: default;">' +
									                  '<img src="' + book.image + '" alt="' + book.title + '" style="width: 100%; max-height: 180px;" />' +
									                '</a>' +
									              '</li>' +
									            '</ul>' +
					                  		'</div>' +
					                  		'<div class="span8" style="overflow: hidden;">' +
					                  			'<table class="table table-striped" style="margin-bottom: 0;">' +
					                  				'<thead></thead>' +
					                  				'<tbody>' +
					                  					'<tr>' +
					                  						'<th style="text-align: right;">Pages:</th>' +
					                  						'<td>' + book.pages + '</td>' +
					                  					'</tr>' +
					                  					'<tr>' +
					                  						'<th style="text-align: right;">Rating:</th>' +
					                  						'<td>' + book.rating.average + '</td>' +
					                  					'</tr>' +
					                  					'<tr>' +
					                  						'<th style="text-align: right;">ISBN:</th>' +
					                  						'<td>' + book.isbn10 + '</td>' +
					                  					'</tr>' +
					                  					'<tr>' +
					                  						'<th style="text-align: right;">Publisher:</th>' +
					                  						'<td style="white-space:nowrap; overflow: hidden;">' + book.publisher + '</td>' +
					                  					'</tr>' +
					                  				'</tbody>' +
					                  			'</table>' +
					                  			'<table class="table table-striped" style="margin-bottom: 0;">' +
					                  				'<thead></thead>' +
					                  				'<tbody>' +
					                  					'<tr>' +
					                  						'<td colspan="2">' +
					                  							'<div class="row-fluid">' +
					                  								'<div class="span6">' +
					                  									'<a href="javascript: void(0);" class="btn btn-primary btn-block btsr-choose-btn" data-title="' + book.title + '" data-pages="' + book.pages + '" data-isbn="' + book.isbn10 + '">Choose</a>' +
					                  								'</div>' +
					                  								'<div class="span6">' +
					                  									'<a href="javascript: void(0);" class="btn btn-warning btn-block btsr-reset-btn">Return</a>' +
					                  								'</div>' +
					                  							'</div>' +
					                  						'</td>' +
					                  					'</tr>' +
					                  				'</tbody>' +
					                  			'</table>' +
					                  		'</div>' +
					                  	'</div>' +
					                  	'<div class="row-fluid">' +
					                  		'<div class="span12">' +
					                  			'<table class="table table-striped table-condensed" style="margin-bottom: 0;">' +
					                  				'<thead></thead>' +
					                  				'<tbody>' +
					                  					'<tr>' +
					                  						'<th style="text-align: center;">Summary:</th>' +
					                  					'</tr>' +
					                  					'<tr>' +
					                  						'<td>' +
					                  							book.summary +
					                  						'</td>' +
					                  					'</tr>' +
					                  				'</tbody>' +
					                  			'</table>' +
					                  		'</div>' +
					                  	'</div>' +
					                  '</div>' +
					                '</div>' +
					            '</li>'
					        );
							if(!btsr_is_first) {
								btsr_html_array.push('</ul>');
							}
							btsr_is_first = !btsr_is_first;
					    }
					    $.unblockUI({
                            onUnblock: function(){ 
                                $("#book-title-search-result").html(btsr_html_array.join("")).slideDown("slow");
                            }
                        });
				    } else {
				    	btsr_html_array.push('<div class="span12" style="text-align: center;">No related book found, please change your title and research.</div>');
				    	$.unblockUI({
                            onUnblock: function(){ 
                                $("#book-title-search-result").html(btsr_html_array.join("")).slideDown("slow");
                                $.growlUI('Search Result', "No related book found");
                            }
                        });
				    	
				    }
				    
				});
			}
		});
		function btsrReset() {
			$("#book-title-search-result").slideUp("slow", function() {
				$(this).html("");
			});
		}
		// function to clear error tips
		function clearMyErrorTip(myself) {
            var myControlGroupParent = myself.parents(".control-group");
            if(myControlGroupParent.hasClass("error")) {
                myControlGroupParent.removeClass("error").find(".help-inline").text("");
            }
        }
		// clear error tip for controls
		$(document).on("input", "input, textarea", function() {
            clearMyErrorTip($(this));
        });
        $(document).on("change", "input, textarea", function() {
            clearMyErrorTip($(this));
        });
        // function to reset Reading Book Task forms
        function resetBookTaskForm() {
        	$("#read-book-task-form input[type=text]").val("").trigger("change");
        }
		$(document).on("click", ".btsr-reset-btn", function() {
			btsrReset();
		}).on("click", ".btsr-choose-btn", function() {
			var this_btn = $(this), title = this_btn.data("title"), isbn = this_btn.data("isbn"),
				page_num = this_btn.data("pages");
			$("#input-book-title").val(title);
			$("#input-isbn").val(isbn).trigger("change");
			$("#input-page-num").val(page_num).trigger("change");
			btsrReset();
		}).on("click", "#add-rb-task-btn", function() {
			
			var task_name_element = $("#input-task-name"), start_time_element = $("#input-start-time"),
				end_time_element = $("#input-end-time"), total_day_element = $("#input-total-day"),
				book_title_element = $("#input-book-title"), isbn_element = $("#input-isbn"),
				page_num_element = $("#input-page-num"), efficiency_element = $("#input-efficiency"),
				is_active_element = $("#input-is-active");
			var task_name = $.trim(task_name_element.val()), start_time = $.trim(start_time_element.val()),
				end_time = $.trim(end_time_element.val()), total_day = $.trim(total_day_element.val()),
				book_title = $.trim(book_title_element.val()), isbn = $.trim(isbn_element.val()),
				page_num = $.trim(page_num_element.val()), efficiency = $.trim(efficiency_element.val()),
				is_active = is_active_element.parent().hasClass("switch-on") == true ? "1" : "0";
			
			var is_validate = true;
			if(task_name == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(task_name_element, "Please input a task name");
				is_validate = false;
			}
			if(start_time == "" && end_time == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(start_time_element, "Please input a start date and an end date");
				is_validate = false;
			} else if(start_time == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(start_time_element, "Please input a start date");
				is_validate = false;
			} else if(end_time == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(end_time_element, "Please input an end date");
				is_validate = false;
			}
			if(start_time == "" || end_time == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_element, "Please input Date Range first");
				is_validate = false;
			} else if(total_day == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_element, "Please input days you plan to spend on this task");
				is_validate = false;
			} else if(isNaN(total_day)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_element, "Please input an integer");
				is_validate = false;
			} else if(parseInt(total_day) != parseFloat(total_day)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_element, "Please input an integer, not a float");
				is_validate = false;
			} else {
				total_day = parseInt(total_day);
				total_day_element.val(total_day).trigger("change");
				var date_range_days = IHL_TaskFormOprtObj.computeDateRangeDays(start_time, end_time);
				if(total_day < 1) {
					IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_element, "You must cost at least 1 day on this task");
					is_validate = false;
				} else if(total_day > date_range_days) {
					IHL_ErrorTipObj.showErrTipAndScroll2Ele(total_day_element, "You must cost no more than " + date_range_days + " days (on date range)");
					is_validate = false;
				}
			}
			if(book_title == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(book_title_element, "Please input a book title");
				is_validate = false;
			}
			if(isbn == "" && page_num == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(isbn_element, "Please input a book title and choose a book");
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(page_num_element, "Please input a book title and choose a book");
				is_validate = false;
			}
			if(efficiency == "") {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(efficiency_element, "Please input your efficiency");
				is_validate = false;
			} else if(isNaN(efficiency)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(efficiency_element, "Please input an integer");
				is_validate = false;
			} else if(parseInt(efficiency) != parseFloat(efficiency)) {
				IHL_ErrorTipObj.showErrTipAndScroll2Ele(efficiency_element, "Please input an integer, not a float");
				is_validate = false;
			} else {
				efficiency = parseInt(efficiency);
				efficiency_element.val(efficiency).trigger("change");
				if(efficiency < 1) {
					IHL_ErrorTipObj.showErrTipAndScroll2Ele(efficiency_element, "You must cost at least 1 minutes to finish 1 page");
					is_validate = false;
				}
			}

			if(is_validate) {
				showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Adding task ...<h1>");
				$.ajax({
					url: "bookTaskAction!create.action",
					data: {
						name: task_name,
						startTime: start_time,
						endTime: end_time,
						totalDay: total_day,
						type: "10",
						isActive: is_active,
						title: book_title,
						ISBN: isbn,
						pageNum: page_num,
						efficiency: efficiency
					},
					type: 'post',
					success: function(json_data) {
						var data = $.parseJSON(json_data);
						$.unblockUI({
                            onUnblock: function(){ 
                                if(data.statusCode == "200") {
									$.growlUI('Success', data.info);
									resetBookTaskForm();
								} else {
									$.growlUI('Error', data.info);
								}
                            }
                        });

					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						$.unblockUI({
                            onUnblock: function(){ 
                                $.growlUI('Error', textStatus);
                            }
                        });
					}
				});

			}

		}).on("click", "#reset-rb-task-btn", function() {
			resetBookTaskForm();
		});

	});
})(jQuery);