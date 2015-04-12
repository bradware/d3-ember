import Ember from 'ember';

export default Ember.Component.extend({

	onRender: function() {
		var data = [{
			'sale': '202',
			'year': '2000'
		}, {
			'sale': '215',
			'year': '2001'
		}, {
			'sale': '179',
			'year': '2002'
		}, {
			'sale': '199',
			'year': '2003'
		}, {
			'sale': '170',
			'year': '2004'
		},{
			'sale': '184',
			'year': '2007'
		},{
			'sale': '190',
			'year': '2010'
		}];

		var data2 = [{
			"sale": "152",
			"year": "2000"
		}, {
			"sale": "189",
			"year": "2002"
		}, {
			"sale": "179",
			"year": "2004"
		}, {
			"sale": "199",
			"year": "2006"
		}, {
			"sale": "134",
			"year": "2008"
		}, {
			"sale": "176",
			"year": "2010"
		}];

		var vis = d3.select('#visualisation'),
			WIDTH = 1000,
			HEIGHT = 500,
			MARGINS = {
				top: 20,
				right: 20,
				bottom: 20,
				left: 50
			},

			xScale = d3.scale.linear()
				.range([MARGINS.left, WIDTH - MARGINS.right])
				.domain([2000, 2010]), //these values are from the static data
			yScale = d3.scale.linear()
				.range([HEIGHT - MARGINS.top, MARGINS.bottom])
				.domain([134, 215]), //these values are from the static data

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
			.interpolate("basis");

		vis.append('svg:g') //appending x-axis to container
			.attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
			.attr("class","axis")
			.call(xAxis);

		vis.append('svg:g') //appending y-axis to container
			.attr('transform', 'translate(' + (MARGINS.left) + ',0)')
			.attr("class","axis")
			.call(yAxis);

		vis.append('svg:path')  //drawing the line
			.attr('d', lineGen(data))
			.attr('stroke', 'green')
			.attr('stroke-width', 2)
			.attr('fill', 'none');

		vis.append('svg:path') //drawing the second line
			.attr('d', lineGen(data2))
			.attr('stroke', 'blue')
			.attr('stroke-width', 2)
			.attr('fill', 'none');
	}.on('didInsertElement')
});