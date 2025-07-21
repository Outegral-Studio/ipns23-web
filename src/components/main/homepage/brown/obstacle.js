export default class Obstacle {
	constructor(x, y, width, height, text) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.rotation = 0; //(Math.random() * 2 - 1)*50;
		this.text = text;
	}

	update() {}

	draw(ctx) {
		// Draw the box
		ctx.save();
		ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
		ctx.rotate(this.rotation);
		ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
		ctx.fillStyle = "#D9D9D9"; // PaleGreen color
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.restore();

		// Draw the text
		ctx.save();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "#000000";
		ctx.font = "italic 900 20px 'Noto Sans'"; // font-style, font-weight, font-size, and font-family
		ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
		ctx.restore();
	}
}
