// https://observablehq.com/@d3/color-schemes
// https://www.d3-graph-gallery.com/graph/pie_annotation.html
// https://www.nobelprize.org/prizes/facts/nobel-prize-facts/

// set the dimensions and margins of the graph
var width = 550
    height = 450
    margin = 50

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#dataviz")
    .append("svg").attr("width", width)
    .attr("height", height);
var g =  svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



var data = {
    chemistry: 113,
    economics: 111,
    literature: 110,
    medicine: 112,
    peace: 100,
    physics: 51,
};
var data_sum = 113 + 111 + 110 + 112 + 100 + 51;

var laureates = {
    chemistry: 175,
    economics: 78,
    literature: 113,
    medicine: 211,
    peace: 130,
    physics: 204,
};
var laureate_sum = 175 + 78 + 113 + 211 + 130 + 204;



// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(d3.schemeSet2);

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))
// Now I know that group A goes from 0 degrees to x degrees and so on.

// shape helper to build arcs:
var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
g.selectAll('slices')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

// Now add the annotation. Use the centroid method to get the best coordinates
g.selectAll('slices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return  d.data.key})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
    .style("font-size", 17)
  
svg.append("text")
    .attr("x", (width / 2))             
    .attr("y", 15)
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Hover to see percentages for each prize");

svg.append("text")
    .attr("x", width - 10)             
    .attr("y", 15)
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Hover to see percentages for each prize");


	//add  tooltip to paths
var tooltip = d3.select("#dataviz").append("div").attr("class","tooltip");
    tooltip.append("div").attr("class","name");
    tooltip.append("div").attr("class","count");
    tooltip.append("div").attr("class", "percentage");

console.log(svg);
var arcs = g.selectAll("path")
arcs.on("mouseover", function (d) {
    tooltip = d3.select("#tooltip");
        tooltip
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px")
        .style("opacity", 1)
        .select("#value")
        .text(Math.floor(d.value / 911 * 100))
    console.log(d.data.key)
    tooltip.select("#category").text(d.data.key);

})