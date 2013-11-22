<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>I Hate Late - Index</title>
    
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bs_4_ihl.css" />
    <link rel="stylesheet" type="text/css" href="bootstrap/css/font-awesome.min.css" />
	<!--[if IE 7]>
	<link rel="stylesheet" type="text/css" href="bootstrap/css/font-awesome-ie7.min.css" />
	<![endif]-->
	<link rel="stylesheet" type="text/css" href="bootstrap/css/buttons.css" />
	<link rel="stylesheet" type="text/css" href="css/index/index.css" />
	<style type="text/css">
		button.top-right-btns { height: 64px; font-size: 60px; padding: 0 10px; }
		.margin-bottom-20px { margin-bottom: 20px; }
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
	  		<div id="add-task-wrapper" class="hide content-wrappers">
	  			<div class="row-fluid">
		  			<div class="span12 tile" style="">
		  				<div class="row-fluid tile-row tile-first-row">
		  					<div class="span12 tile-word">
		  						Add a task
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
	<script type="text/javascript" src="js/jquery.blockUI.js"></script>
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
				// init iframe srcs
				/*function initIframeSrcs() {
					$("#itc-iframe").attr("src", "jumpAction!idleTimeCalendar");
					$("#vs-iframe").attr("src", "jumpAction!viewSchedule");
				}
				initIframeSrcs();*/
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
							// console.log(data);
							/*if(data.status == "200") {
								
							} else {
								
							}*/
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
			});
		})(jQuery);
	</script>
  </body>
</html>