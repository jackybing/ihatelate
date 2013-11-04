v.InputWidget = function VInputWidget( hint ){
	v.Widget.call( this );
	this.hint = hint;
	this.init();
};

oo.inherit( v.InputWidget, v.Widget );

v.InputWidget.prototype.init = function (){
	this.$view = jQuery('<input>');
	this.$view.addClass( val.Strings.styles.inputWidget );
	this.$view.attr('placeholder', this.hint );
};

v.InputWidget.prototype.filter = function ( filterRegex, positive ){
	var value = this.$view.value();
	if (positive){
		return filterRegex.test(value);
	} else {
		return !filterRegex.test(value);
	}
};