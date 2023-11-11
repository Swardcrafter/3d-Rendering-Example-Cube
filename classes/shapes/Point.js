class Point3D {
	constructor(x, y, z, color='black') {
		this.x = parseFloat(x),
		this.y = parseFloat(y),
		this.z = parseFloat(z);
		this.color = color;

		this.pos = [this.x, this.y, this.z];
	}
}

class Point2D {
	constructor(x, y, color='black') {
		this.x = parseFloat(x),
		this.y = parseFloat(y);
		this.color = color;

		this.pos = [this.x, this.y];
	}
}