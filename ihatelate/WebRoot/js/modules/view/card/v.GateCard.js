v.GateCard = function VGateCard(){
	v.Card.call( this );
	// View objects
	this.emailInput = new v.InputWidget( val.Strings.hints.inputEmail );
	this.pwdInput = new v.InputWidget( val.Strings.hints.inputPassword );
	this.signinButton = new v.ButtonWidget( val.Strings.hints.buttonSignin );
	this.regButton = new v.ButtonWidget( val.Strings.hints.buttonRegister );
	// Views
	this.$emailInput = this.emailInput.getView();
	this.$pwdInput = this.pwdInput.getView();
	this.$signinButton = this.signinButton.getView();
	this.$regButton = this.regButton.getView();
	
	this.init();
	this.connectModel();
};

oo.inherit( v.GateCard, v.Card );

v.GateCard.prototype.init = function(){
	this.$view
		.append(
				jQuery('<div>')
					.append(this.$emailInput)
		)
		.append(
				jQuery('<div>')
					.append(this.$pwdInput)
		)
		.append(this.$signinButton)
		.append(this.$regButton);
	this.$signinButton.on( 'click', jQuery.proxy( this.checkTicket, this ) );
};

v.GateCard.prototype.connectModel = function(){
	this.model = new m.GateCard();
};

v.GateCard.prototype.checkTicket = function(){
	
};