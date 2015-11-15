function Vehicle(scene){
	CGFobject.call(this,scene);
	this.scene = scene;
	
	this.Array_Partes = [];
	this.Array_Texturas = [];
	this.construi_partes();
}

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor = Vehicle;

Vehicle.prototype.construi_partes = function(timestart)
{
	//Corpo
	this.Array_Partes["corpo"] = new SpherePrimitive(this.scene,20,20,0.5);
	this.Array_Texturas["corpo"] = new CGFtexture(this.scene, "primitives/assets/veiculo.jpg");
	
}


Vehicle.prototype.display = function(timestart)
{
	this.scene.pushMatrix();
	
	//Corpo
	this.Array_Texturas["corpo"].bind();
	this.Array_Partes["corpo"].display();
	
	this.scene.popMatrix();
}