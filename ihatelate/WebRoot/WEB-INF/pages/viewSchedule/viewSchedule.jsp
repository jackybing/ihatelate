<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>I Hate Late - View My Schedule</title>
    
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bs_4_ihl.css" />
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
		.ui-dialog .ui-dialog-title { margin: 0; padding: 0; }
		.ui-dialog .ui-dialog-buttonpane { margin: 0 }
		.ui-dialog .ui-dialog-titlebar-close span { margin-top: 9px; }
		.table td.detail-info-table-td-1 { text-align: right; width: 130px; font-weight: bold; }
		#vs-fb-div .form-horizontal label.control-label { padding-top: 5px; margin-top: 0; }
		#vs-fb-div .form-horizontal .control-group { margin-bottom: 10px; }
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
							<label for="end">End Time: </label><select name="end"><option value="">Select End Time</option></select>
						</li>
						<li>
							<label for="title">Title: </label><input type="text" name="title" />
						</li>
						<li>
							<label for="body">Description: </label><textarea name="body" style="resize: none;"></textarea>
						</li>
					</ul>
				</div>
				
  			</div>
  		</div>
  	</div>
  	<!-- Start: 201311241702 点击后展示任务信息的dialog -->
	<div id="detail-info-dialog" title="View Task Infomation" style="display: none;">
		<table id="detail-info-table" class="table table-striped table-hover table-condensed" style="margin-bottom: 0;">
			<thead>
			
			</thead>
			<tbody>
				
			</tbody>
		</table>
		<div id="vs-fb-div" class="well" style="margin-bottom: 3px; padding-bottom: 8px;">
			
		</div>
		
	</div>
	<input id="ihl-calendar-refresh" type="hidden" />
	<!-- End  : 201311241702 点击后展示任务信息的dialog -->
	<!-- Put Javascripts here to make the page load faster -->
	<script type='text/javascript' src='tools/jquery/jquery-1.3.2.min.js'></script>
	<script type='text/javascript' src='tools/jquery-ui/1.7.2/jquery-ui.min.js'></script>
	<script type='text/javascript' src='tools/week-calendar/jquery.weekcalendar.vs.js'></script>
	<script type='text/javascript' src='tools/week-calendar/viewSchedule.js'></script>
	<script	type="text/javascript">
		(function($) {
			$(function() {
				
			});
		})(jQuery);
	</script>
	<script type='text/javascript' src='js/pages/viewSchedule/feedback.js'></script>
  </body>
</html>