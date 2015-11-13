
 function CircularAnimation(id, span, timestart, type, center, radius, startang, rotang) {
	Animation.call(this,id,span,timestart,"circular");

	this.center = center;
	this.radius = radius;
	this.startang = startang;
	this.rotang = rotang;
	
	//Comparado ao movimento linear, a função só vai ter uma segmento de movimento.
	this.current_angle = 0;
	this.delta = 0;
	
};


CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

var degToRad = Math.PI / 180.0;


CircularAnimation.prototype.updateMatrix = function(Tempo_Mili){
	
	var Tempo_Segundos = Tempo_Mili/1000;
	

	
}