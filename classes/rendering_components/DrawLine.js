function DrawLine(point_0, point_1) {
	const canvas = document.getElementById('main-canvas');
	const ctx = canvas.getContext('2d');
  
	const grd = ctx.createLinearGradient(point_0.x, point_0.y, point_1.x, point_1.y);
	grd.addColorStop(0, point_0.color);
	grd.addColorStop(1, point_1.color);
  
	ctx.beginPath();
	ctx.moveTo(point_0.x, point_0.y);
	ctx.strokeStyle = grd;
	ctx.lineTo(point_1.x, point_1.y);
	ctx.stroke();
  }