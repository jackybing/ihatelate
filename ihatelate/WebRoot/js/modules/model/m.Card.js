m.Card = function MCard(){
	m.call( this );
};

oo.inherit( m.Card, m );

m.Card.prototype.pack = function (){
	throw new Error('Subclass of Card must implement pack()');
};

m.Card.prototype.parse = function (){
	throw new Error('Subclass of Card must implement parse()');
};

m.Card.prototype.successCallback = function (){
	throw new Error('Subclass of Card must implement successCallback()');
};

m.Card.prototype.errorCallback = function (){
	throw new Error('Subclass of Card must implement errorCallback()');
};