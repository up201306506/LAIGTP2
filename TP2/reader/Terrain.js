function Terrain(scene, divs, path) {
	this.scene = scene;
 	CGFobject.call(this,scene);
    this.surface;
    this.ready=false;
    this.makeSurface(divs);
    this.initBuffers();
	
	this.Texture = new CGFtexture(this.scene, path);
	this.Shader = new CGFshader(this.scene.gl, "shaders/flat.vert", "shaders/red.frag")
	this.Shader.setUniformsValues({uSampler2: 1});
	
	
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

 Terrain.prototype.initBuffers = function() {
  	this.surface.initBuffers();
};



Terrain.prototype.display= function()
{
	if(this.ready)
	{

		this.scene.setActiveShader(this.Shader);
		
		this.Texture.bind(1);		
		this.surface.display();
		
		this.scene.setActiveShader(this.scene.defaultShader);
	}
		
};
