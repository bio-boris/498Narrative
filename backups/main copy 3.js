var width = 500;
var height = 200;
var margin = ({ top: 20, right: 0, bottom: 30, left: 40 })

var x;
var y;
var xAxis;
var yAxis;


d3.csv("https://raw.githubusercontent.com/bio-boris/498Narrative/master/1914.csv", function (d) {
    return {
        year : +d.year,
        value : +d.value
    };
  }).then(function(data) {
      plot(data);
  });


function plot(data) {
    x = d3.scaleBand()
    .domain(data.map(d => d.year))
    .range([margin.left, width - margin.right])
    .padding(0.1)
    
    y = d3.scaleLinear()
    .domain([0, 10])
    .range([height - margin.bottom, margin.top])

    xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))

    yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    
    
    
    var svg = d3.select("svg");
    svg.attr("viewBox", [0, 0, width, height])
        .call(zoom);
    
    svg.append("g").
        attr("class", "bars")
        .attr("fill", "steelblue")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.year))
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value))
        .attr("width", x.bandwidth());
    
    svg.append("g")
        .attr("class", "x-axis")
        .call(xAxis);
    
    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis);
      
}

function zoom(svg) {
    const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];
  
    svg.call(d3.zoom()
        .scaleExtent([1, 8])
        .translateExtent(extent)
        .extent(extent)
        .on("zoom", zoomed));
  
    function zoomed() {
      x.range([margin.left, width - margin.right].map(d => d3.event.transform.applyX(d)));
      svg.selectAll(".bars rect").attr("x", d => x(d.name)).attr("width", x.bandwidth());
      svg.selectAll(".x-axis").call(xAxis);
    }
  }