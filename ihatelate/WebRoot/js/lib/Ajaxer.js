Ajaxer = {};

Ajaxer.post = function ( api_url , json, successCallback, errorCallback ){
	jQuery.ajax({
		url: api_url,
		data: json,    
		type: 'post',
		cache: false,
		dataType: 'json',
		success: successCallback,
		error : errorCallback
	});
};

Ajaxer.get = function ( api_url, successCallback, errorCallback ){
	jQuery.ajax({
		url: api_url,
		data: json,    
		type: 'get',
		cache: false,
		dataType: 'json',
		success: successCallback,
		error : errorCallback
	});
};
