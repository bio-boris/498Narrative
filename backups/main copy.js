async function init() {
	console.log("Begin");
	var data = await d3.csv('https://raw.githubusercontent.com/bio-boris/498Narrative/master/nobel_by_year.csv');
	console.log("Got Data");
	console.log(data.value);
	// var data_by_year = aggregate_data(data);
	plot(data);
}

// d3.csv("https://raw.githubusercontent.com/bio-boris/498Narrative/master/xyz.csv", function(error, data) {


function plot(d) {
	var margin = {
		top: 10,
		right: 10,
		bottom: 90,
		left: 10
	};

	var width = 960 - margin.left - margin.right;

	var height = 500 - margin.top - margin.bottom;

	var xScale = d3.scaleOrdinal().rangeRoundBands([0, width], .03)

	var yScale = d3.scaleLinear().range([height, 0]);


	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");


	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");

	var svgContainer = d3.select("#my_dataviz").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g").attr("class", "container")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	xScale.domain(data.map(function (d) {
		return d.food;
	}));
	yScale.domain([0, d3.max(data, function (d) {
		return d.quantity;
	})]);


	//xAxis. To put on the top, swap "(height)" with "-5" in the translate() statement. Then you'll have to change the margins above and the x,y attributes in the svgContainer.select('.x.axis') statement inside resize() below.
	var xAxis_g = svgContainer.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (height) + ")")
		.call(xAxis)
		.selectAll("text");

	// Uncomment this block if you want the y axis
	/*var yAxis_g = svgContainer.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6).attr("dy", ".71em")
			//.style("text-anchor", "end").text("Number of Applicatons"); 
	*/


	svgContainer.selectAll(".bar")
		.data(data)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function (d) {
			return xScale(d.food);
		})
		.attr("width", xScale.rangeBand())
		.attr("y", function (d) {
			return yScale(d.quantity);
		})
		.attr("height", function (d) {
			return height - yScale(d.quantity);
		});


}


function plotx() {
	// https://insights.stackoverflow.com/survey/2018/#technology-most-loved-dreaded-and-wanted-languages
	const sample = [{
			language: 'Rust',
			value: 78.9,
			color: '#000000'
		},
		{
			language: 'Kotlin',
			value: 75.1,
			color: '#00a2ee'
		},
		{
			language: 'Python',
			value: 68.0,
			color: '#fbcb39'
		},
		{
			language: 'TypeScript',
			value: 67.0,
			color: '#007bc8'
		},
		{
			language: 'Go',
			value: 65.6,
			color: '#65cedb'
		},
		{
			language: 'Swift',
			value: 65.1,
			color: '#ff6e52'
		},
		{
			language: 'JavaScript',
			value: 61.9,
			color: '#f9de3f'
		},
		{
			language: 'C#',
			value: 60.4,
			color: '#5d2f8e'
		},
		{
			language: 'F#',
			value: 59.6,
			color: '#008fc9'
		},
		{
			language: 'Clojure',
			value: 59.6,
			color: '#507dca'
		}
	];

	const svg = d3.select('svg');
	const svgContainer = d3.select('#my_dataviz');

	const margin = 80;
	const width = 1000 - 2 * margin;
	const height = 600 - 2 * margin;

	const chart = svg.append('g')
		.attr('transform', `translate(${margin}, ${margin})`);

	const xScale = d3.scaleBand()
		.range([0, width])
		.domain(sample.map((s) => s.language))
		.padding(0.4)

	const yScale = d3.scaleLinear()
		.range([height, 0])
		.domain([0, 100]);

	// vertical grid lines
	// const makeXLines = () => d3.axisBottom()
	//   .scale(xScale)

	const makeYLines = () => d3.axisLeft()
		.scale(yScale)

	chart.append('g')
		.attr('transform', `translate(0, ${height})`)
		.call(d3.axisBottom(xScale));

	chart.append('g')
		.call(d3.axisLeft(yScale));

	// vertical grid lines
	// chart.append('g')
	//   .attr('class', 'grid')
	//   .attr('transform', `translate(0, ${height})`)
	//   .call(makeXLines()
	//     .tickSize(-height, 0, 0)
	//     .tickFormat('')
	//   )

	chart.append('g')
		.attr('class', 'grid')
		.call(makeYLines()
			.tickSize(-width, 0, 0)
			.tickFormat('')
		)

	const barGroups = chart.selectAll()
		.data(sample)
		.enter()
		.append('g')

	barGroups
		.append('rect')
		.attr('class', 'bar')
		.attr('x', (g) => xScale(g.language))
		.attr('y', (g) => yScale(g.value))
		.attr('height', (g) => height - yScale(g.value))
		.attr('width', xScale.bandwidth())
		.on('mouseenter', function (actual, i) {
			d3.selectAll('.value')
				.attr('opacity', 0)

			d3.select(this)
				.transition()
				.duration(300)
				.attr('opacity', 0.6)
				.attr('x', (a) => xScale(a.language) - 5)
				.attr('width', xScale.bandwidth() + 10)

			const y = yScale(actual.value)

			line = chart.append('line')
				.attr('id', 'limit')
				.attr('x1', 0)
				.attr('y1', y)
				.attr('x2', width)
				.attr('y2', y)

			barGroups.append('text')
				.attr('class', 'divergence')
				.attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
				.attr('y', (a) => yScale(a.value) + 30)
				.attr('fill', 'white')
				.attr('text-anchor', 'middle')
				.text((a, idx) => {
					const divergence = (a.value - actual.value).toFixed(1)

					let text = ''
					if (divergence > 0) text += '+'
					text += `${divergence}%`

					return idx !== i ? text : '';
				})

		})
		.on('mouseleave', function () {
			d3.selectAll('.value')
				.attr('opacity', 1)

			d3.select(this)
				.transition()
				.duration(300)
				.attr('opacity', 1)
				.attr('x', (a) => xScale(a.language))
				.attr('width', xScale.bandwidth())

			chart.selectAll('#limit').remove()
			chart.selectAll('.divergence').remove()
		})

	barGroups
		.append('text')
		.attr('class', 'value')
		.attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
		.attr('y', (a) => yScale(a.value) + 30)
		.attr('text-anchor', 'middle')
		.text((a) => `${a.value}%`)

	svg
		.append('text')
		.attr('class', 'label')
		.attr('x', -(height / 2) - margin)
		.attr('y', margin / 2.4)
		.attr('transform', 'rotate(-90)')
		.attr('text-anchor', 'middle')
		.text('Love meter (%)')

	svg.append('text')
		.attr('class', 'label')
		.attr('x', width / 2 + margin)
		.attr('y', height + margin * 1.7)
		.attr('text-anchor', 'middle')
		.text('Languages')

	svg.append('text')
		.attr('class', 'title')
		.attr('x', width / 2 + margin)
		.attr('y', 40)
		.attr('text-anchor', 'middle')
		.text('Most loved programming languages in 2018')

	svg.append('text')
		.attr('class', 'source')
		.attr('x', width - margin / 2)
		.attr('y', height + margin * 1.7)
		.attr('text-anchor', 'start')
		.text('Source: Stack Overflow, 2018')

}


