/*
	Customization variables
*/
var plan = [
	{tag: "sleep", start: 0, duration: 8},
	{tag: "eat", start: 8, duration: 1},
	{tag: "study", start: 9, duration: 1},
	{tag: "work", start: 10, duration: 1},
	{tag: "fitness", start: 11, duration: 2},
	{tag: "eat", start: 13, duration: 1},
	{tag: "work", start: 14, duration: 3},
	{tag: "study", start: 17, duration: 2},
	{tag: "eat", start: 19, duration: 1},
	{tag: "movie", start: 20, duration: 2}
];

var color = {
	"eat": "#f1c40f",
	"work": "#1abc9c",
	"fitness": "#e74c3c",
	"study": "#3498db",
	"movie": "#34495e",
	"sleep": "#222"
};

/*
	CANVAS
*/
var c = document.getElementById("c");
var $ = c.getContext("2d");
var h, w;

/*
	CIRCLE object
*/
var circle = {
	unit: 2 * Math.PI / 24
};

circle.init = function(){
	h = c.height = window.innerHeight;
	w = c.width = window.innerWidth;
	
	circle.x = w / 2;
	circle.y = h / 2;
	
	circle.radius = (h > w ? w : h) / 3;
	
	circle.draw();
	timer();
};

circle.draw = function(){
	//outline
	$.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	$.arc(this.x, this.y, this.radius / 2, 0, 2 * Math.PI);
	$.lineWidth = ".1";
	$.stroke();

	//events
	for(var i in plan){
		var event = plan[i];

		$.beginPath();
		$.arc(this.x, this.y, this.radius, this.unit * event.start, this.unit * (event.duration + event.start));
		$.lineTo(this.x, this.y);
		$.closePath();
		
		$.fillStyle = color[event.tag];
		$.fill();
	}
	
	//middle empty space
	$.beginPath();
	$.arc(this.x, this.y, this.radius / 2, 0, 2 * Math.PI);
	$.closePath();
	
	$.fillStyle = "#fff";//bg color
	$.fill();
};

/*
	TIME INDICATOR
*/
function timer(){
	var d = new Date();
	var rad = (d.getHours() + d.getMinutes() / 60) * circle.unit;

	$.beginPath();
	$.arc(Math.cos(rad) * (circle.radius + 20) + circle.x, Math.sin(rad) * (circle.radius + 20) + circle.y, circle.radius / 50, 0, 2 * Math.PI);
	$.closePath();

	$.fillStyle = "#222";
	$.fill();
}

/*
	SIDEBAR	todo cleanup
*/
function sidebar(){
	var all = 0;
	for(var i in color){
		var el = document.createElement("div");

		var totalhours = document.createElement("p");
		var total = 0;
		for(var j in plan){
			if(plan[j].tag == i){
				total += plan[j].duration;
				all += plan[j].duration;
			}
		}
		totalhours.innerHTML = total + "h";
		el.appendChild(totalhours);

		var box = document.createElement("div");
		box.style.background = color[i];
		el.appendChild(box);

		var name = document.createElement("p");
		name.innerHTML = i;
		el.appendChild(name);

		document.getElementById('sidebar').appendChild(el);
	}

	var el = document.createElement("div");

	var totalhours = document.createElement("p");
	totalhours.innerHTML = 24 - all + "h";
	el.appendChild(totalhours);

	var box = document.createElement("div");
	box.style.background = "#eee";
	el.appendChild(box);

	var name = document.createElement("p");
	name.innerHTML = "freetime";
	el.appendChild(name);

	document.getElementById('sidebar').appendChild(el);
}

/*
	INIT
*/
//resize event listener
window.addEventListener("resize", circle.init);

//start the engines
circle.init();
sidebar();