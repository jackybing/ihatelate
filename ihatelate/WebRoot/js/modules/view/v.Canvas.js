v.Canvas = function VCanvas(){
	this.init();
};

oo.inherit( v.Canvas, v );

v.Canvas.prototype.init = function (){
	this.$view = jQuery('<div>').addClass( val.Strings.styles.canvas );
};