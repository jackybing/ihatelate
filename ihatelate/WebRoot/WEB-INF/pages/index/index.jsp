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
		  							<button id="logout-btn" class="btn btn-primary"><i class="icon-signout"></i> Signout</button>
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
								    <div id="collapseOne" class="accordion-body collapse">
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

										                <div class="input-daterange start-end-datepicker" style="display: inline-block">
														    <input type="text" id="input-start-time" style="cursor: pointer;" placeholder="Start Date" readonly class="input-width-128px" />
														    <span class="add-on">to</span>
														    <input type="text" id="input-end-time" style="cursor: pointer;" placeholder="End Date" readonly class="input-width-128px" />
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
								              <li class="active"><a href="#papers-tab-pane-default" data-toggle="tab">Write Papers (Default)</a></li>
								              <li><a href="#papers-tab-pane-customize" data-toggle="tab">Write Papers (Customize)</a></li>
								              <li><a href="#college-tab-pane-default" data-toggle="tab">Apply for College (Default)</a></li>
								              <li><a href="#college-tab-pane-customize" data-toggle="tab">Apply for College (Customize)</a></li>
								          </ul>
								          <div id="quantifiable-tab-content" class="tab-content">
								              <div class="tab-pane fade in active" id="papers-tab-pane-default">
								              	
								              	<div id="papers-default-task-form" class="form-horizontal">
										            <div class="control-group">
										              <label class="control-label" for="papers-task-name-d">Task Name:</label>
										              <div class="controls">
										                <input type="text" id="papers-task-name-d" placeholder="Task Name" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="papers-start-time-d">Date Range:</label>
										              <div class="controls">

										                <div class="input-daterange start-end-datepicker" style="display: inline-block">
														    <input type="text" id="papers-start-time-d" style="cursor: pointer;" placeholder="Start Date" readonly class="input-width-128px" />
														    <span class="add-on">to</span>
														    <input type="text" id="papers-end-time-d" style="cursor: pointer;" placeholder="End Date" readonly class="input-width-128px" />
														</div>

										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="papers-total-day-d">Days to Spend:</label>
										              <div class="controls">
										                <input type="text" id="papers-total-day-d" placeholder="Integer between 0 and date range" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="papers-paper-name-d">Paper Name:</label>
										              <div class="controls">
										                <input type="text" id="papers-paper-name-d" placeholder="Paper Name" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>

										            <div class="control-group">
										              <label class="control-label" for="papers-is-active-d">Active or not:</label>
										              <div class="controls">
										                <div class="make-switch" data-text-label="Click to change"  data-on-label="Active" data-off-label="InActive" data-on="success" data-off="danger">
														    <input id="papers-is-active-d" type="checkbox" checked />
														</div>
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <pre style="margin-bottom: 0; webkit-border-radius: 0; -moz-border-radius: 0; border-radius: 0;">Write Papers (Default) - Stages</pre>
										            <div class="well" style="padding-bottom: 0; padding-left: 0;">
										            	<div id="papers-stages-d">
										            	
										            	</div>
										            	<div>
										            		<div class="control-group">
															    <div class="controls">
															      <button class="btn btn-primary">Add a New Stage</button>
															    </div>
															</div>
										            	</div>
										            </div>

										            <div class="form-actions">
													  <button type="button" class="btn btn-primary" id="add-paper-d-task-btn">Add a Writing Paper Task</button>
													  <button type="button" class="btn btn-danger" id="reset-paper-d-task-btn" style="width: 78px;">Reset</button>
													</div>
										            
										        </div>
								              	
								              </div>
								              <div class="tab-pane fade in" id="papers-tab-pane-customize">
								                <div id="papers-customize-task-form" class="form-horizontal">
										            <div class="control-group">
										              <label class="control-label" for="papers-task-name-c">Task Name:</label>
										              <div class="controls">
										                <input type="text" id="papers-task-name-c" placeholder="Task Name" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="papers-start-time-c">Date Range:</label>
										              <div class="controls">

										                <div class="input-daterange start-end-datepicker" style="display: inline-block">
														    <input type="text" id="papers-start-time-c" style="cursor: pointer;" placeholder="Start Date" readonly class="input-width-128px" />
														    <span class="add-on">to</span>
														    <input type="text" id="papers-end-time-c" style="cursor: pointer;" placeholder="End Date" readonly class="input-width-128px" />
														</div>

										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="papers-total-day-c">Days to Spend:</label>
										              <div class="controls">
										                <input type="text" id="papers-total-day-c" placeholder="Integer between 0 and date range" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="papers-paper-name-c">Paper Name:</label>
										              <div class="controls">
										                <input type="text" id="papers-paper-name-c" placeholder="Paper Name" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>

										            <div class="control-group">
										              <label class="control-label" for="papers-is-active-c">Active or not:</label>
										              <div class="controls">
										                <div class="make-switch" data-text-label="Click to change"  data-on-label="Active" data-off-label="InActive" data-on="success" data-off="danger">
														    <input id="papers-is-active-c" type="checkbox" checked />
														</div>
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <pre style="margin-bottom: 0; webkit-border-radius: 0; -moz-border-radius: 0; border-radius: 0;">Write Papers (Default) - Stages</pre>
										            <div id="papers-stages-c" class="well" style="padding-bottom: 0; padding-left: 0;">
										            
										            </div>

										            <div class="form-actions">
													  <button type="button" class="btn btn-primary" id="add-paper-c-task-btn">Add a Writing Paper Task</button>
													  <button type="button" class="btn btn-danger" id="reset-paper-c-task-btn" style="width: 78px;">Reset</button>
													</div>
										            
										        </div>
								              </div>
								              <div class="tab-pane fade" id="college-tab-pane-default">
								              	<div id="college-default-task-form" class="form-horizontal">
										            <div class="control-group">
										              <label class="control-label" for="college-task-name-d">Task Name:</label>
										              <div class="controls">
										                <input type="text" id="college-task-name-d" placeholder="Task Name" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="college-start-time-d">Date Range:</label>
										              <div class="controls">

										                <div class="input-daterange start-end-datepicker" style="display: inline-block">
														    <input type="text" id="college-start-time-d" style="cursor: pointer;" placeholder="Start Date" readonly class="input-width-128px" />
														    <span class="add-on">to</span>
														    <input type="text" id="college-end-time-d" style="cursor: pointer;" placeholder="End Date" readonly class="input-width-128px" />
														</div>

										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="college-total-day-d">Days to Spend:</label>
										              <div class="controls">
										                <input type="text" id="college-total-day-d" placeholder="Integer between 0 and date range" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="college-university-name-d">University Name:</label>
										              <div class="controls">
										                <input type="text" id="college-university-name-d" placeholder="University Name" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="college-deadline-d">Deadline:</label>
										              <div class="controls">
										                <input type="text" id="college-deadline-d" placeholder="Deadline" class="input-width-280px start-end-datepicker" readonly />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="college-material-d">Material:</label>
										              <div class="controls">
										                <input type="text" id="college-material-d" placeholder="Material" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>

										            <div class="control-group">
										              <label class="control-label" for="college-is-active-d">Active or not:</label>
										              <div class="controls">
										                <div class="make-switch" data-text-label="Click to change"  data-on-label="Active" data-off-label="InActive" data-on="success" data-off="danger">
														    <input id="college-is-active-d" type="checkbox" checked />
														</div>
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <pre style="margin-bottom: 0; webkit-border-radius: 0; -moz-border-radius: 0; border-radius: 0;">Apply for College (Default) - Stages</pre>
										            <div id="college-stages-d" class="well" style="padding-bottom: 0; padding-left: 0;">
										            
										            </div>

										            <div class="form-actions">
													  <button type="button" class="btn btn-primary" id="add-college-d-task-btn">Add an Apply for College Task</button>
													  <button type="button" class="btn btn-danger" id="reset-college-d-task-btn" style="width: 78px;">Reset</button>
													</div>
										            
										        </div>
								              </div>
								              <div class="tab-pane fade" id="college-tab-pane-customize">
								                <div id="college-customize-task-form" class="form-horizontal">
										            <div class="control-group">
										              <label class="control-label" for="college-task-name-c">Task Name:</label>
										              <div class="controls">
										                <input type="text" id="college-task-name-c" placeholder="Task Name" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="college-start-time-c">Date Range:</label>
										              <div class="controls">

										                <div class="input-daterange start-end-datepicker" style="display: inline-block">
														    <input type="text" id="college-start-time-c" style="cursor: pointer;" placeholder="Start Date" readonly class="input-width-128px" />
														    <span class="add-on">to</span>
														    <input type="text" id="college-end-time-c" style="cursor: pointer;" placeholder="End Date" readonly class="input-width-128px" />
														</div>

										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="college-total-day-c">Days to Spend:</label>
										              <div class="controls">
										                <input type="text" id="college-total-day-c" placeholder="Integer between 0 and date range" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="college-university-name-c">University Name:</label>
										              <div class="controls">
										                <input type="text" id="college-university-name-c" placeholder="University Name" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="college-deadline-c">Deadline:</label>
										              <div class="controls">
										                <input type="text" id="college-deadline-c" placeholder="Deadline" class="input-width-280px start-end-datepicker" readonly />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="college-material-c">Material:</label>
										              <div class="controls">
										                <input type="text" id="college-material-c" placeholder="Material" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>

										            <div class="control-group">
										              <label class="control-label" for="college-is-active-c">Active or not:</label>
										              <div class="controls">
										                <div class="make-switch" data-text-label="Click to change"  data-on-label="Active" data-off-label="InActive" data-on="success" data-off="danger">
														    <input id="college-is-active-c" type="checkbox" checked />
														</div>
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <pre style="margin-bottom: 0; webkit-border-radius: 0; -moz-border-radius: 0; border-radius: 0;">Apply for College (Default) - Stages</pre>
										            <div id="college-stages-c" class="well" style="padding-bottom: 0; padding-left: 0;">
										            
										            </div>

										            <div class="form-actions">
													  <button type="button" class="btn btn-primary" id="add-college-c-task-btn">Add an Apply for College Task</button>
													  <button type="button" class="btn btn-danger" id="reset-college-c-task-btn" style="width: 78px;">Reset</button>
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
		  		</div>
	  		</div>
	  		<div id="view-schedule-wrapper" class="hide content-wrappers margin-bottom-20px">
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
	<!-- Scripts for this page -->
	<script	type="text/javascript">
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
		var default_papers_template = {
			taskId: -1,
			stages: [{"1":"开题"},{"2":"写正文"},{"3":"答辩"}],
			initDefaultStages: function() {
				var taskId = this.taskId, stages = $.trim(this.stages);
				stages = stages.substring(1, stages.length - 1).split(",");
				var stages_html_array = [];
				var stage_step = 0;
				for(var stages_idx in stages) {
					var stages_obj = $.parseJSON(stages[stages_idx]);
					for(stage_step in stages_obj) {
						var stage_name = stages_obj[stage_step];
						var stage_html = '<div class="papers-stage-wrapper">' +
											 '<div class="control-group">' +
									              '<label class="control-label" for="papers-sname-d-' + stage_step + '">Stage ' + stage_step + ' Name:</label>' +
									              '<div class="controls">' +
										              '<input value="' + stage_name + '" type="text" id="papers-sname-d-' + stage_step + '" placeholder="Stage ' + stage_step + ' Name" class="input-width-280px">' +
										              '<span class="help-inline"></span>' +
									              '</div>' +
								             '</div>' +
								             '<div class="control-group">' +
									              '<label class="control-label" for="papers-stime-d-' + stage_step + '">Stage ' + stage_step + ' Time:</label>' +
									              '<div class="controls">' +
										              '<input type="text" id="papers-stime-d-' + stage_step + '" placeholder="Stage ' + stage_step + ' Time" class="input-width-280px">' +
										              '<span class="help-inline"></span>' +
									              '</div>' +
								             '</div>' +
								             '<div class="control-group">' +
									              '<div class="controls">' +
										              '<button class="btn btn-danger">Delete this Stage</button>' +
									              '</div>' +
								             '</div>' +
								             '<div style="width: 98%; height: 1px; border-bottom: 1px solid rgb(210, 210, 210); margin: -10px 0 10px 19px;"></div>' +
								         '</div>';
						stages_html_array.push(stage_html);
					}
						
				}
				$("#papers-stages-d").data("taskId", this.taskId).data("totalSteps", stage_step).html(stages_html_array.join(""));
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
				var is_validate = this.iframes_idle && this.iframes_schedule && this.template_papers_default;
				if(is_validate) {
					IHL_BlockMsgObj.unblockMsg(/*function() {
						
						if(callback_func && typeof(callback_func) == "function") {
							callback_func();
						} else {
							$.growlUI('Initializing finished', "Now you can start using I hate late! Have fun!");
						}
						
					}*/);
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
							console.log(data);
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
	</script>
	<script type="text/javascript" src="js/pages/index-books.js"></script>
	<script type="text/javascript" src="js/pages/index-papers-default.js"></script>
  </body>
</html>