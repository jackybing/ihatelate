(function($) {
	$(function() {
		var AccountSetting = {
			fillAsForm: function() {
				$.ajax({
					url: "userAction!obtainUserInfo.action",
					beforeSend: function() {
						IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Loading account information ...<h1>");
					},
					success: function(response_data) {
						if(response_data == "{timeout:true}") {
							window.parent.location.reload();
						} else {
							IHL_BlockMsgObj.unblockMsg(function() { 
								response_data = $.parseJSON(response_data);
	                            if(response_data.statusCode == "200") {
									var user = response_data.user, avatar_url = user.avatar, id = user.id, avatar_disk = user.disk;
									if(avatar_url) {
										$("div#uploaded-img").html("<img id='imageUpload" + id + "p' src='" + avatar_url + "' style='height: 100px; width: 100px; background:url(img/loading-mini.gif) no-repeat center;' data-disk='" + avatar_disk + "' class='img-polaroid' />");
		    							// $("input#as-img-id").val("imageUpload" + id + "p");
									} else {
										$("div#uploaded-img").html('<img alt="Avatar" src="img/avatar.jpg" class="img-polaroid" style="height: 100px; width: 100px; background:url(img/loading-mini.gif) no-repeat center;" />');
									}
									$("#as-email").val(user.email);
									$("#as-gender").val(user.sex);
									$("#as-username").val(user.userName);
									$("#as-type").val(user.type);
									$("#as-modal").modal("show");
								}
	                        });
								
						}
						
					}
				});
			},
			saveInfo: function() {
				// 1. 获取element
				var username_ele = $("#as-username"), type_ele = $("#as-type");
				// 2. 获取trim后的val
				var username = $.trim(username_ele.val()), type = $.trim(type_ele.val());
				// 3. 检测validate
				var is_validate = true;
				if(username == "") {
					IHL_ErrorTipObj.showErrTip(username_ele, "Please input a username");
					is_validate = false;
				}
				// 4. 执行ajax
				if(is_validate) {
					$.ajax({
						url: "userAction!modifyUserInfo.action",
						data: {
							username: username,
							type: type
						},
						beforeSend: function() {
							IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Saving account information ...<h1>");
						},
						type: "post",
						success: function(response_data) {
							if(response_data == "{timeout:true}") {
								window.parent.location.reload();
							} else {
								response_data = $.parseJSON(response_data);
								IHL_BlockMsgObj.unblockMsg(function() { 
		                            if(response_data.statusCode == "200") {
		                            	IHL_IndexInitObj.initUsernameDiv();
										$.growlUI('Success', response_data.info);
									} else {
										$.growlUI('Error', response_data.info);
									}
		                        });
							}
								
						}
					});
				}
			},
			savePass: function() {
				// 1. 获取element
				var old_pass_ele = $("#as-password"), new_pass_ele = $("#as-new-pass"),
					retype_new_pass_ele = $("#as-retype-new-pass");
				// 2. 获取trim后的val
				var old_pass = $.trim(old_pass_ele.val()), new_pass = $.trim(new_pass_ele.val()),
					retype_new_pass = $.trim(retype_new_pass_ele.val());
				// 3. 检测validate
				var is_validate = true;
				if(old_pass == "") {
					IHL_ErrorTipObj.showErrTip(old_pass_ele, "Please input your old password");
					is_validate = false;
				}
				if(new_pass == "") {
					IHL_ErrorTipObj.showErrTip(new_pass_ele, "Please input a new password");
					is_validate = false;
				}
				if(retype_new_pass == "") {
					IHL_ErrorTipObj.showErrTip(retype_new_pass_ele, "Please retype the new password");
					is_validate = false;
				} else if(retype_new_pass != new_pass) {
					IHL_ErrorTipObj.showErrTip(retype_new_pass_ele, "Different with the new password");
					is_validate = false;
				}
				// 4. 执行ajax
				if(is_validate) {
					$.ajax({
						url: "userAction!modifyPassword.action",
						data: {
							password: old_pass,
							passwordNew: new_pass
						},
						beforeSend: function() {
							IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Changing password ...<h1>");
						},
						type: "post",
						success: function(response_data) {
							if(response_data == "{timeout:true}") {
								window.parent.location.reload();
							} else {
								response_data = $.parseJSON(response_data);
								IHL_BlockMsgObj.unblockMsg(function() { 
		                            if(response_data.statusCode == "200") {
										$.growlUI('Success', response_data.info);
										old_pass_ele.val("");
										new_pass_ele.val("");
										retype_new_pass_ele.val("");
									} else if(response_data.statusCode == "500") {
										var err_info = response_data.info;
										$.growlUI('Error', err_info);
										IHL_ErrorTipObj.showErrTip(old_pass_ele.select(), err_info);
									}
		                        });
							}
								
						}
					});
				}
			}
		};
		
		$(document).on("click", "#account-setting-btn", function() {
			AccountSetting.fillAsForm();
		}).on("click", "#tab-mi", function() {
			$("#save-as-btn").text("Save Information Modifications").data("saveTarget", "info");
		}).on("click", "#tab-mp", function() {
			$("#save-as-btn").text("Save Password Modifications").data("saveTarget", "pass");
		}).on("click", "#save-as-btn", function() {
			var save_target = $("#save-as-btn").data("saveTarget");
			if(save_target == "info") {
				AccountSetting.saveInfo();
			} else if(save_target == "pass") {
				AccountSetting.savePass();
			}
		});
	});
})(jQuery);