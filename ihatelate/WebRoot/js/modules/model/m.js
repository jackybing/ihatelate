m = function M(){
	this.model = null;
	this.callback = null;
};

m.prototype.getModel = function(){
	return this.model;
};

m.prototype.destroy = function(){
	this.model = null;
};

m.prototype.setCallback = function( callback ){
	this.callback = callback;
};
