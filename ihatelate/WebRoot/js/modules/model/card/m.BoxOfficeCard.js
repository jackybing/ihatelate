m.BoxOfficeCard = function MBoxOfficeCard(){
	m.Card.call( this );
};

oo.inherit( m.BoxOfficeCard, m.Card );

m.BoxOfficeCard.prototype.pack = function (){
	
};

m.BoxOfficeCard.prototype.parse = function (){
	
};

m.BoxOfficeCard.prototype.successCallback = function (){
	if ( this.callback !== null ){
		this.callback();
	}
};

m.BoxOfficeCard.prototype.errorCallback = function (){

};