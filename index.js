import { getContext, FPS } from "./utils-module.js";

// กำหนดชื่อเรื่องของเอกสาร HTML
document.title = "6712231019 pongpisut toison sec1";
// กำหนดให้ฟังก์ชัน main ทำงานเมื่อ DOM ถูกโหลดเสร็จสมบูรณ์
document.addEventListener("DOMContentLoaded", main);

// ฟังก์ชันหลักที่ใช้ในการเริ่มต้นแอปพลิเคชัน ทำงานเมื่อ DOM ถูกโหลดเสร็จสมบูรณ์
function main(ev) {

	// ฟังก์ชันวาดต้นหญ้า 1 ต้น
	function drawGrass(ctx, x, y, height = 30, curve = 0, color = "#2b9f2bff") {
		ctx.save();
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.quadraticCurveTo(x + curve, y - height / 2, x, y - height);
		ctx.stroke();
		ctx.restore();
	}

	// อาร์เรย์เก็บข้อมูลต้นหญ้า
	const grassArray = [];
	const maxGrass = 250;
	const grassGrowRate = 0.001; // จำนวนต้นหญ้าที่เพิ่มต่อเฟรม

	function addGrass() {
		if (grassArray.length < maxGrass) {
			for (let i = 0; i < grassGrowRate && grassArray.length < maxGrass; i++) {
				const x = Math.random() * 800;
				const y = 250 + Math.random() * 350;
				const h = 18 + Math.random() * 18;
				const curve = (Math.random() - 0.5) * 10;
				grassArray.push({ x, y, h, curve });
			}
		}
	}

	function drawAllGrass(ctx) {
		for (const g of grassArray) {
			drawGrass(ctx, g.x, g.y, g.h, g.curve);
		}
	}
	// เข้าถึง context ของ canvas ที่มี id เป็น "myCanvas"
	const ctx = getContext("#myCanvas");

	// กำหนดค่าเริ่มต้นสำหรับแอปพลิเคชันในรูปแบบของอ็อบเจกต์ config
	const config = {
		width : 800,
		height : 600,
		bgColor : "white",
		debug : true,
	};

	// กำหนดขนาดของ canvas ตามค่า config
	ctx.canvas.width = config.width;
	ctx.canvas.height = config.height;

	let angle = 0;
	function draw() {
		// ใช้ FPS สำหรับการวัดอัตราเฟรมต่อวินาที
		FPS.update();

		// กำหนดสีพื้นหลังของ canvas และใช้ fillRect เพื่อเติมสีพื้นหลัง
		ctx.fillStyle = config.bgColor;
		ctx.fillRect(0, 0, config.width, config.height);
		// วาดรูปจากส่วนนี้ไป **แนะนำให้วาดจากรูปที่อยู่ด้านหลังไปด้านหน้าตามลำดับ**
		// ใช้ภาพจาก MP1-app-graphics-2d.jpg เป็นแนวทางในการวาดรูป แต่จะวาดอย่างไรก็ได้ตามต้องการ

		// TODO:
		ctx.save();
		// วาดสี่เหลี่ยมผืนผ้าสองสีแทนท้องฟ้าและพื้นดิน
		ctx.fillStyle = "rgba(0, 255, 255, 1)";
		ctx.fillRect(0, -50, 800, 700);
		ctx.fillStyle = "rgba(0, 255, 85, 1)";
		ctx.fillRect(0, 250, 800, 400);
		ctx.restore();

		// เพิ่มต้นหญ้าใหม่ทีละต้น
		addGrass();
		// วาดต้นหญ้าที่มีอยู่
		drawAllGrass(ctx);
		
		ctx.save();
		//วาดครีงวงกลมแทนเนินเขา
		ctx.beginPath(); // กำหนดให้เริ่มวาดเส้น
		ctx.arc(50, 250, 220, Math.PI, Math.PI*2); // กำหนดลักษณะเส้นที่วาด arc คือเส้นโค้ง
		ctx.fillStyle = "green"; // กำหนดสีสำหรับการเติมสี
		ctx.fill(); // เติมสี
		ctx.strokeStyle = "black"; // กำหนดสีเส้นขอบ
		ctx.lineWidth = 2; // กำหนดความหนาของเส้นขอบ
		ctx.stroke(); // วาดเส้นขอบ
		ctx.restore();
		
		ctx.save();
		// วาดสา มเหลี่ยม 3 รูปที่ต่อกันและมีสีที่ต่างกัน
		ctx.fillStyle = "rgba(55, 52, 52, 1)";
		ctx.beginPath();
		ctx.moveTo(200, 250);
		ctx.lineTo(600, 250);
		ctx.lineTo(500, 100);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = "rgba(122, 106, 106, 1)";
		ctx.beginPath();
		ctx.moveTo(500, 250);
		ctx.lineTo(600, 250);
		ctx.lineTo(500, 100);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = "rgba(150, 140, 140, 1)";
		ctx.beginPath();
		ctx.moveTo(600, 250);
		ctx.lineTo(800, 250);
		ctx.lineTo(500, 100);
		ctx.closePath();
		ctx.fill();
		ctx.restore();

		ctx.save();
		//สร้างเส้นโค้งแบบ bezier สีฟ้าแทนแม่น้ำ
		ctx.beginPath(); // เริ่มเส้นทางใหม่
		ctx.moveTo(300, 250); // จุดเริ่มต้นของ curve
		ctx.bezierCurveTo(300, 400, 500, 600, 400, 650); // วาด curve แบบ bezier
		ctx.strokeStyle = "cyan"; // กำหนดสีเส้น
		ctx.lineWidth = 50; // กำหนดความหนาของเส้น
		ctx.stroke();
		ctx.restore();

		ctx.save();
		// วาดเส้นโค้งแบบ quadratic แทนตัวอีกา
		ctx.beginPath();
		ctx.moveTo(300, 100);
		// เส้นโค้งเส้นที่ 1
		ctx.quadraticCurveTo(310, 70, 350, 100);
		// เส้นโค้งเส้นที่ 2 (เหมือนเส้นแรก แต่เลื่อนไปทางขวา)
		ctx.quadraticCurveTo(390, 70, 400, 100);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.restore();

		ctx.save();
		// สร้างสามเหลี่ยมที่หมุนได้แทนแฉกของดวงอาทิตย์
		// จุดหมุนคือจุดศูนย์กลางของสามเหลี่ยม (675, 91.67)
		ctx.translate(675, 91.67);
		ctx.rotate(angle);
		ctx.beginPath();
		ctx.moveTo(-75, -41.67); // (600-675, 50-91.67)
		ctx.lineTo(75, -41.67);  // (750-675, 50-91.67)
		ctx.lineTo(0, 83.33);    // (675-675, 175-91.67)
		ctx.closePath();
		ctx.fillStyle = "rgba(255, 255, 0, 1)";
		ctx.fill();
		ctx.restore();

		// เพิ่มมุมหมุน
		angle += 10;

		ctx.save();
		//สร้างวงกลมทับสามเหลี่ยมแทนดวงอาทิตย์
		ctx.beginPath(); // เริ่มเส้นทางใหม่
		ctx.arc(675, 90, 50, 0, Math.PI * 2); // วาดวงกลม
		ctx.fillStyle = "red"; // กำหนดสีเติมสำหรับวงกลม
		ctx.fill(); // เติมสีวงกลม
		ctx.restore();
		
		ctx.save();
		// วาดบ้าน
		ctx.fillStyle = "rgba(126, 123, 83, 1)";
		ctx.fillRect(600, 350, 100, 100);

		ctx.fillStyle = "rgba(107, 104, 86, 1)";
		ctx.fillRect(635, 400, 30, 50);
		
		ctx.fillStyle = "rgba(39, 38, 30, 1)";
		ctx.fillRect(600, 450, 20, 30);

		ctx.fillStyle = "rgba(39, 38, 30, 1)";
		ctx.fillRect(680, 450, 20, 30);

		ctx.fillStyle = "rgba(62, 47, 47, 1)";
		ctx.beginPath();
		ctx.moveTo(600, 350);
		ctx.lineTo(700, 350);
		ctx.lineTo(650, 300);
		ctx.closePath();
		ctx.fill();
		ctx.restore();

		ctx.save();
		// วาดลำต้นของต้นไม้
		ctx.fillStyle = "rgba(39, 38, 30, 1)";
		ctx.fillRect(60, 470, 50, 120);
		ctx.restore();

		ctx.save();	
		// วาดใบไม้ของต้นไม้โดยใช้วงกลมหลายๆวง
		ctx.beginPath(); // เริ่มเส้นทางใหม่
		ctx.arc(80, 400, 50, 0, Math.PI * 2); // วาดวงกลม
		ctx.fillStyle = "green"; // กำหนดสีเติมสำหรับวงกลม
		ctx.fill(); // เติมสีวงกลม

		ctx.beginPath(); // เริ่มเส้นทางใหม่
		ctx.arc(120, 450, 50, 0, Math.PI * 2); // วาดวงกลม
		ctx.fillStyle = "green"; // กำหนดสีเติมสำหรับวงกลม
		ctx.fill(); // เติมสีวงกลม


		ctx.beginPath(); // เริ่มเส้นทางใหม่
		ctx.arc(50, 450, 50, 0, Math.PI * 2); // วาดวงกลม
		ctx.fillStyle = "green"; // กำหนดสีเติมสำหรับวงกลม
		ctx.fill(); // เติมสีวงกลม
		ctx.restore();

		// แสดงข้อความ FPS บน canvas ถ้า config.debug เป็น true
		if (config.debug) FPS.show(ctx, 10, 28);

		// ใช้ requestAnimationFrame เพื่อเรียกใช้ฟังก์ชัน draw ต่อไป
		requestAnimationFrame(draw);
	}
	draw();
}