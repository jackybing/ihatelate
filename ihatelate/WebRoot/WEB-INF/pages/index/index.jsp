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
	<link rel="stylesheet" type="text/css" href="css/index/timeline/css/index-timeline.css" />
	<style type="text/css">
		.fb-mti-form { display: none; }
	</style>
  </head>
  
  <body>
  	<!-- Start: 刚进入时的遮罩层 页面初始化完毕后去掉 -->
	<div class="blockUI" style="display:none"></div>
	<div style="z-index: 1030; border: medium none; margin: 0px; padding: 0px; width: 100%; height: 100%; top: 0px; left: 0px; background-color: rgb(0, 0, 0); opacity: 0.6; cursor: wait; position: fixed;" class="blockUI blockOverlay"></div>
	<div style="z-index: 1041; position: fixed; padding: 15px; margin: 0px; width: 30%; top: 40%; left: 35%; text-align: center; color: rgb(255, 255, 255); border: medium none; background-color: rgb(0, 0, 0); cursor: wait; border-radius: 10px; opacity: 0.5;" class="blockUI blockMsg blockPage"><h1 style="font-size: 24px; line-height: 29px;">Initializing ... Please wait ...</h1></div>
	<!-- End  : 刚进入时的遮罩层 页面初始化完毕后去掉 -->
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
  								<div id="username-div" class="span8 tile-word" style="white-space:nowrap; overflow: hidden; line-height: 44px;">
		  							Retrieving Username ...
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
  		<div class="wrapper-container margin-bottom-20px">
  			<div id="index-wrapper" class="content-wrappers selected">
	  			<div class="row-fluid">
		  			<div class="span12 tile" style="">
		  				<div class="row-fluid tile-row tile-first-row">
		  					<div class="span12 tile-word">
		  						What's Next?
		  					</div>
		  				</div>
		  				<div class="row-fluid">
		  					<div class="span12">
		  						<!-- Start: the timeline -->
		  						<div id="index-timeline-container" class="main">
								  	<div class="history">
								    	<div class="history-date">
								    		<h2 class="first"><a id="index-tl-weekday" href="javascript: void(0);">2012年</a></h2>
								      		<ul id="index-tl-ul" style="display: none;">
								         		<!-- <li class="green">
								          			<h3>10.08<span>2012</span></h3>
								          			<dl>
								            			<dt>发布全新的极速浏览器6.0版本
															<span>升级极速内核到21.0；全新默认界面；新增小窗口播放功能</span>
														</dt>
								          			</dl>
								        		</li>
								
										       	<li>
										         	<h3>07.19<span>2012</span></h3>
										          	<dl>
										            	<dt>升级极速内核到20.0
															<span>HTML5支持度全球最好，达到469分，测试页面： </span>
														</dt>
										          	</dl>
										        </li>
								
										        <li>
										          	<h3>07.02<span>2012</span></h3>
										          	<dl>
										            	<dt>升级极速内核到19.0
															<span>支持网络摄像头，浏览器可直接访问摄像头</span>
														</dt>
										          	</dl>
										        </li>
								
										       	<li>
										          	<h3>06.27<span>2012</span></h3>
										          	<dl>
										            	<dt>发布国内首个HTML5实验室
															<span>大力推广HTML5</span>
														</dt>
										          	</dl>
										        </li>
										        <li>
										          	<h3>06.15<span>2012</span></h3>
										          	<dl>
										            	<dt>新增了下载文件前扫描下载链接安全性的功能</dt>
										          	</dl>
										        </li>
										        <li>
								          			<h3>06.05<span>2012</span></h3>
								          			<dl>
								            			<dt>W3C联盟首席执行官访华，首站访问360公司
														</dt>
								          			</dl>
								        		</li>
								        		<li>
								          			<h3>05.12<span>2012</span></h3>
								          			<dl>
								            			<dt>360受邀出席W3C联盟成员见面会议</dt>
								          			</dl>
								        		</li>
										        <li>
										          	<h3>05.11<span>2012</span></h3>
										          	<dl>
										            	<dt>升级极速内核到18.0
															<span>新增多用户使用浏览器的功能</span>
														</dt>
										          	</dl>
										        </li>
								        		<li>
								          			<h3>05.03<span>2012</span></h3>
								          			<dl>
								            			<dt>360极速浏览器用户数突破5000万，活跃用户超2000万
														</dt>
								          			</dl>
								        		</li>
								        		<li>
								          			<h3>03.08<span>2012</span></h3>
								          			<dl>
								            			<dt>升级极速内核到17.0，提升浏览器速度、增强安全性
															<span>新增HTTP管线化技术，大幅提升网页加载速度</span>
														</dt>
								          			</dl>
								        		</li>
								        		<li>
								          			<h3>01.29<span>2012</span></h3>
								          			<dl>
								            			<dt>国内率先加入W3C联盟HTML工作组，参与HTML5标准制定</span>
														</dt>
								          			</dl>
								        		</li> -->
								      		</ul>
								    	</div>
								  	</div>
								</div>
								<!-- End: the timeline -->
		  					</div>
		  				</div>
		  			</div>
		  		</div>
	  		</div>
		  	<div id="idle-calendar-wrapper" class="hide content-wrappers">
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
								              <li><a href="#exercise-tab-pane" data-toggle="tab">exercise</a></li>
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
								              
								                <div id="open-class-task-form" class="form-horizontal">
										            <div class="control-group">
										              <label class="control-label" for="open-class-task-name">Task Name:</label>
										              <div class="controls">
										                <input type="text" id="open-class-task-name" placeholder="Task Name" class="input-width-280px" />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="open-class-start-time">Date Range:</label>
										              <div class="controls">

										                <div class="input-daterange start-end-datepicker" style="display: inline-block">
														    <input type="text" id="open-class-start-time" style="cursor: pointer;" placeholder="Start Date" readonly class="input-width-128px" />
														    <span class="add-on">to</span>
														    <input type="text" id="open-class-end-time" style="cursor: pointer;" placeholder="End Date" readonly class="input-width-128px" />
														</div>

										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="open-class-total-day">Days to Spend:</label>
										              <div class="controls">
										                <input type="text" id="open-class-total-day" placeholder="Integer between 0 and date range" class="input-width-280px"/>
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="open-class-name">Class Name:</label>
										              <div class="controls">
										                <input type="text" id="open-class-name" placeholder="Class Name" class="input-width-280px" />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="open-class-amount">Amount:</label>
										              <div class="controls">
										                <input type="text" id="open-class-amount" placeholder="Number of Course Sessions" class="input-width-280px" />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="open-class-time-4-each-class">Time for Each Class:</label>
										              <div class="controls">
										                <input type="text" id="open-class-time-4-each-class" placeholder="Time for Each Class (in minutes)" class="input-width-280px" />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="open-class-remark">Remark:</label>
										              <div class="controls">
										              	<textarea id="open-class-remark" placeholder="Remark" class="input-width-280px" style="resize: none;"></textarea>
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="open-class-is-active">Active or not:</label>
										              <div class="controls">
										                <div class="make-switch" data-text-label="Click to change"  data-on-label="Active" data-off-label="InActive" data-on="success" data-off="danger">
														    <input id="open-class-is-active" type="checkbox" checked />
														</div>
										                <span class="help-inline"></span>
										              </div>
										            </div>

										            <div class="form-actions">
													  <button type="button" class="btn btn-primary" id="add-oc-task-btn">Add an Open Class Task</button>
													  <button type="button" class="btn btn-danger" id="reset-oc-task-btn" style="width: 78px;">Reset</button>
													</div>
										            
										        </div>
										        
								              </div>
								              <div class="tab-pane fade" id="exercise-tab-pane">
								              
								                <div id="exercise-task-form" class="form-horizontal">
										            <div class="control-group">
										              <label class="control-label" for="exercise-task-name">Task Name:</label>
										              <div class="controls">
										                <input type="text" id="exercise-task-name" placeholder="Task Name" class="input-width-280px" />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="exercise-start-time">Date Range:</label>
										              <div class="controls">

										                <div class="input-daterange start-end-datepicker" style="display: inline-block">
														    <input type="text" id="exercise-start-time" style="cursor: pointer;" placeholder="Start Date" readonly class="input-width-128px" />
														    <span class="add-on">to</span>
														    <input type="text" id="exercise-end-time" style="cursor: pointer;" placeholder="End Date" readonly class="input-width-128px" />
														</div>

										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="exercise-total-day">Days to Spend:</label>
										              <div class="controls">
										                <input type="text" id="exercise-total-day" placeholder="Integer between 0 and date range" class="input-width-280px"/>
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="exercise-name">Exercise Name:</label>
										              <div class="controls">
										                <input type="text" id="exercise-name" placeholder="Exercise Name" class="input-width-280px" />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="exercise-group-count">Group Count:</label>
										              <div class="controls">
										                <input type="text" id="exercise-group-count" placeholder="Number of Exercise Groups" class="input-width-280px" />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="exercise-time-4-each-group">Time for Each Group:</label>
										              <div class="controls">
										                <input type="text" id="exercise-time-4-each-group" placeholder="Time for Each Group (in minutes)" class="input-width-280px" />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="exercise-is-active">Active or not:</label>
										              <div class="controls">
										                <div class="make-switch" data-text-label="Click to change"  data-on-label="Active" data-off-label="InActive" data-on="success" data-off="danger">
														    <input id="exercise-is-active" type="checkbox" checked />
														</div>
										                <span class="help-inline"></span>
										              </div>
										            </div>

										            <div class="form-actions">
													  <button type="button" class="btn btn-primary" id="add-exercise-task-btn">Add an exercise Task</button>
													  <button type="button" class="btn btn-danger" id="reset-exercise-task-btn" style="width: 78px;">Reset</button>
													</div>
										            
										        </div>
										        
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
								              <li><a href="#university-tab-pane-default" data-toggle="tab">Apply for University (Default)</a></li>
								              <li><a href="#university-tab-pane-customize" data-toggle="tab">Apply for University (Customize)</a></li>
								          </ul>
								          <div id="quantifiable-tab-content" class="tab-content">
								              <div class="tab-pane fade in active" id="papers-tab-pane-default">
								              	
								              	<div id="papers-d-task-form" class="form-horizontal">
										            <div class="control-group">
										              <label class="control-label" for="papers-task-name-d">Task Name:</label>
										              <div class="controls">
										                <input type="text" id="papers-task-name-d" placeholder="Task Name" class="input-width-280px" />
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
										            
										            <div class="stages-pre-header">
										            	<div class="row-fluid">
										            		<div class="span6">
										            			Write Papers (Default) - Stages
										            		</div>
										            		<div class="span6" style="text-align: right;">
										            			<button data-item="papers" data-type="d" class="btn btn-info add-new-stage-beginning-btn">Add a New Stage at the Beginning</button>
										            		</div>
										            	</div>
										            </div>
										            <div class="well" style="padding-bottom: 0; padding-left: 0;">
										            	<div id="papers-stages-d">
										            	
										            	</div>
										            	<!-- <div>
										            		<div class="control-group">
															    <div class="controls">
															      <button data-target="#papers-stages-d" data-item="papers" data-type="d" class="btn btn-primary add-new-stage-btn">Add a New Stage</button>
															    </div>
															</div>
										            	</div> -->
										            </div>

										            <div class="form-actions">
													  <button type="button" class="btn btn-primary add-non-quant-task-btn" data-item="papers" data-type="d">Add a Writing Paper Task</button>
													  <button type="button" class="btn btn-danger reset-non-quant-task-btn" data-item="papers" data-type="d">Reset</button>
													</div>
										            
										        </div>
								              	
								              </div>
								              <div class="tab-pane fade in" id="papers-tab-pane-customize">
								                <div id="papers-c-task-form" class="form-horizontal">
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
										            
										            <div class="stages-pre-header">
										            	<div class="row-fluid">
										            		<div class="span6">
										            			Write Papers (Default) - Stages
										            		</div>
										            		<div class="span6" style="text-align: right;">
										            			<button data-item="papers" data-type="c" class="btn btn-info add-new-stage-beginning-btn">Add a New Stage at the Beginning</button>
										            		</div>
										            	</div>
										            </div>
										            <div id="papers-stages-c" class="well" style="padding-bottom: 0; padding-left: 0;" data-total-stage-num="1" data-task-id="-1">
										            	
										            	<div id="papers-stage-wrapper-c-1" data-step="1">
										            		<div class="control-group">
										            			<label class="control-label" for="papers-sname-c-1">Stage 1 Name:</label>
										            			<div class="controls">
										            				<input value="" type="text" id="papers-sname-c-1" placeholder="Stage 1 Name" class="input-width-280px" />
										            				<span class="help-inline"></span>
										            			</div>
										            		</div>
										            		<div class="control-group">
										            			<label class="control-label" for="papers-stime-c-1">Stage 1 Time:</label>
										            			<div class="controls">
										            				<input value="" type="text" id="papers-stime-c-1" placeholder="Stage 1 Time" class="input-width-280px" />
										            				<span class="help-inline"></span>
										            			</div>
										            		</div>
										            		<div class="control-group">
										            			<div class="controls">
										            				<button data-item="papers" data-type="c" data-wrapper-id="#papers-stage-wrapper-c-1" class="btn btn-danger delete-stage-btn disabled" disabled>Delete this Stage</button>
										            				<button data-item="papers" data-type="c" data-wrapper-id="#papers-stage-wrapper-c-1" class="btn btn-primary add-new-stage-btn margin-left-5px">Add a New Stage After Me</button>
										            			</div>
										            		</div>
										            		<div style="width: 98%; height: 1px; border-bottom: 1px solid rgb(210, 210, 210); margin: -10px 0 10px 19px;"></div>
										            	</div>
										            	
										            </div>

										            <div class="form-actions">
										            	<button type="button" class="btn btn-primary add-non-quant-task-btn" data-item="papers" data-type="c">Add a Writing Paper Task</button>
													  	<button type="button" class="btn btn-danger reset-non-quant-task-btn" data-item="papers" data-type="c">Reset</button>
													</div>
										            
										        </div>
								              </div>
								              <div class="tab-pane fade" id="university-tab-pane-default">
								              	<div id="university-d-task-form" class="form-horizontal">
										            <div class="control-group">
										              <label class="control-label" for="university-task-name-d">Task Name:</label>
										              <div class="controls">
										                <input type="text" id="university-task-name-d" placeholder="Task Name" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="university-start-time-d">Date Range:</label>
										              <div class="controls">

										                <div class="input-daterange start-end-datepicker" style="display: inline-block">
														    <input type="text" id="university-start-time-d" style="cursor: pointer;" placeholder="Start Date" readonly class="input-width-128px" />
														    <span class="add-on">to</span>
														    <input type="text" id="university-end-time-d" style="cursor: pointer;" placeholder="End Date" readonly class="input-width-128px" />
														</div>

										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="university-total-day-d">Days to Spend:</label>
										              <div class="controls">
										                <input type="text" id="university-total-day-d" placeholder="Integer between 0 and date range" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="university-name-d">University Name:</label>
										              <div class="controls">
										                <input type="text" id="university-name-d" placeholder="University Name" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="university-deadline-d">Deadline:</label>
										              <div class="controls">
										                <input type="text" id="university-deadline-d" placeholder="Deadline" class="input-width-280px start-end-datepicker" readonly />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="university-material-d">Material:</label>
										              <div class="controls">
										                <input type="text" id="university-material-d" placeholder="Material" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>

										            <div class="control-group">
										              <label class="control-label" for="university-is-active-d">Active or not:</label>
										              <div class="controls">
										                <div class="make-switch" data-text-label="Click to change"  data-on-label="Active" data-off-label="InActive" data-on="success" data-off="danger">
														    <input id="university-is-active-d" type="checkbox" checked />
														</div>
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="stages-pre-header">
										            	<div class="row-fluid">
										            		<div class="span6">
										            			Write Papers (Default) - Stages
										            		</div>
										            		<div class="span6" style="text-align: right;">
										            			<button data-item="university" data-type="d" class="btn btn-info add-new-stage-beginning-btn">Add a New Stage at the Beginning</button>
										            		</div>
										            	</div>
										            </div>
										            <div id="university-stages-d" class="well" style="padding-bottom: 0; padding-left: 0;">
										            
										            </div>

										            <div class="form-actions">
										            	<button type="button" class="btn btn-primary add-non-quant-u-task-btn" data-item="university" data-type="d">Add an Apply for University Task</button>
													  	<button type="button" class="btn btn-danger reset-non-quant-u-task-btn" data-item="university" data-type="d">Reset</button>
													</div>
										            
										        </div>
								              </div>
								              <div class="tab-pane fade" id="university-tab-pane-customize">
								                <div id="university-c-task-form" class="form-horizontal">
										            <div class="control-group">
										              <label class="control-label" for="university-task-name-c">Task Name:</label>
										              <div class="controls">
										                <input type="text" id="university-task-name-c" placeholder="Task Name" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="university-start-time-c">Date Range:</label>
										              <div class="controls">

										                <div class="input-daterange start-end-datepicker" style="display: inline-block">
														    <input type="text" id="university-start-time-c" style="cursor: pointer;" placeholder="Start Date" readonly class="input-width-128px" />
														    <span class="add-on">to</span>
														    <input type="text" id="university-end-time-c" style="cursor: pointer;" placeholder="End Date" readonly class="input-width-128px" />
														</div>

										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="university-total-day-c">Days to Spend:</label>
										              <div class="controls">
										                <input type="text" id="university-total-day-c" placeholder="Integer between 0 and date range" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="control-group">
										              <label class="control-label" for="university-name-c">University Name:</label>
										              <div class="controls">
										                <input type="text" id="university-name-c" placeholder="University Name" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="university-deadline-c">Deadline:</label>
										              <div class="controls">
										                <input type="text" id="university-deadline-c" placeholder="Deadline" class="input-width-280px start-end-datepicker" readonly />
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            <div class="control-group">
										              <label class="control-label" for="university-material-c">Material:</label>
										              <div class="controls">
										                <input type="text" id="university-material-c" placeholder="Material" class="input-width-280px">
										                <span class="help-inline"></span>
										              </div>
										            </div>

										            <div class="control-group">
										              <label class="control-label" for="university-is-active-c">Active or not:</label>
										              <div class="controls">
										                <div class="make-switch" data-text-label="Click to change"  data-on-label="Active" data-off-label="InActive" data-on="success" data-off="danger">
														    <input id="university-is-active-c" type="checkbox" checked />
														</div>
										                <span class="help-inline"></span>
										              </div>
										            </div>
										            
										            <div class="stages-pre-header">
										            	<div class="row-fluid">
										            		<div class="span6">
										            			Write Papers (Default) - Stages
										            		</div>
										            		<div class="span6" style="text-align: right;">
										            			<button data-item="university" data-type="c" class="btn btn-info add-new-stage-beginning-btn">Add a New Stage at the Beginning</button>
										            		</div>
										            	</div>
										            </div>
										            <div id="university-stages-c" class="well" style="padding-bottom: 0; padding-left: 0;" data-total-stage-num="1" data-task-id="-1">
										            	
										            	<div id="university-stage-wrapper-c-1" data-step="1">
										            		<div class="control-group">
										            			<label class="control-label" for="university-sname-c-1">Stage 1 Name:</label>
										            			<div class="controls">
										            				<input value="" type="text" id="university-sname-c-1" placeholder="Stage 1 Name" class="input-width-280px" />
										            				<span class="help-inline"></span>
										            			</div>
										            		</div>
										            		<div class="control-group">
										            			<label class="control-label" for="university-stime-c-1">Stage 1 Time:</label>
										            			<div class="controls">
										            				<input value="" type="text" id="university-stime-c-1" placeholder="Stage 1 Time" class="input-width-280px" />
										            				<span class="help-inline"></span>
										            			</div>
										            		</div>
										            		<div class="control-group">
										            			<div class="controls">
										            				<button data-item="university" data-type="c" data-wrapper-id="#university-stage-wrapper-c-1" class="btn btn-danger delete-stage-btn disabled" disabled>Delete this Stage</button>
										            				<button data-item="university" data-type="c" data-wrapper-id="#university-stage-wrapper-c-1" class="btn btn-primary add-new-stage-btn margin-left-5px">Add a New Stage After Me</button>
										            			</div>
										            		</div>
										            		<div style="width: 98%; height: 1px; border-bottom: 1px solid rgb(210, 210, 210); margin: -10px 0 10px 19px;"></div>
										            	</div>
										            	
										            </div>

													<div class="form-actions">
										            	<button type="button" class="btn btn-primary add-non-quant-u-task-btn" data-item="university" data-type="c">Add an Apply for University Task</button>
													  	<button type="button" class="btn btn-danger reset-non-quant-u-task-btn" data-item="university" data-type="c">Reset</button>
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
		  						<iframe class="span12" id="vs-iframe" frameborder="0" style="height: 470px;"></iframe>
		  					</div>
		  				</div>
		  			</div>
		  		</div>
		  		
	  		</div>
  		</div>
  		
  	</div>
	<!-- Put Javascripts here to make the page load faster -->
	<script type="text/javascript" src="tools/jquery/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="tools/bootstrap-switch/bootstrap-switch.min.js"></script>
	<script type="text/javascript" src="js/jquery.blockUI.js"></script>
	<script type="text/javascript" src="tools/bootstrap-datepicker/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="js/json2.js"></script>
	<!-- Scripts for this page -->
	<script	type="text/javascript">
		(function($) {
			$(function() {
				
			});
		})(jQuery);
	</script>
	<script type="text/javascript" src="js/pages/index/index-global.js"></script>
	<script type="text/javascript" src="js/pages/index/index-books.js"></script>
	<script type="text/javascript" src="js/pages/index/index-papers.js"></script>
	<script type="text/javascript" src="js/pages/index/index-open-class.js"></script>
	<script type="text/javascript" src="js/pages/index/index-exercise.js"></script>
	<script type="text/javascript" src="js/pages/index/index-university.js"></script>
	<!-- Start: Feedback Modal -->
	<div id="fb-paper-modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="fb-paper-modal-label" aria-hidden="true">
	  	<div class="modal-header">
	    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	    	<h3 id="fb-paper-modal-label">Choose your feedback option</h3>
	  	</div>
	  	<div class="modal-body">
	  		The time you feedback is longer than the unfinished time margin of current stage. Here are two choices for you:
	    	<ol>
	    		<li>Confirm finish current stage: Confirm the feedback time is equal to the unfinished time of current stage, feedback and finish current stage.</li>
	    		<li>Modify task information: Modify the task information to make the total time of current stage enough for you to finish current stage of the task.</li>
	    	</ol>
	  	</div>
	  	<div class="modal-footer">
	    	<button class="btn btn-success" id="fb-nq-paper-confirm">1. Confirm finish current stage</button>
	    	<button class="btn btn-primary" id="fb-nq-paper-modify">2. Modify task information</button>
	    	<button class="btn btn-danger" data-dismiss="modal" aria-hidden="true">Cancel</button>
	  	</div>
	</div>
	
	<div id="fb-modify-task-info" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="fb-modify-task-info-label" aria-hidden="true" style="width: 900px; margin-left: -450px;">
	  	<div class="modal-header">
	    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	    	<h3 id="fb-modify-task-info-label">Modify Task Information</h3>
	  	</div>
	  	<div class="modal-body">
	  		<!-- Start: 20 论文 -->
	  		<div id="fb-mti-form-paper" class="form-horizontal fb-mti-form">
	  			<div class="control-group">
	              	<label class="control-label" for="fb-mti-paper-task-name">Task Name:</label>
	              	<div class="controls">
	                	<input type="text" id="fb-mti-paper-task-name" placeholder="Task Name" class="input-width-280px">
	                	<span class="help-inline"></span>
	              	</div>
	            </div>
	            <div class="control-group">
	              	<label class="control-label" for="fb-mti-paper-start-time">Date Range:</label>
	              	<div class="controls">
		                <div class="input-daterange start-end-datepicker" style="display: inline-block">
						    <input type="text" id="fb-mti-paper-start-time" style="cursor: pointer;" placeholder="Start Date" readonly="" class="input-width-128px">
						    <span class="add-on">to</span>
						    <input type="text" id="fb-mti-paper-end-time" style="cursor: pointer;" placeholder="End Date" readonly="" class="input-width-128px">
						</div>
		                <span class="help-inline"></span>
	              	</div>
	            </div>
	            <div class="control-group">
	              	<label class="control-label" for="fb-mti-paper-total-day">Days to Spend:</label>
	              	<div class="controls">
	                	<input type="text" id="fb-mti-paper-total-day" placeholder="Integer between 0 and date range" class="input-width-280px">
	                	<span class="help-inline"></span>
	              	</div>
	            </div>
	            <div class="control-group">
	              	<label class="control-label" for="fb-mti-paper-name">Paper Name:</label>
	              	<div class="controls">
	                	<input type="text" id="fb-mti-paper-name" placeholder="Paper Name" class="input-width-280px">
	                	<span class="help-inline"></span>
	              	</div>
	            </div>
	            <div class="control-group">
	              	<label class="control-label" for="fb-mti-paper-is-active">Active or not:</label>
	              	<div class="controls">
	                	<div class="make-switch" data-text-label="Click to change"  data-on-label="Active" data-off-label="InActive" data-on="success" data-off="danger">
					    	<input id="fb-mti-paper-is-active" type="checkbox" checked />
						</div>
	                	<span class="help-inline"></span>
	              	</div>
	            </div>
	  			<div id="fb-mti-paper-stages" class="well" style="padding-bottom: 0; padding-left: 0;">
	  				<div id="fb-mti-paper-stage-wrapper-1" data-step="1">
	  					<div class="control-group">
	  						<label class="control-label" for="fb-mti-paper-sname-1">Stage 1 Name:</label>
	  						<div class="controls">
	  							<input value="吃饭" type="text" id="fb-mti-paper-sname-1" placeholder="Stage 1 Name" class="input-width-280px" />
	  							<span class="help-inline"></span>
	  						</div>
	  					</div>
	  					<div class="control-group">
	  						<label class="control-label" for="fb-mti-paper-stime-1">Stage 1 Time:</label>
	  						<div class="controls">
	  							<input value="" type="text" id="fb-mti-paper-stime-1" placeholder="Stage 1 Time" class="input-width-280px" />
	  							<span class="help-inline"></span>
	  						</div>
	  					</div>
	  				</div>
	  				
	  			</div>
	  		</div>
	  		<!-- End  : 20 论文 -->
	  		
	  	</div>
	  	<div class="modal-footer">
	    	<button class="btn btn-primary">Save Modifications</button>
	    	<button class="btn btn-danger" data-dismiss="modal" aria-hidden="true">Close</button>
	  	</div>
	</div>
	
	<script type='text/javascript' src='js/pages/taskInfo/ti-global.js'></script>
	<script type='text/javascript' src='js/pages/viewSchedule/fb-nonquant-choice.js'></script>
	<!-- End  : Feedback Modal -->
  </body>
</html>