import Ember from 'ember';

export default Ember.Component.extend({
	onRender: function() {
		var mockdata = [4, 8, 15, 16, 23, 42];
		var scalarValue = d3.scale.linear()
			.domain([0, d3.max(mockdata)]) //using mock data
			.range([0, 420]);

		var chart = d3.select('.chart');
		var bar = chart.selectAll('div');
		var barUpdate = bar.data(mockdata); //using mock data
		var barEnter = barUpdate.enter().append('div');
		barEnter.style('width', function (d) {
			return scalarValue(d) + 'px';
		});
		barEnter.text(function (d) {
			return d;
		});
	}.on('didInsertElement'),

	onRenderDynamic: function() {
		var margin = {top: 10, right: 30, bottom: 30, left: 30},
			width = 500 - margin.left - margin.right,
			height = 600 - margin.top - margin.bottom;

		var x = d3.scale.linear() //uses ordinal
			.range([0, width]); //this needs to be width, 0

		var y = d3.scale.ordinal() //uses linear
			.rangeRoundBands([0, height], 0.1);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient('bottom')
			.ticks(10, '%');

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient('left');

		function type(d) {
			d.value = +d.value; // coerce to number
			return d;
		}

		var chart = d3.select('.svg-chart')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		d3.tsv('http://localhost:4200/data/letter-data.txt', type, function(error, data) {
			y.domain(data.map(function(d) {
				return d.name; }));
			x.domain([0, d3.max(data, function(d) { return d.value; })]);

			chart.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxis)
				.append('text')
				.attr('transform', 'rotate(0)')
				.attr('x', 25)
				.attr('y', 28)
				.attr('dx', '1em')
				.style('text-anchor', 'end')
				.text('Frequency');

			chart.append('g')
				.attr('class', 'y axis')
				.call(yAxis);

			chart.selectAll('.bar')
				.data(data)
				.enter().append('rect')
				.attr('class', 'bar')
				.attr('x', function() { return 0; })
				.attr('y', function(d) { return y(d.name); })
				.attr('height', y.rangeBand())
				.attr('width', function(d) { return x(d.value); });
		});
	}.on('didInsertElement')
});

//https://d3-ember.herokuapp.com/data/letter-data.txt