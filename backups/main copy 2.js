
    
async function init() {
	console.log("Begin");
	var data = await d3.csv('https://raw.githubusercontent.com/bio-boris/498Narrative/master/1950.csv');
	console.log("Got Data");
	console.log(data.value);
	// var data_by_year = aggregate_data(data);
	plot(data);
}

function plot(data) {

    //Width and height
var w = 500;
var h = 100;
var barPadding = 1;

var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
  11, 12, 15, 20, 18, 17, 16, 18, 23, 25
];

//Create SVG element
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

//Add bars to the generated svg element
svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
    return i * (w / dataset.length);
  })
  .attr("y", function(d) {
    return h - (d * 4);
  })

//setting dynamic width for each bar with bar padding acting as the space between bars
.attr("width", w / dataset.length - barPadding)

//multiplying data value with 4 to increase the height of the bars 
.attr("height", function(d) {
  return d * 4;
})

//apply dynamic colors
.attr("fill", function(d) {
  return "rgb(5, 2, " + (d * 10) + ")";
});

//set the label
svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function(d) {
    return d;
  })
  .attr("text-anchor", "middle")
  .attr("x", function(d, i) {
    return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
  })
  .attr("y", function(d) {
    return h - (d * 4) + 14;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white");



}

init();