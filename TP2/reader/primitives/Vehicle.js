function Vehicle(scene){
	CGFobject.call(this,scene);
	this.scene = scene;
	
	this.Array_Partes = [];
	this.Array_Texturas = [];
	this.construi_partes();
}

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor = Vehicle;

Vehicle.prototype.construi_partes = function()
{
	//Corpo
	this.Array_Texturas["corpo"] = new CGFtexture(this.scene, "primitives/assets/Boards.jpg");	
	this.Array_Partes["corpo"] = new Patch(this.scene, 3,4,4,
		[
		[0,0.5,2],[0,0.5,2],[0,0.5,2],[0,0.5,2],
		[-1,0,1],[0,-2,1],[0,-2,1],[1,0,1],
		[-1,0,0],[0,-2,0],[0,-2,0],[1,0,0],
		[-1,0,-1],[0,0,-1.5],[0,0,-1.5],[1,0,-1]
		]);
		
	//Chão
	this.Array_Partes["chao"] = new Patch(this.scene, 3,4,4,
		[
		[0,0.5,2],[0,0.5,2],[0,0.5,2],[0,0.5,2],
		[1,0,1],[-0.33,0,1],[0.33,-0,1],[-1,0,1],
		[1,0,0],[-0.33,0,0],[0.33,-0,0],[-1,0,0],
		[1,0,-1],[0,0,-1.5],[0,0,-1.5],[-1,0,-1]
		]);
		
}


Vehicle.prototype.display = function()
{
	this.scene.pushMatrix();
	
	//Corpo
	this.Array_Texturas["corpo"].bind();
	this.Array_Partes["corpo"].display();
	this.Array_Partes["chao"].display();
	
	this.scene.popMatrix();
}