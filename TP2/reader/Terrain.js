

function Terrain(scene, divs) {
	this.scene = scene;
 	CGFobject.call(this,scene);
    this.surface;
    this.ready=false;
    this.makeSurface(divs);
    this.initBuffers();
	
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
		var transform = mat4.create();
		mat4.scale(transform, transform, [1,1,1]);
		this.scene.multMatrix(transform);
		this.surface.display();
	}
		
		
};