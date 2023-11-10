class Point3D {
	constructor(x, y, z) {
		this.x = parseFloat(x),
		this.y = parseFloat(y),
		this.z = parseFloat(z);

		this.pos = [this.x, this.y, this.z];
	}
}

class Point2D {
	constructor(x, y) {
		this.x = parseFloat(x),
		this.y = parseFloat(y);

		this.pos = [this.x, this.y];
	}
}