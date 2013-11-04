v.ImageWidget = function VImageWidget( style ){
	v.Widget.call( this );
	this.style = style;
	this.init();
};

oo.inherit( v.ImageWidget, v.Widget );

v.ImageWidget.prototype.init = function (){
	this.$view = jQuery('<div>');
	this.$view.addClass( this.style );
};