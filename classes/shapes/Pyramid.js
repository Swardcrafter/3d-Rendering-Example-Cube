class Pyramid {
	constructor(center, size, dots='none', angles={x: 0, y: 0, z: 0}) {
		this.size = size;
		this.dots = dots;

		this.point_size = 5;

		// Define Center Vertex
		this.center = new Point3D(center[0], center[1], center[2]);

		this.angles = angles;

		const cps = new Point3D(
			this.center.x + this.size,
			this.center.y + this.size,
			this.center.z + this.size
		);

		const cms = new Point3D(
			this.center.x - this.size,
			this.center.y - this.size,
			this.center.z - this.size
		);

		this.VertexList = [
			new Point3D(cms.x, this.center.y, cms.z, 'red'),
			new Point3D(cps.x, this.center.y, cms.z, 'orange'),
			new Point3D(cms.x, this.center.y, cps.z, '#a89911'),
			new Point3D(cps.x, this.center.y, cps.z, 'green'),
			new Point3D(this.center.x, this.center.y + size*2, this.center.z, 'blue')
		]
	}

	Render() {
		this.angles.x += 0.02;
		this.angles.y += 0.02;
		this.angles.z += 0.02;

		let canvas = document.getElementById('main-canvas');
		let ctx = canvas.getContext('2d');
		ctx.fillStyle = 'black';
	
		let point = undefined;
		let points = [];
	
		for (let i = 0; i < this.VertexList.length; i++) {
			point = this.RotateVertex(this.VertexList[i]);
			// console.log(point);
			points.push(point);
      ctx.fillStyle = point.color;

      if(this.dots == 'rect') {
        // Rectangle 
        ctx.fillRect(point.x - this.point_size/2, point.y - this.point_size/2, this.point_size, this.point_size);
      } else if(this.dots == 'circ') {
        // Circle

        ctx.beginPath();
        ctx.arc(point.x, point.y, this.point_size, 0, 2 * Math.PI);
        ctx.fill();
      }
		}

    /*
    DrawLine(points[0], points[1]);
    DrawLine(points[1], points[3]);
    DrawLine(points[3], points[2]);
    DrawLine(points[2], points[0]);
    DrawLine(points[0], points[4]);
    DrawLine(points[5], points[4]);
    DrawLine(points[1], points[5]);
    DrawLine(points[4], points[6]);
    DrawLine(points[6], points[2]);
    DrawLine(points[6], points[7]);
    DrawLine(points[3], points[7]);
    DrawLine(points[5], points[7]);
    */

    DrawLine(points[0], points[1]);
    DrawLine(points[1], points[3]);
    DrawLine(points[3], points[2]);
    DrawLine(points[2], points[0]);

    DrawLine(points[4], points[0]);
    DrawLine(points[4], points[1]);
    DrawLine(points[4], points[2]);
    DrawLine(points[4], points[3]);
  
    
    for (let i = 0; i < this.VertexList.length; i++) {
      point = this.RotateVertex(this.VertexList[i]);
      // console.log(point);

      //ctx.font = '30px Arial';
      //ctx.fillText(i, point.x, point.y)



      
      points.push(point);
      ctx.fillStyle = point.color;

      if(this.dots == 'rect') {
        // Rectangle 
        ctx.fillRect(point.x - this.point_size/2, point.y - this.point_size/2, this.point_size, this.point_size);
      } else if(this.dots == 'circ') {
        // Circle

        ctx.beginPath();
        ctx.arc(point.x, point.y, this.point_size, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
	}

	RotateVertex(vertex) {
		let translatedVertex = new Point3D(
			vertex.x - this.center.x,
			vertex.y - this.center.y,
			vertex.z - this.center.z
		);

		const rotation_matrix_x = [
			[1, 0, 0],
			[0, Math.cos(this.angles.x), -Math.sin(this.angles.x)],
			[0, Math.sin(this.angles.x), Math.cos(this.angles.x)]
		];

		const rotation_matrix_y = [
			[Math.cos(this.angles.y), 0, Math.sin(this.angles.y)],
			[0, 1, 0],
			[-Math.sin(this.angles.y), 0, Math.cos(this.angles.y)]
		];

		const rotation_matrix_z = [
			[Math.cos(this.angles.z), -Math.sin(this.angles.z), 0],
			[Math.sin(this.angles.z), Math.cos(this.angles.z), 0],
			[0, 0, 1]
		];

		let multiplied = MultiplyMatrixVector(rotation_matrix_x, translatedVertex);
		let vert = new Point3D(multiplied[0], multiplied[1], multiplied[2]);

		multiplied = MultiplyMatrixVector(rotation_matrix_y, vert);
		vert = new Point3D(multiplied[0], multiplied[1], multiplied[2]);

		multiplied = MultiplyMatrixVector(rotation_matrix_z, vert);
		vert = new Point3D(multiplied[0], multiplied[1], multiplied[2], vertex.color);

		// console.log(`Vertex: ${JSON.stringify(vertex)}\nRotated Vertex: ${JSON.stringify(vert)}`);

		vert.x += this.center.x;
		vert.y += this.center.y;
		vert.z += this.center.z;

		
		let out = this.ProjectVertex(vert);

		return out;
	}
	
	ProjectVertex(vertex) {
		const matrix = [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 0]
		]


		let out = MultiplyMatrixVector(matrix, vertex);

		return new Point2D(out[0], out[1], vertex.color);
	}	
}
