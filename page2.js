// https://observablehq.com/@d3/color-schemes
// https://www.d3-graph-gallery.com/graph/pie_annotation.html
// https://www.nobelprize.org/prizes/facts/nobel-prize-facts/



// set the dimensions and margins of the graph
var width = 300
    height = 400
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
    chemistry: 111,
    economics: 51,
    literature: 112,
    medicine: 110,
    peace: 100,
    physics: 113,
};


var data_sum = 111 + 51 + 112 + 110 + 100 + 113 ;

var laureates = {
    chemistry: 184,
    economics: 84,
    literature: 116,
    medicine: 219,
    peace: 134,
    physics: 213,
};
var laureate_sum = 184 + 84 + 116 + 219 + 134 + 213;



// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(d3.schemeSet1);

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
  .text(function(d){ return  "\n" + Math.floor(d.data.value / data_sum * 100) + "%"   })
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 17)
    



  
svg.append("text")
    .attr("x", (width / 2))             
    .attr("y", 25)
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Prize per category (hover me)");

// Chart 2

// set the dimensions and margins of the graph
var width = 300
    height = 400
    margin = 50

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg2 = d3.select("#dataviz2")
    .append("svg").attr("width", width)
    .attr("height", height);
var g2 =  svg2.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



var data = laureates;
var laureate_sum = 175 + 78 + 113 + 211 + 130 + 204;





// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(d3.schemeSet1);

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
g2.selectAll('slices')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)


    
// Now add the annotation. Use the centroid method to get the best coordinates
g2.selectAll('slices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return  "\n" + Math.floor(d.data.value / laureate_sum * 100) + "%"   })
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 17)
    



  
svg2.append("text")
    .attr("x", (width / 2))             
    .attr("y", 25)
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Prize per laureate (hover me)");







// Key
var subjects = Object.keys(data)


console.log(subjects);

// Usually you have a color scale in your chart already
var color = d3.scaleOrdinal()
  .domain(subjects)
  .range(d3.schemeSet1);

// Add one dot in the legend for each name.
var size = 20

dataviz_key_svg = d3.select("#dataviz_key").append("svg").attr("height","200").attr("width","80");
dataviz_key_svg2 = d3.select("#dataviz_key2").append("svg").attr("height","200").attr("width","1");


dataviz_key_svg.selectAll("mydots")
  .data(subjects)
  .enter()
  .append("rect")
    .attr("x", 5)
    .attr("y", function(d,i){ return 25 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d){ return color(d)})

// Add one dot in the legend for each name.
dataviz_key_svg.selectAll("mylabels")
  .data(subjects)
  .enter()
  .append("text")
    .attr("x", 5 + size*1.2)
    .attr("y", function(d,i){ return 25 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
  .attr("text-anchor", "left")
  .attr("stroke", "black")
  .attr("stroke-width", ".4")
    .style("alignment-baseline", "middle")





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
      .text(Math.floor(d.value ))
  console.log(d.data.key)
  tooltip.select("#category").text(d.data.key);
})

var tooltip2 = d3.select("#dataviz2").append("div").attr("class","tooltip");
tooltip2.append("div").attr("class","name");
tooltip2.append("div").attr("class","count");
tooltip2.append("div").attr("class", "percentage");

console.log(svg);
  var arcs = g2.selectAll("path")
  arcs.on("mouseover", function (d) {
  tooltip2 = d3.select("#tooltip2");
      tooltip2
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px")
      .style("opacity", 1)
      .select("#value")
      .text(Math.floor(d.value ))
  console.log(d.data.key)
  tooltip2.select("#category").text(d.data.key);
})
