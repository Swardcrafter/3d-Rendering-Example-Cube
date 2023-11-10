function MultiplyMatrixVector(matrix, vector) {
	const result = [];
	for (let i = 0; i < matrix.length; i++) {
		let sum = 0;
		for (let j = 0; j < matrix[i].length; j++) {
			if(j == 0) { sum += matrix[i][j] * vector.x; }
			if(j == 1) { sum += matrix[i][j] * vector.y; }
			if(j == 2) { sum += matrix[i][j] * vector.z; }
		}
		result[i] = sum;
	}
	return result;
}
