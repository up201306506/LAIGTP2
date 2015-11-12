
 function Animation(id, span, timestart, type) {
	this.id = id;
	this.span = span;
	this.type = type;
	this.timestart = timestart;
	
	
	this.Matriz_Animation = mat4.create();
	
};

Animation.prototype.updateMatrix = function(Tempo_Mili){
	
}

Animation.prototype.getMatrix = function(Tempo_Mili){
	return this.Matriz_Animation;
}

Animation.prototype.getDuration = function(Tempo_Mili){
	return this.span;
}

Animation.prototype.getEndingTime = function(Tempo_Mili){
	return (this.timestart + this.span);
}