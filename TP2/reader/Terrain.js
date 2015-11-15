function Terrain(scene, divs, Text_path, Height_path) {
	this.scene = scene;
 	CGFobject.call(this,scene);
    this.surface;
    this.makeSurface(divs);
	this.Texture = new CGFtexture(this.scene, Text_path);
	this.HeightMap = new CGFtexture(this.scene, Height_path);
	
	
	//Passei três horas a tentar perceber porque raio isto não dava com Texture.bind()
	this.appearance = new CGFappearance(this.scene);
	this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
	this.appearance.setSpecular(0.0, 0.0, 0.0, 1);	
	this.appearance.setShininess(120);
	this.appearance.setTexture(this.Texture);
	this.appearance.setTextureWrap('REPEAT', 'REPEAT');
	
	
	
	
	
	this.Shader = new CGFshader(this.scene.gl, "shaders/extrude.vert", "shaders/singletext.frag")
	this.Shader.setUniformsValues({HeightMap: 1});
	this.Shader.setUniformsValues({normScale: 1.4});
	
 };

 Terrain.prototype = Object.create(CGFobject.prototype);
 Terrain.prototype.constructor = Terrain;


Terrain.prototype.makeSurface = function (divs) {
		
	var nurbsSurface = new CGFnurbsSurface(1, 1, [0, 0, 1, 1], [0, 0, 1, 1], 
						[	// U = 0
						[ // V = 0..1;
							 [-5, 0, 5, 1 ],
							 [-5, 0, -5, 1 ]
							
						],
						// U = 1
						[ // V = 0..1
							 [ 5, 0, 5, 1 ],
							 [ 5, 0, -5, 1 ]							 
						]
					]);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.surface = new CGFnurbsObject(this.scene, getSurfacePoint, divs, divs );
	this.ready = true;
	
};

Terrain.prototype.display= function()
{
		this.scene.pushMatrix();
		
		this.appearance.apply();
		//this.Texture.bind();
		this.HeightMap.bind(1);
		
		this.scene.setActiveShader(this.Shader);
		this.surface.display();
		this.scene.setActiveShader(this.scene.defaultShader);
		
		
		this.scene.popMatrix();
};
