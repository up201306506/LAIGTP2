
function LinearAnimation(id, span, timestart, type, ControlPoints){
	Animation.call(this,id,span,timestart,"linear");

	this.ControlPoints = ControlPoints;
	
	//Movements - Segmentos de animação. Uma para cada porção linear. 
	// Movement[] - Array com os valores de cada movimento
	// Movement_Amount - Numero de movements necessário
	// Movement_span - Tempo que demora cada movement
	this.Movements = [];
	this.Movement_Amount = this.ControlPoints.length - 1;
	this.Movement_span = this.span / this.Movement_Amount;
	
	//A função constroi 
	this.constructor_Movements(timestart);
 	
	this.Matriz_Animation = mat4.create();
	
};


LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;


LinearAnimation.prototype.constructor_Movements = function(timestart)
{
	var latest_span_end = timestart;
	for (var i = 0; i < this.Movement_Amount; i++)
	{
		this.Movements[i] = {};	 
		//span 				- Se alguma vez Movements diferentes puderem ter spans diferentes... fica aqui.
		//time_begins 		- Momento em que começa este movimento
		//time_end 			- Momento em que termina este movimento
		//pos_inicial 		- Ponto de Controlo da posição Inicial
		//pos_final 		- Ponto de Controlo da posição Final
		//Matrix_deltas		- Matriz com a derivada do movimentos em cada eixo na ordem XYZ.
		//Matrix_distancias	- Matriz com as distâncias totais nos eixos. Para não haver erros no ultimo update num periodo qualquer.
		//Matrix_Traslation	- A Matriz que é aplicada nas trasnformações, é actualizada pelo update.
			//done			- Um booleano que é usado no updateMatrix para que não se façam muitas repetições inuteis de acções.
			
		this.Movements[i].span = this.Movement_span;
		this.Movements[i].time_begins = latest_span_end;
		this.Movements[i].time_ends = this.Movements[i].time_begins + this.Movements[i].span;
		latest_span_end += this.Movement_span;
		
		this.Movements[i].pos_inicial = this.ControlPoints[i];
		
		this.Movements[i].pos_final = this.ControlPoints[i+1];
		
		this.Movements[i].Matrix_distancias = []
		this.Movements[i].Matrix_distancias[0] = this.Movements[i].pos_final[0]-this.Movements[i].pos_inicial[0];	//x
		this.Movements[i].Matrix_distancias[1] = this.Movements[i].pos_final[1]-this.Movements[i].pos_inicial[1];	//y
		this.Movements[i].Matrix_distancias[2] = this.Movements[i].pos_final[2]-this.Movements[i].pos_inicial[2];	//z
		
		this.Movements[i].Matrix_deltas = [];
		this.Movements[i].Matrix_deltas[0] = this.Movements[i].Matrix_distancias[0] / this.Movements[i].span;	//x
		this.Movements[i].Matrix_deltas[1] = this.Movements[i].Matrix_distancias[1] / this.Movements[i].span;	//y
		this.Movements[i].Matrix_deltas[2] = this.Movements[i].Matrix_distancias[2] / this.Movements[i].span;	//z
		
		this.Movements[i].Matrix_Traslation = [0,0,0];
		
		
		this.Movements[i].done = false;
		
	}

	
	
	
}

LinearAnimation.prototype.updateMatrix = function(Tempo_Mili)
{
	var Tempo_Segundos = Tempo_Mili/1000;
	
	//Reset à matriz de transformação
	mat4.identity(this.Matriz_Animation);
	
	//Na eventualidade de o primeiro ponto de controlo não ser a origem, transporta-se o objecto para essa posição antes de começar.
	mat4.translate(this.Matriz_Animation, this.Matriz_Animation, this.ControlPoints[0]);
	
	
	for (var i = 0; i < this.Movement_Amount; i++)
	{
		
		//A decisão de como alterar a Matriz para cada Movement depende de se o tempo que passou já corresponde a esse Movement.
		var Periodo_Movimento = Tempo_Segundos - this.Movements[i].time_begins;
		
		
		if (Periodo_Movimento <= 0) 
		{
			// Ainda não estamos neste momento. Não se mexe nas matrizes.
			;
		}
		else if (Periodo_Movimento < this.Movements[i].span)
		{
			//Estamos a meio do Movement. A distancia percorrida deve depender do delta e do tempo.
			this.Movements[i].Matrix_Traslation[0] = Periodo_Movimento * this.Movements[i].Matrix_deltas[0];
			this.Movements[i].Matrix_Traslation[1] = Periodo_Movimento * this.Movements[i].Matrix_deltas[1];
			this.Movements[i].Matrix_Traslation[2] = Periodo_Movimento * this.Movements[i].Matrix_deltas[2];
			
		}
		else if (this.Movements[i].done == false) 
		{			
			//Já acabou este segmento do movimento, as distâncias na matriz devem ser máximas
			this.Movements[i].Matrix_Traslation[0] = this.Movements[i].Matrix_distancias[0];
			this.Movements[i].Matrix_Traslation[1] = this.Movements[i].Matrix_distancias[1];
			this.Movements[i].Matrix_Traslation[2] = this.Movements[i].Matrix_distancias[2];
			this.Movements[i].done = true;
						
			//console.log("A animação " + this.id + " terminou agora o segmento de movimento de indice " + i);
		}

		
		mat4.translate(this.Matriz_Animation, this.Matriz_Animation, this.Movements[i].Matrix_Traslation);
		
	}
	

}

LinearAnimation.prototype.getMatrix = function()
{
	return this.Matriz_Animation;
}

LinearAnimation.prototype.getDuration = function()
{
	return this.span;
}

LinearAnimation.prototype.getEndingTime = function()
{
	return (this.timestart + this.span);
}