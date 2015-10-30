/**
 * SpherePrimitive
 * @constructor
 */
 function SpherePrimitive(scene, slices, stacks, radius) {
 	CGFobject.call(this,scene);

   this.updatableTexCoords=false;
   this.slices=slices;
   this.stacks=stacks;
   this.radius=radius;
   this.initBuffers();
 };

 SpherePrimitive.prototype = Object.create(CGFobject.prototype);
 SpherePrimitive.prototype.constructor = SpherePrimitive;

 SpherePrimitive.prototype.initBuffers = function() {

  var deg2rad=Math.PI/180.0;
  var ang1 = 360/this.slices;
  var a_rad1=ang1*deg2rad;
  var ang2 = 180/this.stacks;
  var a_rad2=ang2*deg2rad;
  var half_pi = Math.PI/2;

  this.vertices = [];
  this.normals = [];
  this.indices = [];
  this.texCoords = [];              
  
  

  //Normais e Vértices
  for(var j = 0; j <= this.stacks; j++){
    for(var i = 0; i <= this.slices; i++){ 
      this.vertices.push(this.radius * Math.cos(a_rad2*j-half_pi) * Math.cos(a_rad1*i), this.radius * Math.cos(a_rad2*j-half_pi) * Math.sin(a_rad1*i), this.radius*Math.sin(a_rad2*j-half_pi));
      this.normals.push(this.radius * Math.cos(a_rad2*j-half_pi) * Math.cos(a_rad1*i), this.radius * Math.cos(a_rad2*j-half_pi) * Math.sin(a_rad1*i), this.radius*Math.sin(a_rad2*j-half_pi));
      this.texCoords.push(-i/this.slices,j/this.stacks);

     }
   }

  //Indices
  for(var j = 0; j < this.stacks; j++){
    for(var i = 0; i < this.slices; i++){
      this.indices.push(i+1+(j+1)*(this.slices+1), i+j*(this.slices+1), i+1+j*(this.slices+1));
      this.indices.push(i+j*(this.slices+1), i+1+(j+1)*(this.slices+1), i+(j+1)*(this.slices+1));
   }
 }

  
  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();

};




  /*var deg2rad=Math.PI/180.0;
  var ang1 = 360/this.slices;
  var a_rad1=ang1*deg2rad;
  var ang2 = 180/this.stacks;
  var a_rad2=ang2*deg2rad;

  this.vertices = [];
  this.normals = [];
  this.indices = [];
  this.texCoords = [];              
  
  

  //Normais e Vértices
  for(var j = 0; j < this.stacks; j++){
    for(var i = 0; i < this.slices; i++){ 
      this.vertices.push(0.5 * Math.cos(a_rad2*j) * Math.cos(a_rad1*i), 0.5 * Math.cos(a_rad2*j) * Math.sin(a_rad1*i), 0.5*Math.sin(a_rad2*j));
      this.normals.push(Math.cos(a_rad2*j)*Math.cos(a_rad1*i), Math.cos(a_rad2*j)*Math.sin(a_rad1*i), Math.sin(a_rad2*j));
      this.texCoords.push(0.5+(Math.cos(a_rad2*j)*Math.cos(a_rad1*i)/2), 0.5-(Math.cos(a_rad2*j) * Math.sin(a_rad1*i)/2));
     }
   }

  this.vertices.push(0, 0, 0.5);
  this.normals.push(0, 0, 1);
  this.texCoords.push(0.5, 0.5);

  //Indices
  for(var i = 0; i < this.stacks - 1; i++){
    for(var j = 0; j < this.slices; j++){
      this.indices.push((j + 1) % this.slices + (i + 1)*this.slices, j + (i + 1)*this.slices, j + i*this.slices);
      this.indices.push((j + 1) % this.slices + i *this.slices, (j + 1) % this.slices + (i + 1)*this.slices, j + i*this.slices);
    }
  }

  for(var i = this.slices*this.stacks - this.slices; i < this.slices*this.stacks; i++){
    if((i + 1) >= this.slices*this.stacks){
      this.indices.push(i, this.slices*this.stacks - this.slices, this.slices*this.stacks);
    }else{
      this.indices.push(i, i+1, this.slices*this.stacks);
    }
  }

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();

};*/