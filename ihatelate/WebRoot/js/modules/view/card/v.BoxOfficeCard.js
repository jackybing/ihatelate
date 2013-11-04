// Username
// Email
// Password
// Occupation template

v.BoxOfficeCard = function VBoxOfficeCard(){
	v.Card.call( this );
	// View objects
	this.emailInput = new v.InputWidget( val.Strings.hints.inputEmail );
	this.pwdInput = new v.InputWidget( val.Strings.hints.inputPassword );
	this.usernameInput = new v.InputWidget( val.Strings.hints.inputUsername );
	this.usertypeList = new v.DropdownWidget( val.Strings.lists.userType );
	this.signupandinButton = new v.ButtonWidget( val.Strings.hints.buttonSignupAndSignin );
	// Views
	this.$emailInput = this.emailInput.getView();
	this.$pwdInput = this.pwdInput.getView();
	this.$usernameInput = this.usernameInput.getView();
	this.$usertypeList = this.usertypeList.getView();
	this.$signupandinButton = this.signupandinButton.getView();
	
	this.init();
	this.connectModel();
};

oo.inherit( v.BoxOfficeCard, v.Card );

v.BoxOfficeCard.prototype.init = function(){
	this.$view
		.append(
				jQuery('<div>')
					.append(this.$emailInput)
		)
		.append(
				jQuery('<div>')
					.append(this.$pwdInput)
		)
		.append(
				jQuery('<div>')
					.append(this.$usernameInput)
		)
		.append(
				jQuery('<div>')
					.append(this.$usertypeList)
		)
		.append(this.$signupandinButton);
	this.$signupandinButton.on( 'click', jQuery.proxy( this.checkTicket, this ) );
};

v.BoxOfficeCard.prototype.connectModel = function(){
	this.model = new m.BoxOfficeCard();
};

v.BoxOfficeCard.prototype.checkTicket = function(){
	
};