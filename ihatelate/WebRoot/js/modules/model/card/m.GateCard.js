m.GateCard = function MGateCard(){
	m.Card.call( this );
};

oo.inherit( m.GateCard, m.Card );

m.GateCard.prototype.pack = function (){
	
};

m.GateCard.prototype.parse = function (){
	
};

m.GateCard.prototype.successCallback = function (){
	if ( this.callback !== null ){
		this.callback();
	}
};

m.GateCard.prototype.errorCallback = function (){

};