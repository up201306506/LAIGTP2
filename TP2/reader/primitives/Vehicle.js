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
	this.Array_Partes["corpo"] = new SpherePrimitive(this.scene,20,20,0.5);
	this.Array_Texturas["corpo"] = new CGFtexture(this.scene, "primitives/assets/Boards.jpg");	
	
	//Corpo
		this.Array_Partes["barco"] = new Patch(this.scene, 3,4,4,
		[
		[-1,0,1],[-1,-1,0],[-1,0,-1],[-1,0,-1],
		[0,0,1],[0,-1,0],[0,0,-1],[-1,0,-1],
		[1,0,1],[1,-1,0],[1,0,-1],[-1,0,-1],
		[1,0,1],[1,-1,0],[1,0,-1],[-1,0,-1]
		]);
}


Vehicle.prototype.display = function()
{
	this.scene.pushMatrix();
	
	//Corpo
	this.Array_Texturas["corpo"].bind();
	this.Array_Partes["barco"].display();
	
	this.scene.popMatrix();
}