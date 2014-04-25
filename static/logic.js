xc.depends(["static/component/creatJS/core", "static/component/creatJS/lib/createjs"], function() {
	var src;
	function init() {
		src = "static/component/sound/rain.mp3";
		createjs.Sound.addEventListener("loadComplete", createjs.proxy(playSound, this));
		createjs.Sound.registerSound(src);
	}

	function playSound(evt) {
		if (evt.src == src) {
			soundInstance = createjs.Sound.play(src);
		}
	}

	init();
});

	setInterval(
		function(){
			updateSpeed()
		},2000
	);

function Rc(r, c) {
	this.row = r;
	this.col = c;
}

	var num = 0;
var space = 20;
var col = 50;
var row = 50;
var scene;
var car = new Array();
car.push(new Rc(3, 0));
car.push(new Rc(2, 0));
car.push(new Rc(1, 0));
car.push(new Rc(0, 0));
var x = 0;
var y = 1;
var dot;
var displayBox = 0;
function init(c, r) {

	scene = new Array();

	var show = $(".show");
	show.css({
		width : c * 12,
		height : r * 12
	});
	for (var a = 0; a < r; a++) {
		scene[a] = new Array();
		for (var b = 0; b < c; b++) {
			var temp = $("<span col='" + b + "' row='" + a + "'></span>");
			scene[a][b] = temp;
			show.append(temp);
		}
	}
	showcar();
}

function showdot() {
	var gap = $("span").not($(".select"));
	dot = gap.eq(random(gap.size())).addClass("dot");

}

function updateSpeed() {  
	$.ajax({
		type : "GET",
		url : "/getnum",
	}).done(function(ajax) {
		var resp = $.parseJSON(ajax); 
		space=resp.val; 
		console.log(space);
	});
};

function random(max) {
	return parseInt((Math.random() * 10000) % max);
}

function showcar() {
	var rc = car[0];

	if (rc.row + y > scene.length - 1 || rc.row + y < 0 || rc.col + x > scene[0].length - 1 || rc.col + x < 0) {
		alert("GAME OVER!");
		return;
	}

	var one = new Rc(car[0].row + y, car[0].col + x);
	if (scene[one.row][one.col].hasClass("select")) {
		alert("hit yourself....");
		return;
	}
	$(".select").removeClass("select");

	car.pop();
	car.splice(0, 0, one);

	for (var a = 0; a < car.length - 1; a++) {
		scene[car[a].row][car[a].col].addClass("select");
	}
	var rcNode = scene[rc.row][rc.col];
	if (rcNode.hasClass("dot")) {
		displayBox++;
		$(".displayBox").text(displayBox);
		var last = car[car.length - 1];
		var length = car.length;

		car.push(new Rc(last.row, last.col));

		rcNode.removeClass("dot");

		//play

		document.getElementById('audiotag1').play();

		showdot();
	}
	updateDirection();
	setTimeout(function() {
		showcar();
	}, space);

}

function updateDirection() {

	if (dot == null) {
		return;
	}
	var rc = car[0];
	var temp = parseInt(dot.attr("row")) - rc.row;
	var y1 = temp > 0 ? 1 : temp == 0 ? 0 : -1;
	var temp = parseInt(dot.attr("col")) - rc.col;
	var x1 = temp > 0 ? 1 : temp == 0 ? 0 : -1;
	if (x1 == 0) {
		x1 = 1;
		if (updateCheck(rc, 0, y1) || updateCheck(rc, 0, y1 * -1) || updateCheck(rc, x1, 0) || updateCheck(rc, x1 * -1, 0) || true) {
			return;
		}

	}

	if (y1 == 0) {
		y1 = 1;
		if (updateCheck(rc, x1 * -1, 0) || updateCheck(rc, x1, 0) || updateCheck(rc, 0, y1) || updateCheck(rc, 0, y1 * -1)) {
			return;
		}
	}
	if (updateCheck(rc, x1, 0) || updateCheck(rc, 0, y1) || updateCheck(rc, x1 * -1, 0) || updateCheck(rc, 0, y1 * -1)) {
		return;
	}

}

function updateCheck(rc, x1, y1) {
	var xTemp = rc.col + x1;
	var yTemp = rc.row + y1;
	if ((yTemp > scene.length - 1 || yTemp < 0 || xTemp > scene[0].length - 1 || xTemp < 0) || scene[yTemp][xTemp].hasClass("select")) {
		return false;
	} else {
		x = x1;
		y = y1;
		return true;
	}
}

$(function() {
	init(col, row);
	showdot();
});
