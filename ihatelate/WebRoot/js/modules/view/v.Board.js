v.Board = function VBoard( style ){
	this.style = style;
	this.init();
};

oo.inherit( v.Board, v );

v.Board.prototype.init = function (){
	this.$view = jQuery('<div>').addClass(this.style);
};