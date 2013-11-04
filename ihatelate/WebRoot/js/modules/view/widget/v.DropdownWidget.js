v.DropdownWidget = function VDropdownWidget( dropdownList ){
	v.Widget.call( this );
	this.list = dropdownList;
	this.init();
};

oo.inherit( v.DropdownWidget, v.Widget );

v.DropdownWidget.prototype.init = function (){
	this.$view = jQuery('<select>');
	this.$view.addClass( val.Strings.styles.dropdownList );
	var i, str = '';
	for ( i = 0; i < this.list.length; i++ ){
		str += ('<option>' + this.list[i] + '</option>');
	}
	this.$view.html(str);
};