v.ButtonWidget = function VButtonWidget( buttonText ){
	v.Widget.call( this );
	this.text = buttonText;
	this.init();
};

oo.inherit( v.ButtonWidget, v.Widget );

v.ButtonWidget.prototype.init = function (){
	this.$view = jQuery('<div>').text( this.text );
	this.$view.addClass( val.Strings.styles.buttonWidget );
};