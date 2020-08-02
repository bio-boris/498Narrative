//https://www.thehindu.com/news/international/an-age-and-gender-wise-breakdown-of-nobel-laureates-from-1901-to-2019/article29689522.ece


dataviz_key_svg2 = d3.select("#dataviz_key").append("svg").attr("height","200").attr("width","1");


function displayChart() {
  var x = document.getElementById("mySelect").value;
  switch(x) {
    case 'chemistry':
      update(chemistry_data,'red')

      break;
    case 'economics':
      update(economics_data,'blue')
      break;
    case 'literature':
      update(literature_data,'green')
      break;
    case 'medicine':
      update(medicine_data,'purple')
      break;
    case 'peace':
      update(peace_data,'orange')
      break;
    case 'physics':
      update(physics_data,'yellow')
      break;
    default:
      update(overall_data,'silver')
  } 



}

function plot(chart) {
  if (chart == 'age') {
    if (!data)
      return draw('age')
    else
      return redraw('age')
  }
  if (chart == 'demographics') {
    if(!data)
      return draw('age')
    else
      return redraw('age')
  }
    return clearChart()
}



var chemistry_data = [
  { group: "Youngest", value: 35, name: 'Frédéric Joliot', },
  { group: "Average", value: 60},

  {group:"Oldest", value: 97, name: 'John B. Goodenough', }
];

var economics_data = [
  { group: "Youngest", value: 46, name: 'Esther Duflo', },
  { group: "Average", value: 67},

  {group:"Oldest", value: 90, name: 'Leonid Hurwicz', }
];

var literature_data = [
  { group: "Youngest", value: 41, name: 'Rudyard Kipling', },
  { group: "Average", value: 66},

  {group:"Oldest", value: 88, name: 'Doris Lessing', }
];

var medicine_data = [
  { group: "Youngest", value: 32, name: 'Frederick G. Banting', },
  { group: "Average", value: 60},
  {group:"Oldest", value: 87, name: 'Peyton Rous', }
];

var peace_data = [
  { group: "Youngest", value: 17, name: 'Malala Yousafzai', },
  { group: "Average", value: 64},
  {group:"Oldest", value: 87, name: 'Joseph Rotblat', }
];

var physics_data = [
  { group: "Youngest", value: 25, name: 'Lawrence Bragg', },
  { group: "Average", value: 56},

  {group:"Oldest", value: 96, name: 'Arthur Ashkin', }
];

var overall_data = [
  { group: "Youngest", value: 17, name: 'Malala Yousafzai', },
  { group: "Average", value: 59},

  {group:"Oldest", value: 98, name: 'John B. Goodenough', }
];




// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
   width = 460 - margin.left - margin.right,
   height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#dataviz")
 .append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
 .append("g")
   .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");

// X axis
var x = d3.scaleBand()
 .range([ 0, width ])
 .domain(chemistry_data.map(function(d) { return d.group; }))
 .padding(0.2);
svg.append("g")
 .attr("transform", "translate(0," + height + ")")
 .call(d3.axisBottom(x))

// Add Y axis
var y = d3.scaleLinear()
 .domain([0, 100])
 .range([ height, 0]);
svg.append("g")
 .attr("class", "myYaxis")
 .call(d3.axisLeft(y));

// A function that create / update the plot for a given variable:
function update(data, category) {



  console.log("Updating with")
  console.log(data)
 

 
  var u = svg.selectAll("rect")
   .data(data)

 u
   .enter()
   .append("rect")
   .merge(u)
   .transition()
   .duration(1000)
     .attr("x", function(d) { return x(d.group); })
     .attr("y", function(d) { return y(d.value); })
     .attr("width", x.bandwidth())
     .attr("height", function(d) { return height - y(d.value); })
    .attr("fill", category)

  var text = svg.selectAll(".text")
 
  
  var text2 = svg.selectAll(".label")
  text2.remove();
 		
	  text.data(data)
	  .enter(function(d){ console.log('exit')})
	  .append("text")
	  .attr("class","label")
    .attr("x", function(d) { return x(d.group) + 40 })
    .attr("y", function(d) { return y(d.value) - 20 })
	  .attr("dy", ".75em")
    .text(function (d) { console.log(d.value); return d.value; })
    .exit(function(d){ console.log('exit')})
  
  
}




// Initialize the plot with the first dataset
update(chemistry_data,'red')