<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>I Hate Late - Signin</title>
    
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bs_4_ihl.css" />
    <link rel="stylesheet" type="text/css" href="styles/main.css" />
	<style type="text/css">
		
	</style>
	
	<link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
    <link rel="Bookmark" href="favicon.ico" />
  </head>
  
  <body>
  	<div class="v-canvas">
		<div class="v-board-lite">
			<div class="v-image-iconBG" style="width: 100%; height: 100%; position: absolute;"></div>
			<div class="v-board-clear v-position-left-center-horizontal v-board-decor-vertical">
				<div style="height: 10%; width: 100%;"></div>
				<div class="v-card v-position-top-margin-big" style="width: 300px;">
					<div id="login-container" class="container-fluid" style="padding: 0;">
						<div class="row-fluid">
							<div class="span12 form-horizontal">
								<div class="control-group signin-group">
					            	<label class="control-label" for="input-email">Email: </label>
						            <div class="controls">
						                <input type="text" class="span12" id="input-email" placeholder="Email" />
						                <span class="help-block"></span>
						            </div>
					            </div>
					            <div class="control-group signin-group">
					            	<label class="control-label" for="input-password">Password: </label>
						            <div class="controls">
						                <input type="password" class="span12" id="input-password" placeholder="Password" />
						                <span class="help-block"></span>
						            </div>
					            </div>
					            <div class="control-group register-group hide">
					            	<label class="control-label" for="input-repassword">RePassword: </label>
						            <div class="controls">
						                <input type="password" class="span12" id="input-repassword" placeholder="Repeat Password" />
						                <span class="help-block"></span>
						            </div>
					            </div>
					            <div class="control-group register-group hide">
					            	<label class="control-label" for="input-username">Username: </label>
						            <div class="controls">
						                <input type="text" class="span12" id="input-username" placeholder="Username" />
						                <span class="help-block"></span>
						            </div>
					            </div>
					            <div class="control-group register-group hide">
					            	<label class="control-label" for="input-gender">Gender: </label>
						            <div class="controls">
						            	<select class="span12" id="input-gender">
						            		<option value="1">Male</option>
						            		<option value="2">Female</option>
						            	</select>
						            	<span class="help-block"></span>
						            </div>
					            </div>
					            <div class="control-group register-group hide">
					            	<label class="control-label" for="input-type">Type: </label>
						            <div class="controls">
						            	<select class="span12" id="input-type">
						            		<option value="1">Student</option>
						            		<option value="2">Office Workers</option>
						            		<option value="3">Outdoor Workers</option>
						            		<option value="0">Other Types</option>
						            	</select>
						            	<span class="help-block"></span>
						            </div>
					            </div>
							</div>
						</div>
						<div class="row-fluid register-btn-row hide">
							<div class="span8">
								<button id="register-signin-btn" class="btn btn-primary btn-block btn-large">Register & Signin</button>
							</div>
							<div class="span4">
								<button id="signin-link" class="btn btn-link btn-block btn-large">Signin</button>
							</div>
						</div>
						<div class="row-fluid signin-btn-row">
							<div class="span8">
								<button id="signin-btn" class="btn btn-primary btn-block btn-large">Signin</button>
							</div>
							<div class="span4">
								<button id="register-link" class="btn btn-link btn-block btn-large">Register</button>
							</div>
						</div>
					</div>
						
				</div>
			</div>
			<div class="v-board-clear" style="margin-left: 12%; top: 10%;">
				<div class="v-image-logo v-position-top-margin-big"></div>
			</div>
		</div>
	</div>
	<!-- Put Javascripts here to make the page load faster -->
	<script type="text/javascript" src="js/lib/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="js/pages/login.js"></script>
	<script	type="text/javascript">
		(function($) {
			$(function() {
				var win_parent = window.parent;
				if(win_parent !== window) {
					console.log(win_parent === window);
					win_parent.location.reload();
				}
			});
		})(jQuery);
	</script>
  </body>
</html>
