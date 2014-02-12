(function($) {
	$(function() {
		function saveUserAvatar(url, disk) {
			$.ajax({
				url: "userAction!uploadAvatar.action",
				data: {
					url: url,
					disk: disk
				},
				async: false,
				beforeSend: function() {
					IHL_BlockMsgObj.showBlockMsg("<h1 style='font-size: 24px; line-height: 29px;'>Saving avatar ...<h1>");
				},
				success: function(response_data) {
					if(response_data == "{timeout:true}") {
						window.parent.location.reload();
					} else {
						IHL_BlockMsgObj.unblockMsg(function() { 
							response_data = $.parseJSON(response_data);
                            if(response_data.statusCode == "200") {
								$.growlUI('Success', response_data.info);
								$("#index-avatar").attr("src", url);
							} else {
								$.growlUI('Error', response_data.info);
							}
                        });
							
					}
					
				}
			});
		}
		
		function deleteFileOnUpload(disk, thisImg) {
			// var postParams = "disk=" + disk;
			$.ajax( {
				type : "POST",
				url : "deleteFileOnUpload.action",
				data : {
					disk: disk
				},
				async: false,
				success : function(data) {
					//var result = eval("(" + data + ")");
					var result = $.parseJSON(data);
					if (result.statusCode == "200") {
						// 删除成功
						//alert(result.statusCode);
						$("input#as-img-id").val("");
						thisImg.fadeOut("fast", function() {
							$(this).remove();
						});
					} else {
						// 删除失败
						//alert(result.statusCode);
						alert("Delete avatar failed!");
						// ...
					}
				},
				dataType : "json"
			});
		}

		
		$('#as-avatar').uploadify({
		    uploader  : 'tools/uploadify/uploadify.swf',
		    script    : 'imageUpload.action',
		    checkScript : '',
			scriptData : {},
		    buttonText : 'Change Avatar',
		    cancelImg : 'tools/uploadify/cancel.png',
		    fileExt : '*.jpg;*.jpeg;*.png;*.gif;*.bmp;',
		    fileDesc : 'All Images',
		    fileDataName :'uploadFile',
		    simUploadLimit : 1,
		    sizeLimit : 10 * 1024 * 1024,
		    multi : false,
		    auto : true,
		    removeCompleted : false,
			onComplete : function(event, id, fileObj, responseHtml, data){
				var //result = eval("(" + responseHtml + ")"),
					result = $.parseJSON(responseHtml),
					url = result.url, disk = result.disk;
				//console.log(result);
				//result.url:为图片网络地址
				//result.disk:为图片的服务器硬盘地址
				//result.statusCode：200为成功，404为失败
				//var img="<img src=\""+result.url+"\"></img>"
				//$("#test").append(img);
		    	//alert(responseHtml);
		    	//console.log(result.disk);
		    	//console.log(result.url);
		    	//console.log("'imageUpload" + id + "p'");
		    	saveUserAvatar(url, disk);
		    	$("div#uploaded-img").html("<img id='imageUpload" + id + "p' src='" + url + "' style='height: 100px;' data-disk='" + disk + "' class='img-polaroid' />");
		    	$("input#as-img-id").val("imageUpload" + id + "p");
		    	//deleteFileOnUpload(result.disk);
			},
			onCancel : function(event,id,fileObj,data){
				//console.log("cancel");
				//console.log("'imageUpload" + id + "p'");
				/*var thisImg = $("img#imageUpload" + id + "p");
				if(thisImg.length > 0) {
					deleteFileOnUpload(thisImg.data("disk"), thisImg);
				}*/
			},
			onSelectOnce:function(event,data) {
				var imgIdVal = $("input#as-img-id").val();
				if(imgIdVal != "") {
					//console.log($("img#" + $("input#as-img-id").val()).length);
					var thisImg = $("img#" + imgIdVal);
					if(thisImg.length > 0) {
						deleteFileOnUpload(thisImg.data("disk"), thisImg);
					}
				}
			},
			onAllComplete : function(event,data){
				//console.log("allComplete");
			}
		});

	});
})(jQuery);