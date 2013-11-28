<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>I Hate Late - Index</title>
    
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bs_4_ihl.css" />
    <link rel="stylesheet" type="text/css" href="tools/bootstrap-switch/bootstrap-switch.css" />
    <link rel="stylesheet" type="text/css" href="tools/bootstrap-datepicker/datepicker.css" />
    <link rel="stylesheet" type="text/css" href="bootstrap/css/font-awesome.min.css" />
	<!--[if IE 7]>
	<link rel="stylesheet" type="text/css" href="bootstrap/css/font-awesome-ie7.min.css" />
	<![endif]-->
	<link rel="stylesheet" type="text/css" href="bootstrap/css/buttons.css" />
	<link rel="stylesheet" type="text/css" href="css/index/index.css" />
	<style type="text/css">
		button.top-right-btns { height: 64px; font-size: 60px; padding: 0 10px; }
		.margin-bottom-20px { margin-bottom: 20px; }
		.input-width-280px { width: 280px; }
		.input-width-128px { width: 127px; }
	</style>
  </head>
  
  <body>
  	<div class="container">
  		<div class="row-fluid margin-bottom-20px">
  			<div class="span7">
  				<div class="tile span12" style="max-width: 490px;">
  					<div class="row-fluid tile-row">
  						<div class="span2 tile-icon" style="font-size: 84px;">
  							<i class="icon-user"></i>
  						</div>
  						<div class="span10">
  							<div class="row-fluid tile-first-row">
  								<div class="span8 tile-word" style="white-space:nowrap; overflow: hidden; line-height: 44px;">
		  							Payne Pandaroid Wang
		  						</div>
		  						<div class="span4 tile-icon" style="color: rgb(143, 143, 143); text-align: right;">
		  							<button id="lang-change-btn" class="button button-rounded button-flat" style="font-size: 20px; padding: 0 10px;" data-toggle="tooltip" title="Change language">
		  								En
		  							</button>
		  							<button id="account-setting-btn" class="button button-rounded button-flat" style="font-size: 28px; padding: 0 10px;" data-toggle="tooltip" title="Account settings">
		  								<i class="icon-cog"></i>
		  							</button>
		  						</div>
  							</div>
  							<div class="row-fluid tile-row" style="color: rgb(143, 143, 143);">
		  						<div class="span8 tile-word" style="line-height: 31px;">
		  							<span style="font-size: 24px;"><i class="icon-time"></i></span>
		  							<span id="time-display-span" style="margin-left: 10px; font-family: Georgia, 'Times New Roman', Times, serif;">2013-11-17 00:48:27</span>
		  						</div>
		  						<div class="span4 tile-word" style="text-align: right;">
		  							<button class="btn btn-primary"><i class="icon-signout"></i> Signout</button>
		  						</div>
		  					</div>
  						</div>
	  						
  					</div>
	  					
  				</div>
  			</div>
  			<div class="span5" style="text-align: right;">
  				<div class="pull-right" style="font-size: 50px; line-height: 55px; color: rgb(98, 98, 98);">
  					<div class="row-fluid margin-bottom-20px">
	  					<div class="span12" style="text-align: right;">
	  						<button class="button button-rounded button-flat top-right-btns glow" data-toggle="tooltip" title="Index page" id="index-page-btn" data-target="#index-wrapper">
  								<i class="icon-info-sign"></i>
  							</button>
  							<button class="button button-rounded button-flat top-right-btns" data-toggle="tooltip" title="Idle time calendar" id="idle-time-calendar-btn" data-target="#idle-calendar-wrapper" data-iframe-id="#itc-iframe" data-iframe-src="jumpAction!idleTimeCalendar">
  								<i class="icon-calendar"></i>
  							</button>
	  						<button class="button button-rounded button-flat top-right-btns" data-toggle="tooltip" title="Add a task" id="add-a-task-btn" data-target="#add-task-wrapper">
  								<i class="icon-plus-sign-alt"></i>
  							</button>
	  						
	  						<button class="button button-rounded button-flat top-right-btns" data-toggle="tooltip" title="View schedule" id="view-schedule-btn" data-target="#view-schedule-wrapper" data-iframe-id="#vs-iframe" data-iframe-src="jumpAction!viewSchedule">
  								<i class="icon-tasks"></i>
  							</button>
	  						
	  					</div>
	  				</div>
	  				
  				</div>
	  				
  			</div>
  		</div>
  		<div class="wrapper-container">
  			<div id="index-wrapper" class="content-wrappers selected">
	  			<div class="row-fluid">
		  			<div class="span12 tile" style="">
		  				<div class="row-fluid tile-row tile-first-row">
		  					<div class="span12 tile-word">
		  						What's Next?
		  					</div>
		  				</div>
		  			</div>
		  		</div>
	  		</div>
		  	<div id="idle-calendar-wrapper" class="hide content-wrappers margin-bottom-20px">
	  			<div class="row-fluid">
		  			<div class="span12 tile" style="">
		  				<div class="row-fluid tile-row tile-first-row" style="margin-bottom: 0;">
		  					<div class="span6 tile-word">
		  						Set your idle time calendar here.
		  					</div>
		  					<div class="span6" style="text-align: right;">
		  						<button id="idle-calendar-save-btn" class="btn btn-primary">Save Calendar Settings</button>
		  					</div>
		  				</div>
		  				<div class="row-fluid">
		  					<div class="span12">
		  						<iframe id="itc-iframe" class="span12" frameborder="0" style="height: 1974px;"></iframe>
		  					</div>
		  				</div>
		  			</div>
		  		</div>
	  		</div>
	  		<div id="add-task-wrapper" class="hide content-wrappers margin-bottom-20px">
	  			<div class="row-fluid">
		  			<div class="span12 tile" style="">
		  				<div class="row-fluid tile-row tile-first-row">
		  					<div class="span12 tile-word">
		  						Add a task
		  					</div>
		  				</div>
		  				<div class="row-fluid" style="padding-top: 15px;">
		  					<div class="span12">
		  						
		  						<div class="accordion" id="quantify-or-not-accordion">
								  <div class="accordion-group">
								    <div class="accordion-heading">
								      <a class="accordion-toggle" data-toggle="collapse" data-parent="#quantify-or-not-accordion" href="#collapseOne">
								        Quantifiable Tasks
								      </a>
								    </div>
								    <div id="collapseOne" class="accordion-body collapse in">
								      <div class="accordion-inner">
								      	
								          <ul id="quantifiable-tab" class="nav nav-tabs">
								              <li class="active"><a href="#reading-tab-pane" data-toggle="tab">Reading Books</a></li>
								              <li><a href="#open-class-tab-pane" data-toggle="tab">Open Class</a></li>
								              <li><a href="#fitness-tab-pane" data-toggle="tab">Fitness</a></li>
								          </ul>
								          <div id="quantifiable-tab-content" class="tab-content">
								              <div class="tab-pane fade in active" id="reading-tab-pane">
								              	<div class="row-fluid hide" id="book-title-search-result">

								              	</div>
								              	<div id="read-book-task-form" class="form-horizontal">
										            <div class="control-group">
										              <label class="control-label" for="input-task-name">Task Name:</label>
										              <div class="controls">
										                <input type="text" id="input-task-name" placeholder="Task Name" class="input-width-280px" />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="input-start-time">Date Range:</label>
										              <div class="controls">

										                <div class="input-daterange" id="start-end-datepicker" style="display: inline-block">
														    <input type="text" id="input-start-time" name="input-start-time" style="cursor: pointer;" placeholder="Start Date" readonly class="input-width-128px" />
														    <span class="add-on">to</span>
														    <input type="text" id="input-end-time" name="input-end-time" style="cursor: pointer;" placeholder="End Date" readonly class="input-width-128px" />
														</div>

										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="input-total-day">Days to Spend:</label>
										              <div class="controls">
										                <input type="text" id="input-total-day" placeholder="Integer between 0 and date range" class="input-width-280px"/>
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="input-book-title">Book Title:</label>
										              <div class="controls">
										                <div class="form-search" style="display: inline-block;">
										                	<div class="input-append">
															    <input type="text" id="input-book-title" placeholder="Book Title" class="search-query">
															    <button type="button" id="search-book-title-btn" class="btn">Search</button>
															</div>
										                </div>		
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="input-isbn">ISBN:</label>
										              <div class="controls">
										                <input type="text" id="input-isbn" placeholder="AutoFill on the choosed book" readonly class="input-width-280px" />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="input-page-num">Number of Pages:</label>
										              <div class="controls">
										                <input type="text" id="input-page-num" placeholder="AutoFill on the choosed book" readonly class="input-width-280px" />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="input-efficiency">Efficiency:</label>
										              <div class="controls">
										                <input type="text" id="input-efficiency" placeholder="Minutes for finishing 1 page" class="input-width-280px" />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="input-is-active">Active or not:</label>
										              <div class="controls">
										                <div class="make-switch" data-text-label="Click to change"  data-on-label="Active" data-off-label="InActive" data-on="success" data-off="danger">
														    <input id="input-is-active" type="checkbox" checked />
														</div>
										                <span class="help-inline"></span>
										              </div>
										            </div>

										            <div class="form-actions">
													  <button type="button" class="btn btn-primary" id="add-rb-task-btn">Add a Reading Book Task</button>
													  <button type="button" class="btn btn-danger" id="reset-rb-task-btn" style="width: 78px;">Reset</button>
													</div>
										            
										        </div>
								              </div>
								              <div class="tab-pane fade" id="open-class-tab-pane">
								                <p>Open class fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
								              </div>
								              <div class="tab-pane fade" id="fitness-tab-pane">
								                <p>Fitness fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
								              </div>
								          </div>
								      	
								      </div>
								    </div>
								  </div>
								  <div class="accordion-group">
								    <div class="accordion-heading">
								      <a class="accordion-toggle" data-toggle="collapse" data-parent="#quantify-or-not-accordion" href="#collapseTwo">
								        Non-quantifiable Tasks
								      </a>
								    </div>
								    <div id="collapseTwo" class="accordion-body collapse">
								      <div class="accordion-inner">
								      	  <ul id="non-quantifiable-tab" class="nav nav-tabs">
								              <li class="active"><a href="#papers-tab-pane-default" data-toggle="tab">Write papers (default)</a></li>
								              <li class="active"><a href="#papers-tab-pane-customize" data-toggle="tab">Write papers (customize)</a></li>
								              <li><a href="#college-tab-pane-default" data-toggle="tab">Apply for College (default)</a></li>
								              <li><a href="#college-tab-pane-customize" data-toggle="tab">Apply for College (customize)</a></li>
								          </ul>
								          <div id="quantifiable-tab-content" class="tab-content">
								              <div class="tab-pane fade in active" id="papers-tab-pane-default">
								                <p>Write papers (default) you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
								              </div>
								              <div class="tab-pane fade in active" id="papers-tab-pane-customize">
								                <p>Write papers (customize) you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
								              </div>
								              <div class="tab-pane fade" id="college-tab-pane-default">
								                <p>Apply for college (default) fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
								              </div>
								              <div class="tab-pane fade" id="college-tab-pane-customize">
								                <p>Apply for college (customize) fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
								              </div>
								          </div>
								      </div>
								    </div>
								  </div>
								</div>
		  						
		  					</div>
		  				</div>
		  			</div>
		  		</div>
	  		</div>
	  		<div id="view-schedule-wrapper" class="hide content-wrappers">
	  			<div class="row-fluid">
		  			<div class="span12 tile" style="">
		  				<div class="row-fluid tile-row tile-first-row">
		  					<div class="span12 tile-word">
		  						View your schedule
		  					</div>
		  				</div>
		  				<div class="row-fluid">
		  					<div class="span12">
		  						<iframe class="span12" id="vs-iframe" frameborder="0" style="height: 1974px;"></iframe>
		  					</div>
		  				</div>
		  			</div>
		  		</div>
		  		
	  		</div>
  		</div>
  		
  	</div>
	<!-- Put Javascripts here to make the page load faster -->
	<script type="text/javascript" src="js/lib/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="tools/bootstrap-switch/bootstrap-switch.min.js"></script>
	<script type="text/javascript" src="js/jquery.blockUI.js"></script>
	<script type="text/javascript" src="tools/bootstrap-datepicker/bootstrap-datepicker.js"></script>
	<script	type="text/javascript">
		function showGrowlMsg(title, msg) {
			$.growlUI(title, msg);
		}
		(function($) {
			$(function() {
				// init tooltips
				$('#account-setting-btn, #lang-change-btn, .top-right-btns').tooltip({
					placement: 'bottom'
				});
				// when #index-page-btn clicked
				$(".top-right-btns").on("click", function() {
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
								$(iframe_id_str).attr("src", iframe_src);
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
				$("#idle-calendar-save-btn").on("click", function() {
					showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Saving ...<h1>");
					var childFrameContents = $("#itc-iframe").contents();
					var free_time_array = [];
					for(var tmp_tag_shift = 1; tmp_tag_shift <= 7; tmp_tag_shift++) {
						// console.log("tmp_tag_shift: " + tmp_tag_shift);
						var my_date = new Date();
						var todayTag = my_date.getDay(), curTodayTag = todayTag == 0 ? 7 : todayTag;
						var tag_4_this_day = curTodayTag + tmp_tag_shift - 1;
						tag_4_this_day = tag_4_this_day > 7 ? tag_4_this_day - 7 : tag_4_this_day;
						// console.log("tag_4_this_day: " + tag_4_this_day);
						childFrameContents.find(".wc-day-column.day-" + tmp_tag_shift).find(".wc-time.ui-corner-all").each(function() {
							var this_wc_time = $(this);
							// console.log(this_wc_time.text());
							var startTime = this_wc_time.attr("start-time"), endTime = this_wc_time.attr("end-time");
							// console.log("startTime: " + startTime + "; " + "endTime: " + endTime);
							free_time_unit = '{"tag":"' + tag_4_this_day + '","day":"' + computeDay(tag_4_this_day) + '","startTime":"' + startTime + '","endTime":"' + endTime + '"}';
							free_time_array.push(free_time_unit);
						});
					}
					var free_time_str = '[' + free_time_array.join(",") + ']';
					// console.log(free_time_str);
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
					$('#start-end-datepicker').datepicker({
					    format: "yyyy-mm-dd",
					    startDate: start_date,
					    autoclose: true,
					    todayHighlight: true
					});
				}
				initRangeDatepicker();
				// 从豆瓣获取书籍信息
				$("#search-book-title-btn").on("click", function() {
					var book_title_element = $("#input-book-title"), book_title = $.trim(book_title_element.val());
					if(book_title == "") {
						showErrorTip(book_title_element, "Please input a book title");
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
				// show error tip for controls
				function showErrorTip(element, msg) {
					element.parents(".control-group").addClass("error").find(".help-inline").text(msg);
				}
				// function to clear error tips
				function clearMyErrorTip(myself) {
		            var myControlGroupParent = myself.parents(".control-group");
		            if(myControlGroupParent.hasClass("error")) {
		                myControlGroupParent.removeClass("error").find(".help-inline").text("");
		            }
		        }
				// clear error tip for controls
				$("input").on("input", function() {
		            clearMyErrorTip($(this));
		        });
		        $("input").on("change", function() {
		            clearMyErrorTip($(this));
		        });
		        // function to compute date range days
		        function computeDateRangeDays(sDate1, sDate2) {	//sDate1和sDate2是2002-12-18格式 
		        	var aDate, oDate1, oDate2, iDays  
			        aDate = sDate1.split("-")  
			        oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])  //转换为12-18-2002格式 
			        aDate = sDate2.split("-") 
			        oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) 
			        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24)  //把相差的毫秒数转换为天数 
			        return iDays 
		        }
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
						showErrorTip(task_name_element, "Please input a task name");
						is_validate = false;
					}
					if(start_time == "" && end_time == "") {
						showErrorTip(start_time_element, "Please input a start date and an end date");
						is_validate = false;
					} else if(start_time == "") {
						showErrorTip(start_time_element, "Please input a start date");
						is_validate = false;
					} else if(end_time == "") {
						showErrorTip(end_time_element, "Please input an end date");
						is_validate = false;
					}
					if(start_time == "" || end_time == "") {
						showErrorTip(total_day_element, "Please input Date Range first");
						is_validate = false;
					} else if(total_day == "") {
						showErrorTip(total_day_element, "Please input days you plan to spend on this task");
						is_validate = false;
					} else if(isNaN(total_day)) {
						showErrorTip(total_day_element, "Please input an integer");
						is_validate = false;
					} else if(parseInt(total_day) != parseFloat(total_day)) {
						showErrorTip(total_day_element, "Please input an integer, not a float");
						is_validate = false;
					} else {
						total_day = parseInt(total_day);
						total_day_element.val(total_day).trigger("change");
						var date_range_days = computeDateRangeDays(start_time, end_time);
						if(total_day < 1) {
							showErrorTip(total_day_element, "You must cost at least 1 day on this task");
							is_validate = false;
						} else if(total_day > date_range_days) {
							showErrorTip(total_day_element, "You must cost no more than " + date_range_days + " days (on date range)");
							is_validate = false;
						}
					}
					if(book_title == "") {
						showErrorTip(book_title_element, "Please input a book title");
						is_validate = false;
					}
					if(isbn == "" && page_num == "") {
						showErrorTip(isbn_element, "Please input a book title and choose a book");
						showErrorTip(page_num_element, "Please input a book title and choose a book");
						is_validate = false;
					}
					if(efficiency == "") {
						showErrorTip(efficiency_element, "Please input your efficiency");
						is_validate = false;
					} else if(isNaN(efficiency)) {
						showErrorTip(efficiency_element, "Please input an integer");
						is_validate = false;
					} else if(parseInt(efficiency) != parseFloat(efficiency)) {
						showErrorTip(efficiency_element, "Please input an integer, not a float");
						is_validate = false;
					} else {
						efficiency = parseInt(efficiency);
						efficiency_element.val(efficiency).trigger("change");
						if(efficiency < 1) {
							showErrorTip(efficiency_element, "You must cost at least 1 minutes to finish 1 page");
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
	</script>
  </body>
</html>