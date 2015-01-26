var screenW = 800;
var screenH = 570;
/**
 * 坦克类
 * @param x
 * @param y
 * @param direct
 */
function Tank(x,y,direct) {
	this.x = x;
	this.y = y;
	this.direct = direct;
	this.speed = 10;
	this.color = {"barrel":"#FEF26E","cap":"#CBB463","body":"#BA9658"};
	this.moveUp = function() {
		if(this.y>0) {
			this.y-=this.speed;
			this.direct = 0;
		}
	};
	
	this.moveRight = function() {
		if(this.x<screenW-60) {
			this.x+=this.speed;
			this.direct = 1;
		}
	};
	
	this.moveDown = function() {
		if(this.y<screenH-60) {
			this.y+=this.speed;
			this.direct = 2;
		}
	};
	
	this.moveLeft = function() {
		if(this.x>0) {
			this.x-=this.speed;
			this.direct = 3;
		}
	};
	this.shoot = function() {
		bullets.push(new bullet(this.x,this.y,this.direct));
	};
	
	this.drawMe = function() {
		var num = 1;
		switch (this.direct) {
		case 0:
		case 2:
			var bodyX = this.x+12;
			var bodyY = this.y+10;
			var bodyW = 26;
			var bodyH = 40;
			//左履带
			ctx.fillStyle=this.color.body;
			ctx.fillRect(this.x,this.y,10,60);

			//右履带
			ctx.fillStyle=this.color.body;
			ctx.fillRect(this.x+40,this.y,10,60);

			//body
			ctx.fillStyle=this.color.body;
			ctx.fillRect(bodyX,bodyY,bodyW,bodyH);

			//炮筒
			ctx.beginPath();
			ctx.strokeStyle=this.color.barrel;
			ctx.lineWidth=1.5;
//			ctx.moveTo(bodyX+12,bodyY+13);
			ctx.moveTo(bodyX+(bodyW/2),bodyY+(bodyH/2));
			if(this.direct == 0) {
				ctx.lineTo(bodyX+13,bodyY-10);
			}else if(this.direct == 2){
				ctx.lineTo(bodyX+13,bodyY+(bodyH/2)*2+10);
			}
			ctx.stroke();
			ctx.closePath();

			//盖子
			ctx.beginPath();
			ctx.fillStyle=this.color.cap;
			ctx.arc(bodyX+12,bodyY+20,9,0,360,true);
			ctx.fill();
			ctx.closePath();
			break;
		case 1:
		case 3:
			var bodyX = this.x+10;
			var bodyY = this.y+12;
			var bodyW = 40;
			var bodyH = 26;
			//左履带
			ctx.fillStyle=this.color.body;
			ctx.fillRect(this.x,this.y,60,10);

			//右履带
			ctx.fillStyle=this.color.body;
			ctx.fillRect(this.x,this.y+40,60,10);

			//body
			ctx.fillStyle=this.color.body;
			ctx.fillRect(bodyX,bodyY,bodyW,bodyH);

			//炮筒
			ctx.beginPath();
			ctx.strokeStyle=this.color.barrel;
			ctx.lineWidth=1.5;
			ctx.moveTo(bodyX+(bodyW/2),bodyY+(bodyH/2));
			if(this.direct == 1) {
				ctx.lineTo(bodyX+(bodyW/2)*2+10,bodyY+13);
			}else if(this.direct == 3){
				ctx.lineTo(bodyX-10,bodyY+13);
			}
			ctx.stroke();
			ctx.closePath();

//			//盖子
			ctx.beginPath();
			ctx.fillStyle=this.color.cap;
			ctx.arc(bodyX+18,bodyY+13,9,0,360,true);
			ctx.fill();
			ctx.closePath();
			break;
		default:
			break;
		};
	};
}

/**
 * 自己坦克(使用了继承，对象冒充)
 */
function Hero(x,y,direct) {
	this.tank = Tank;
	this.tank(x,y,direct);
}


function bullet(x,y,direct) {
	this.x = x;
	this.y = y;
	this.direct = direct;
	this.raduis = 5;
	this.speed = 15;
	this.isLife = true;
	this.drawMe = function () {
		switch (direct) {
		case 0:
			drawCircle(this.x+25,this.y-=this.speed, this.raduis);
			break;
		case 1:
			drawCircle((this.x+=this.speed)+60, this.y+25, this.raduis);
			break;
		case 2:
			drawCircle(this.x+25, ((this.y)+=this.speed)+60, this.raduis);
			break;
		case 3:
			drawCircle(this.x-=this.speed, this.y+25, this.raduis);
			break;
		default:
			break;
		}
	};
	//是否击中
	this.isHit = function () {
		
	};
}

/**
 * 敌军
 * @param x
 * @param y
 * @param direct
 */
function Enemy(x,y,direct) {
	this.tank = Tank;
	this.tank(x,y,direct);
	this.color = {"barrel":"#00FEFE","cap":"#00FEFE","body":"#00A2B5"};
	this.speed = 1;
	this.count = 0;
	//人工智能
	this.smart = function() {
		if(this.count==0 || this.count>200) {
			 direct = Math.floor(Math.random() * ( 3 + 1));
			 this.count = 0;
		}
		console.info(this.count);
		switch (direct) {
			case 0://上
				this.moveUp();
			   break;
			case 1:
				this.moveRight();
			   break;
			case 2:
				this.moveDown();
				break;
			case 3:
				this.moveLeft();
				break;
		}
		this.count++;
	};
}

//function smart(enemy) {
//	var count = 0;
//	direct = Math.floor(Math.random() * ( 3 + 1));
//	while(count<200) {
//		switch (direct) {
//		case 0://上
//			enemy.moveUp();
//		   break;
//		case 1:
//			enemy.moveRight();
//		   break;
//		case 2:
//			enemy.moveDown();
//			break;
//		case 3:
//			enemy.moveLeft();
//			break;
//		}
//		count++;
//	}
//	direct = Math.floor(Math.random() * ( 3 + 1));
//	count = 0;
//	
//}

function drawCircle(x,y,r) {
	ctx.beginPath();
	ctx.fillStyle="#00FEFE";
	ctx.arc(x,y,r,0,360,true);
	ctx.fill();
	ctx.closePath();
}

//function drawTank(tank) {
//}