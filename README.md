# Day Planner
Visually minimal app to plan your daily routine: 
[App in action](http://raphii97.github.io/day-planner)

## Example
![Example](resources/example.png "Routine Circle")


## Usage
Customize your routine by changing the `plan` and `color` variables
```js
//start and duration are in hours
var plan = [
	{tag: "sleep", start: 0, duration: 8},
	{tag: "event", start: 16, duration: 2}
];

//add color to each tag
var color = {
	"sleep": "#222",
	"event": "#e74c3c"
};
```
