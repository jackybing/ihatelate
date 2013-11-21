<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>I Hate Late - View My Schedule</title>
    
    <link rel='stylesheet' type='text/css' href='tools/week-calendar/css/reset.css' />
    
    <link type="text/css" href="tools/jquery-ui-bootstrap/css/custom-theme/jquery-ui-1.10.0.custom.css" rel="stylesheet" />
    <!--[if lt IE 9]>
    <link rel="stylesheet" type="text/css" href="tools/jquery-ui-bootstrap/css/custom-theme/jquery.ui.1.10.0.ie.css"/>
    <![endif]-->
    
	<!-- <link rel='stylesheet' type='text/css' href='tools/jquery-ui/1.7.2/themes/start/jquery-ui.css' /> -->
	<link rel='stylesheet' type='text/css' href='tools/week-calendar/css/jquery.weekcalendar.css' />
	<link rel='stylesheet' type='text/css' href='tools/week-calendar/css/demo.css' />
	<style type="text/css">
		.container-fluid { padding: 0; }
		td.wc-day-column-header { font-size: 0.9em; }
		.wc-header .wc-scrollbar-shim { width: 0; }
		.wc-business-hours { font-size: 1.05em; }
		.wc-header { border-top: 0; }
		
	</style>
  </head>
  
  <body>
  	<div class="container-fluid">
  		<div class="row-fluid">
  			<div class="span12">
  				<div id='calendar'></div>
				<div id="event_edit_container">
					<input type="hidden" />
					<ul style="padding: 0 11px;">
						<li>
							<span>日期：</span><span class="date_holder"></span> 
						</li>
						<li>
							<label for="start">开始时间：</label><select name="start"><option value="">Select Start Time</option></select>
						</li>
						<li>
							<label for="end">结束时间：</label><select name="end"><option value="">Select End Time</option></select>
						</li>
						<li>
							<label for="title">主题：</label><input type="text" name="title" />
						</li>
						<li>
							<label for="body">内容：</label><textarea name="body" style="resize: none;"></textarea>
						</li>
					</ul>
				</div>
				
  			</div>
  		</div>
  	</div>
	<!-- Put Javascripts here to make the page load faster -->
	<script type='text/javascript' src='tools/jquery/jquery-1.3.2.min.js'></script>
	<script type='text/javascript' src='tools/jquery-ui/1.7.2/jquery-ui.min.js'></script>
	<script type='text/javascript' src='tools/week-calendar/jquery.weekcalendar.js'></script>
	<script type='text/javascript' src='tools/week-calendar/viewSchedule.js'></script>
	<script	type="text/javascript">
		(function($) {
			$(function() {
				
			});
		})(jQuery);
	</script>
  </body>
</html>