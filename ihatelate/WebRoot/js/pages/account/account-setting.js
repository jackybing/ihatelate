(function($) {
	$(function() {
		var AccountSetting = {
			fillAsForm: function() {
				$.ajax({
					url: "userAction!obtainUserInfo.action",
					success: function(response_data) {
						if(response_data == "{timeout:true}") {
							window.parent.location.reload();
						} else {
							response_data = $.parseJSON(response_data);
							if(response_data.statusCode == "200") {
								var user = response_data.user;
								$("#as-email").val(user.email);
								$("#as-gender").val(user.sex);
								$("#as-username").val(user.userName);
								$("#as-type").val(user.type);
								$("#as-modal").modal("show");
							}
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
					IHL_ErrorTipObj.showErrTipAndScroll2Ele(username_ele, "Please input a username");
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
				console.log("AccountSetting save password");
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