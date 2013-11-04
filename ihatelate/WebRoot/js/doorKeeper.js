doorKeeper = function DoorKeeper( $body ){
	this.$body = $body;
	// View objects
	// Master container
	this.canvas = new v.Canvas();
	// Background
	this.bgBoard = new v.Board( val.Strings.styles.boardLite );
	// Logo
	this.logo = new v.ImageWidget( val.Strings.styles.logo );
	// Card container
	this.cardBoard = new v.Board( val.Strings.styles.boardClear );
	this.logoBoard = new v.Board( val.Strings.styles.boardClear );
	// Cards
	this.loginCard = new v.GateCard();
	this.boxOfficeCard = new v.BoxOfficeCard();
	// Views
	this.$canvas = this.canvas.getView();
	this.$bgBoard = this.bgBoard.getView();
	this.$logo = this.logo.getView();
	this.$cardBoard = this.cardBoard.getView();
	this.$logoBoard = this.logoBoard.getView();
	this.$loginCard = this.loginCard.getView();
	this.$boxOfficeCard = this.boxOfficeCard.getView();
	
	// Background animation
	this.$loginBG =  jQuery('<div>')
			.addClass( val.Strings.styles.iconBG )
			.css({'width':'100%','height':'100%','position':'absolute'});
	this.BgInterval = null;
	
	this.init();
};

doorKeeper.prototype.init = function (){
	// Hierarchy
	this.$body.append( this.$canvas );
	this.$canvas.append( this.$bgBoard );
	this.$bgBoard
		.append( this.$loginBG )
		.append( this.$cardBoard
				.addClass( val.Strings.styles.leftCenterHorizontal )
				.addClass( val.Strings.styles.boardDecorVertical ) )
		.append( this.$logoBoard );
	this.$cardBoard
		.append( this.$loginCard
				.addClass( val.Strings.styles.topOffsetBig ) );
	this.$logoBoard
		.append( this.$logo
				.addClass( val.Strings.styles.topOffsetBig ) );
	// Event handler
	this.loginCard.$regButton.on( 'click', jQuery.proxy( this.switchToReg, this ) );
	// Sign in callback
	this.loginCard.getModel().setCallback( this.pass );
	this.boxOfficeCard.getModel().setCallback( this.pass );
	
	var self = this;
	this.BgInterval = setInterval(function(){
		self.$loginBG.animate({backgroundPosition:'+=0.3 +=0.3'},1);
	}, 1);
};

doorKeeper.prototype.switchToReg = function (){
	this.$cardBoard.empty();
	this.$cardBoard
		.append( this.$boxOfficeCard
				.addClass( val.Strings.styles.topOffsetBig ) );
};

doorKeeper.prototype.pass = function (){
	
};