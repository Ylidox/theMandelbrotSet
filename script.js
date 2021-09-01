const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = 750;// window.innerWidth;
const height = canvas.height = 500;// window.innerHeight;

ctx.transform(1, 0, 0, -1, 0, canvas.height);
ctx.translate(500, 250);

point = (x, y) => {
	return {x, y};
}

length = (point) => {
	return Math.hypot(point.x, point.y);
}

sum = (p1, p2) => {
	return point(p1.x + p2.x, p1.y + p2.y);
}

square = (p) => {
	return point(p.x ** 2 - p.y ** 2, 2 * p.x * p.y);
}

scaleAPoint = (p, scale) => {
	return point(p.x * scale, p.y * scale);
}

drawPoint = (p, radius = 1, color = 'red') => {
	ctx.beginPath();
		ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
		ctx.fillStyle = color;
		ctx.fill();
	ctx.closePath();
}

const recursionLimit = 100;

draw = (scale) => {
	for(let y = -1; y <= 1; y += 0.001){
		for(let x = -2; x <= 1; x += 0.001){
			
			let Z = point(0,0);
			let C = point(x, y);
			let i = 0;
			for(; i < recursionLimit; i++){
				Z = sum(square(Z), C);
				if (length(Z) > 2){
					break;
				}
			}
			let p = scaleAPoint(C, scale);
			if(i < 100) drawPoint(p, 1, `rgb(${i + 25}, ${i}, ${i + 50})`);
			else drawPoint(p, 1, 'rgb(255, 255, 255)');

		}
	}
}

draw(250);