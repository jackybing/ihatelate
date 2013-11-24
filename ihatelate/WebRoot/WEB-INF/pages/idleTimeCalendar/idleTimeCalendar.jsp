<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>I Hate Late - Idle Time Calendar</title>
    
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
		td.wc-day-column-header { font-size: 0.8em; }
		.wc-header .wc-scrollbar-shim { width: 0; }
		.wc-business-hours { font-size: 1.05em; }
		.wc-header { border-top: 0; }
		.wc-cal-event .wc-time { background-color: rgb(43, 208, 69); border: 1px solid rgb(34, 192, 27); }
		.wc-cal-event { background-color: rgb(78, 223, 107); }
		.ui-dialog .ui-dialog-title { margin: 0; padding: 0; }
		.ui-dialog .ui-dialog-buttonpane { margin: 0 }
		.ui-dialog .ui-dialog-titlebar-close span { margin-top: 9px; }
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
							<span>Date: </span><span class="date_holder"></span> 
						</li>
						<li>
							<label for="start">Start Time: </label><select name="start"><option value="">Select Start Time</option></select>
						</li>
						<li>
							<label for="end">End Time:</label><select name="end"><option value="">Select End Time</option></select>
						</li>
						<li>
							<label for="title">Title: </label><input type="text" name="title" style="height: 30px;" readonly value="空闲时间" />
						</li>
						<li>
							<label for="body">Description: </label><textarea name="body" style="resize: none;"></textarea>
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
	<script type='text/javascript' src='tools/week-calendar/idleTimeCalendar.js'></script>
	<script	type="text/javascript">
		(function($) {
			$(function() {
				
			});
		})(jQuery);
	</script>
  </body>
</html>