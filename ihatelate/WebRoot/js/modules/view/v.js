v = function V(){
	this.$view = null;
	this.model = null;
};

v.prototype.getView = function (){
	return this.$view;
};

v.prototype.destroy = function (){
	this.$view = null;
}

v.prototype.init = function (){
	throw new Error('Subclass of v must implement init()');
};