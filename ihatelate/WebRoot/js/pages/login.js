(function($) {
	$(function() {
		// enable background moving
		var icon_bg = $(".v-image-iconBG"), icon_bg_x = 0, icon_bg_y = 0;
		window.setInterval(function() {
			icon_bg.css("background-position", icon_bg_x + "px " + icon_bg_y + "px");
			icon_bg_y = icon_bg_x = (icon_bg_x + 1 / 4) % 256;
		}, 10);
		// show register info
		$("#register-link").on("click", function() {
			$(".signin-btn-row").slideUp();
			$(".register-group, .register-btn-row").slideDown();
		});
		// show signin info
		$("#signin-link").on("click", function() {
			$(".register-group, .register-btn-row").slideUp();
			$(".signin-btn-row").slideDown();
		});
		// show error tip for controls
		function showErrorTip(element, msg) {
			element.parents(".control-group").addClass("error");
        	element.next(".help-block").text(msg);
		}
		// function to clear error tips
		function clearMyErrorTip(myself) {
            var myControlGroupParent = myself.parents(".control-group");
            if(myControlGroupParent.hasClass("error")) {
                myControlGroupParent.removeClass("error");
                myself.next(".help-block").text("");
            }
        }
		// clear error tip for controls
		$("input").on("input", function() {
            clearMyErrorTip($(this));
        });
		$("select").on("change", function() {
            clearMyErrorTip($(this));
        });
		// function to check email
		function checkEmail(email) {
			var reg = /^(?:\w+[.-])*\w+@(?:\w+[.-])?\w+\.\w+(?:[.-]\w+){0,2}$/;
			return reg.test(email);
		}
		// ajax signin function
		function ajaxSignin(email, password, email_element, this_btn) {
			$.ajax({
				url: "userAction!login.action",
				data: {
					email: email,
					password: password
				},
				type: 'post',
				success: function(json_data){
					var data = $.parseJSON(json_data);
					if(data.statusCode == "200") {
						// 1 second for image loading
						window.setTimeout(function() {
							window.location.replace(data.redirect_url);
						}, 1000);
					} else {
						showErrorTip(email_element, data.info);
						unsetBtnLoading(this_btn);
					}
				}
			});
		}
		// function to check button state, if not in loading state return true
		function checkBtnLoading(this_btn) {
			return !this_btn.hasClass("disabled");
		}
		// function to set button to loading state
		function setBtnLoading(this_btn) {
			this_btn.data("originHtml", this_btn.html()).html('<img src="img/loading.gif" style="height: 19px;" alt="Loading ..." />').addClass("disabled");
		}
		// function to unset button to loading state
		function unsetBtnLoading(this_btn) {
			this_btn.html(this_btn.data("originHtml")).removeClass("disabled");
		}
		// signin button
		$("#signin-btn").on("click", function() {
			var this_btn = $(this);
			if(checkBtnLoading(this_btn)) {
				setBtnLoading(this_btn);
				var email_element = $("#input-email"), password_element = $("#input-password"),
					email = $.trim(email_element.val()), password = $.trim(password_element.val());
				var is_validate = true;
				if(email == "") {
					showErrorTip(email_element, "Please input your email");
					is_validate = false;
				} else if(!checkEmail(email)) {
					showErrorTip(email_element, "Email not validate");
					is_validate = false;
				}
				if(password == "") {
					showErrorTip(password_element, "Please input your password");
					is_validate = false;
				}
				if(is_validate) {	// if validate, submit login info via ajax
					ajaxSignin(email, password, email_element, this_btn);
				} else {
					unsetBtnLoading(this_btn);
				}
			}
				
		});
		// register and signin
		$("#register-signin-btn").on("click", function() {
			var this_btn = $(this);
			if(checkBtnLoading(this_btn)) {
				setBtnLoading(this_btn);
				var email_element = $("#input-email"), password_element = $("#input-password"),
					repassword_element = $("#input-repassword"), username_element = $("#input-username"), 
					gender_element = $("#input-gender"), type_element = $("#input-type");
				var email = $.trim(email_element.val()), password = $.trim(password_element.val()),
					repassword = repassword_element.val(), username = username_element.val(),
					gender = gender_element.val(), type = type_element.val();
				var is_validate = true;
				if(email == "") {
					showErrorTip(email_element, "Please input your email");
					is_validate = false;
				} else if(!checkEmail(email)) {
					showErrorTip(email_element, "Email not validate");
					is_validate = false;
				}
				if(password == "") {
					showErrorTip(password_element, "Please input your password");
					is_validate = false;
				}
				if(repassword == "") {
					showErrorTip(repassword_element, "Please repeat your password");
					is_validate = false;
				} else if(repassword != password) {
					showErrorTip(repassword_element, "Inconsistent with your password");
					is_validate = false;
				}
				if(username == "") {
					showErrorTip(username_element, "Please input your username");
					is_validate = false;
				}
				if(gender != 1 && gender != 2) {
					showErrorTip(gender_element, "Unrecognized gender");
					is_validate = false;
				}
				if(type != 0 && type != 1 && type != 2 && type != 3) {
					showErrorTip(type_element, "Unrecognized type");
					is_validate = false;
				}
				if(is_validate) {	// if validate, submit login info via ajax
					$.ajax({
						url: "userAction!register.action",
						data: {
							email: email,
							password: password,
							username: username,
							sex: gender,
							type: type
						},
						type: 'post',
						success: function(json_data){
							var data = $.parseJSON(json_data);
							if(data.statusCode == "200") {
								ajaxSignin(email, password, email_element, this_btn);
							} else {
								showErrorTip(email_element, data.info);
								unsetBtnLoading(this_btn);
							}
						}
					});
				} else {
					unsetBtnLoading(this_btn);
				}
			}
			
		});
		
		// focus and select the #input-email element
		$("#input-email").focus().select();
	});
})(jQuery);