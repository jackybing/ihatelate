v.Card = function VCard(){
	v.call( this );
	this.$view = jQuery('<div>').addClass( val.Strings.styles.card );
	this.loading = new v.LoadingWidget();
	this.$loading = this.loading.getView();
};

oo.inherit( v.Card, v );

v.Card.prototype.connectModel = function (){
	throw new Error('Subclass of Card must implement connectModel()');
};

v.Card.prototype.getModel = function (){
	return this.model;
};

v.Card.prototype.showLoading = function(){
	this.$view.append( this.$loading );
};

v.Card.prototype.hideLoading = function(){
	this.$loading.remove();
};