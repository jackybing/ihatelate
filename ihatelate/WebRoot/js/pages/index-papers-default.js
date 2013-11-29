(function($) {
	$(function() {
		var default_template = {
			obtainDefaultStage: function() {
				$.ajax({
					url: "stageAction!obtainDefaultStage.action",
					data: { type: 20 },
					success: function(data) {
						console.log(data);
						
					}
				});
			}
		};
		default_template.obtainDefaultStage();
		
		
		
		
		
	});
})(jQuery);