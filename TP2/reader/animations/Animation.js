
 function Animation(id, span, timestart, type) {
	this.id = id;
	this.span = span;
	this.type = type;
	this.timestart = timestart;
	this.timeend = this.timestart + this.span;
	
	
	//A matriz de transformação própriamente dita. Retorna com 
	//Aplicar com multmatrix. Retornar com getMatrix.
	this.Matriz_Animation = mat4.create();
	
	
	//Chave de bloqueio da animação. 
	//O updateMatrix deve implementar forma de a activar no final da animação e não mudar 
	//os valores da matriz após esse periodo. Imporante em animações em sequência.
	// (Os segmentos na LinearAnimation ficaram com uma chave cada)
	this.done = false;
	
};

Animation.prototype.updateMatrix = function(Tempo_Mili){
	
}

Animation.prototype.getMatrix = function(Tempo_Mili){
	return this.Matriz_Animation;
}

Animation.prototype.getDuration = function(Tempo_Mili){
	return this.span;
}

Animation.prototype.getEndingTime = function()
{
	return this.timeend;
}