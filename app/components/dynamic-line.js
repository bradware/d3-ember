import Ember from 'ember';

export default Ember.Component.extend({

	onRender: function() {
		var data = [{
			'Client': 'ABC',
			'sale': '202',
			'year': '2000'
		}, {
			'Client': 'ABC',
			'sale': '215',
			'year': '2002'
		}, {
			'Client': 'ABC',
			'sale': '179',
			'year': '2004'
		}, {
			'Client': 'ABC',
			'sale': '199',
			'year': '2006'
		}, {
			'Client': 'ABC',
			'sale': '134',
			'year': '2008'
		}, {
			'Client': 'ABC',
			'sale': '176',
			'year': '2010'
		}, {
			'Client': 'XYZ',
			'sale': '100',
			'year': '2000'
		}, {
			'Client': 'XYZ',
			'sale': '215',
			'year': '2002'
		}, {
			'Client': 'XYZ',
			'sale': '179',
			'year': '2004'
		}, {
			'Client': 'XYZ',
			'sale': '199',
			'year': '2006'
		}, {
			'Client': 'XYZ',
			'sale': '134',
			'year': '2008'
		}, {
			'Client': 'XYZ',
			'sale': '176',
			'year': '2013'
		}];

		var vis = d3.select('#visualisation'),
			WIDTH = 1000,
			HEIGHT = 500,
			MARGINS = {
				top: 50,
				right: 20,
				bottom: 50,
				left: 50
			},

			xScale = d3.scale.linear()
				.range([MARGINS.left, WIDTH - MARGINS.right])
				.domain([d3.min(data, function(d) {
					return d.year;
				}),
					d3.max(data, function(d) {
						return d.year;
					})]),
			yScale = d3.scale.linear()
				.range([HEIGHT - MARGINS.top, MARGINS.bottom])
				.domain([d3.min(data, function(d) {
					return d.sale;
				}),
					d3.max(data, function(d) {
						return d.sale;
					})]),

			xAxis = d3.svg.axis()
				.scale(xScale),

			yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left');

		var lineGen = d3.svg.line()
			.x(function(d) {
				return xScale(d.year);
			})
			.y(function(d) {
				return yScale(d.sale);
			})
			.interpolate('basis');

		var dataGroup = d3.nest() //datagroup is a very important variable
			.key(function(d) {
				return d.Client;
			})
			.entries(data);

		vis.append('svg:g') //appending x-axis to container
			.attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
			.attr('class','axis')
			.call(xAxis);

		vis.append('svg:g') //appending y-axis to container
			.attr('transform', 'translate(' + (MARGINS.left) + ',0)')
			.attr('class','axis')
			.call(yAxis);

		dataGroup.forEach(function(d, i) {  //drawing the line dynamically for each data group
			vis.append('svg:path')
				.attr('d', lineGen(d.values))
				.attr('stroke', function() { //drawing random colors for each of the lines
					return 'hsl(' + Math.random() * 360 + ',100%,50%)';
				})
				.attr('stroke-width', 2)
				.attr('fill', 'none')
				.attr('id', 'line_'+ d.key);
			//Adding legends
			var lSpace = WIDTH/dataGroup.length;
			vis.append('text')
				.attr('x', (lSpace / 2) + i * lSpace)
				.attr('y', HEIGHT)
				.attr('class', 'legend')
				.style('fill', 'black')
				.text(d.key)
				.on('click', function() {
					alert(d.key);
				});
		});
	}.on('didInsertElement')
});