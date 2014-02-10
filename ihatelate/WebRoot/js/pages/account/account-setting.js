(function($) {
	$(function() {
		var AccountSetting = {
			fillAsForm: function() {
				$.ajax({
					url: "userAction!obtainUserInfo.action",
					success: function(response_data) {
						response_data = $.parseJSON(response_data);
						if(response_data.statusCode == "200") {
							var user = response_data.user;
							console.log(user);
							$("#as-email").val(user.email);
							$("#as-gender").val(user.sex);
							$("#as-username").val(user.userName);
							$("#as-type").val(user.type);
							$("#as-modal").modal("show");
						}
						
					}
				});
			}
		};
		
		$(document).on("click", "#account-setting-btn", function() {
			AccountSetting.fillAsForm();
		}).on("click", "#tab-mi", function() {
			$("#save-as-btn").text("Save Information Modifications").data("saveTarget", "info");
		}).on("click", "#tab-mp", function() {
			$("#save-as-btn").text("Save Password Modifications").data("saveTarget", "pass");
		});
	});
})(jQuery);