function plot33(data) {
	var margin = {
			top: 20,
			right: 30,
			bottom: 40,
			left: 90
		},
		width = 800 - margin.left - margin.right,
		height = 800 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select("#my_dataviz")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

	// Parse the Data
	d3.csv("https://raw.githubusercontent.com/bio-boris/498Narrative/master/1950.csv", function (data) {

		// Add X axis
		var x = d3.scaleLinear()
			.domain([0, 25])
			.range([0, width]);
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x))
			.selectAll("text")
			.attr("transform", "translate(-10,0)rotate(-45)")
			.style("text-anchor", "end");

		// Y axis
		var y = d3.scaleBand()
			.range([0, height])
			.domain(data.map(function (d) {
				return d.year;
			}))
			.padding(.1);
		svg.append("g")
			.call(d3.axisLeft(y))

		//Bars
		svg.selectAll("myRect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", x(0))
			.attr("y", function (d) {
				console.log(d.year);
				return y(d.year);
			})
			.attr("width", function (d) {
				return x(d.value);
			})
			.attr("height", y.bandwidth())
			.attr("fill", "#69b3a2");


		svg.selectAll(".text")
			.data(data)
			.enter()
			.append("text")
			.attr("class", "label")
			.attr("x", (function (d) {
				return x(d.value) + x.rangeBand() / 2;
			}))
			.attr("y", function (d) {
				return y(d.year) + 1;
			})
			.attr("dy", ".75em")
			.text(function (d) {
				console.log(d.value);
				return d.value;
			});
	})

}


function plot2(da) {

	// set the dimensions and margins of the graph
	var margin = {
			top: 10,
			right: 30,
			bottom: 30,
			left: 60
		},
		width = 460 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select("#my_dataviz")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

	//Read the data
	d3.csv("https://raw.githubusercontent.com/bio-boris/498Narrative/master/nobel_by_year_1950.csv",

		// When reading the csv, I must format variables:
		function (d) {
			return {
				date: d3.timeParse("%Y-%m-%d")(d.date),
				value: d.value
			}
		},

		// Now I can use this dataset:
		function (data) {

			// Add X axis --> it is a date format
			var x = d3.scaleTime()
				.domain(d3.extent(data, function (d) {
					return parseInt(d.year);
				}))
				.range([0, width]);
			svg.append("g")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x));

			// Add Y axis
			var y = d3.scaleLinear()
				.domain([0, d3.max(data, function (d) {
					return +parseInt(d.value);
				})])
				.range([height, 0]);
			svg.append("g")
				.call(d3.axisLeft(y));

			// Add the line
			svg.append("path")
				.datum(data)
				.attr("fill", "none")
				.attr("stroke", "steelblue")
				.attr("stroke-width", 1.5)
				.attr("d", d3.line()
					.x(function (d) {
						return x(parseInt(d.year))
					})
					.y(function (d) {
						return y(parseInt(d.value))
					})
				)

		})

}


// # Page 1, histogram of nobel prizes

// console.log("YO");
init();