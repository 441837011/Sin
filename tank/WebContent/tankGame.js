var canvas = document.getElementById("main");
var ctx = canvas.getContext("2d");
var hero = new Hero(50,500,0);
var enemys = new Array();
var bullets = new Array();
for(var i=0; i<3; i++) {
	var enemy = new Enemy(50+(i*80),50,2);
	enemys.push(enemy);
}

function flushMap() {
	//把画布清理
	ctx.clearRect(0,0,800,600); 
	//画自己
	hero.drawMe();
	//画敌军
	for(var i=0; i<enemys.length; i++) {
		enemys[i].drawMe();
		enemys[i].smart();
	}
	//画炮弹
	for(var i=0; i<bullets.length; i++) {
		document.getElementById("info").innerText="子弹数="+bullets[i].x;
		if(bullets[i].x<=0|| bullets[i].x>=screenW || bullets[i].y<=0 || bullets[i].y>=screenH ) {
			bullets[i].isLife = false;
		}else {
			bullets[i].drawMe();
		}
	}
	//移除死去炮弹
	for(var i=0;i<bullets.length; i++) {
		if(!bullets[i].isLife) {
			bullets.splice(i,1);
		}
	}
	
	document.getElementById("info").innerText="子弹数="+bullets.length;
}

function getCommand(){
	var code=event.keyCode;
	switch(code){
	case 87://上
	   hero.moveUp();
	   break;
	case 68:
	   hero.moveRight();
	   break;
	case 83:
		hero.moveDown();
		break;
	case 65:
		hero.moveLeft();
		break;
	case 74:
		hero.shoot();
		break;
	}
}

setInterval(flushMap, 10);
