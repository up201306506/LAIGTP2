

function Plane(scene, divs) {
	this.scen = scene;
 	CGFobject.call(this,scene);
    this.surface;
    this.ready=false;
    this.makeSurface(divs);
    this.initBuffers();
 };

 Plane.prototype = Object.create(CGFobject.prototype);
 Plane.prototype.constructor = Plane;


Plane.prototype.makeSurface = function (divs) {
		
	var nurbsSurface = new CGFnurbsSurface(1, 1, [0, 0, 1, 1], [0, 0, 1, 1], 
						[	// U = 0
						[ // V = 0..1;
							 [-0.5, 0, 0.5, 1 ],
							 [-0.5, 0, -0.5, 1 ]
							
						],
						// U = 1
						[ // V = 0..1
							 [ 0.5, 0, 0.5, 1 ],
							 [ 0.5, 0, -0.5, 1 ]							 
						]
					]);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.surface = new CGFnurbsObject(this.scen, getSurfacePoint, divs, divs );
	this.ready = true;


};

 Plane.prototype.initBuffers = function() {
  	this.surface.initBuffers();
};



Plane.prototype.display= function()
{
	if(this.ready)
		this.surface.display();
		
};


/*this.plano = new Plane(this);
	this.plano.makeSurface(1, 1, 
					[0, 0, 1, 1], 
					[0, 0, 1, 1], 
					[	// U = 0
						[ // V = 0..1;
							 [-0.5, 0, -0.5, 1 ],
							 [-0.5,  0, 0.5, 1 ]
							
						],
						// U = 1
						[ // V = 0..1
							 [ 0.5, 0, -0.5, 1 ],
							 [ 0.5,  0, 0.5, 1 ]							 
						]
					]);*/