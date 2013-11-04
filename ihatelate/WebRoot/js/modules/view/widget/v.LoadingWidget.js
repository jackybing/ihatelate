v.LoadingWidget = function VLoadingWidget(){
	v.Widget.call( this );
	this.init();
};

oo.inherit( v.LoadingWidget, v.Widget );

v.LoadingWidget.prototype.init = function (){
	this.$view = jQuery('<div>').addClass( val.Strings.styles.loadingIcon );
};