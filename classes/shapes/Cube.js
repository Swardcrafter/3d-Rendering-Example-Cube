class Cube {
	constructor(center, size) {
		this.size = size;

		this.point_size = 5;

		// Define Center Vertex
		this.center = new Point3D(center[0], center[1], center[2]);

		this.angles = {
			x: 0,
			y: 0,
			z: 0
		};

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
			new Point3D(cms.x, cps.y, cms.z),
			new Point3D(cps.x, cps.y, cms.z),
			new Point3D(cms.x, cms.y, cms.z),
			new Point3D(cps.x, cms.y, cms.z),

			new Point3D(cms.x, cps.y, cps.z),
			new Point3D(cps.x, cps.y, cps.z),
			new Point3D(cms.x, cms.y, cps.z),
			new Point3D(cps.x, cms.y, cps.z)
		]
	}

	Render() {
		this.angles.x += 0.01;
		this.angles.y += 0.01;
		this.angles.z += 0.01;

		let canvas = document.getElementById('main-canvas');
		let ctx = canvas.getContext('2d');
		ctx.fillStyle = 'black';
	
		let point = undefined;
		let points = [];
	
		for (let i = 0; i < this.VertexList.length; i++) {
			point = this.RotateVertex(this.VertexList[i]);
			// console.log(point);
			points.push(point);
	
			// Rectangle 
			// ctx.fillRect(point.x - this.point_size/2, point.y - this.point_size/2, this.point_size, this.point_size);

			// Circle
			ctx.beginPath();
			ctx.arc(point.x, point.y, this.point_size, 0, 2 * Math.PI);
			ctx.fill();
		}

		ctx.beginPath();
		ctx.moveTo(points[0].x, points[0].y);
		ctx.lineTo(points[1].x, points[1].y);
		ctx.lineTo(points[3].x, points[3].y);
		ctx.lineTo(points[2].x, points[2].y);
		ctx.lineTo(points[0].x, points[0].y);
		ctx.lineTo(points[4].x, points[4].y);
		ctx.lineTo(points[6].x, points[6].y);
		ctx.lineTo(points[2].x, points[2].y);
		ctx.moveTo(points[6].x, points[6].y);
		ctx.lineTo(points[7].x, points[7].y);
		ctx.lineTo(points[3].x, points[3].y);
		ctx.moveTo(points[7].x, points[7].y);
		ctx.lineTo(points[5].x, points[5].y);
		ctx.lineTo(points[1].x, points[1].y);
		ctx.moveTo(points[5].x, points[5].y);
		ctx.lineTo(points[4].x, points[4].y);

		ctx.stroke();
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
		vert = new Point3D(multiplied[0], multiplied[1], multiplied[2]);

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

		return new Point2D(out[0], out[1]);
	}	
}
