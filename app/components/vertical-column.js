import Ember from 'ember';

export default Ember.Component.extend({
	onRender: function() {
		var margin = {top: 20, right: 30, bottom: 30, left: 40},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		var x = d3.scale.ordinal() //uses ordinal
			.rangeRoundBands([0, width], 0.1);

		var y = d3.scale.linear() //uses linear
			.range([height, 0]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient('bottom');

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient('left')
			.ticks(10, '%');

		function type(d) {
			d.value = +d.value; // coerce to number
			return d;
		}

		var chart = d3.select('.chart')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		d3.tsv('https://d3-ember.herokuapp.com/data/letter-data.txt', type, function(error, data) {
			x.domain(data.map(function(d) { return d.name; }));
			y.domain([0, d3.max(data, function(d) { return d.value; })]);

			chart.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxis);

			chart.append('g')
				.attr('class', 'y axis')
				.call(yAxis)
				.append('text')
				.attr('transform', 'rotate(-90)')
				.attr('y', 6)
				.attr('dy', '.71em')
				.style('text-anchor', 'end')
				.text('Frequency');

			chart.selectAll('.bar')
				.data(data)
				.enter().append('rect')
				.attr('class', 'bar')
				.attr('x', function(d) { return x(d.name); })
				.attr('y', function(d) { return y(d.value); })
				.attr('height', function(d) { return height - y(d.value); })
				.attr('width', x.rangeBand());
		});
	}.on('didInsertElement')
});

// http://localhost:4200/data/letter-data.txt if running on local server using 'ember server' command