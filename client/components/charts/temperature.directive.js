'use strict';

angular.module('foobotApp')
  .directive('temperature', function () {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function (scope, element) {

        scope.$watch('data', function (newVals) {
          return scope.render(newVals);
        }, true);

        scope.render = function (alldatas) {
          if (alldatas === undefined) return false;

          var data = [];

          var trueWidth = $('.col-sm-12').width();
          var maxHeight = 550;
          var minHeight = 200;
          var trueHeight = trueWidth / 2;
          if (trueHeight > maxHeight) trueHeight = maxHeight;
          if (trueHeight < minHeight) trueHeight = minHeight;

          var margin = { top: 10, right: 0, bottom: 20, left: 30 };
          var width = trueWidth - margin.left - margin.right;
          var height = trueHeight - margin.top - margin.bottom;

          for (var i = 0; i < alldatas.length; i++) {
            data[i] = {};
            data[i].date = moment.unix(alldatas[i][0]).toDate();
            data[i].value = alldatas[i][2];
          }

          var x = d3.time.scale()
              .range([0, width]);

          var y = d3.scale.linear()
              .range([height, 0]);

          var format = d3.time.format.multi([
            ['.%L', function (d) { return d.getMilliseconds(); }],
            [':%S', function (d) { return d.getSeconds(); }],
            ['%H:%M', function (d) { return d.getMinutes(); }],
            ['%Hh', function (d) { return d.getHours(); }],
            ['%a %d', function (d) { return d.getDay() && d.getDate() !== 1; }],
            ['%b %d', function (d) { return d.getDate() !== 1; }],
            ['%B', function (d) { return d.getMonth(); }],
            ['%Y', function () { return true; }]
          ]);

          var xAxis = d3.svg.axis()
              .scale(x)
              .ticks(5)
              .tickFormat(format)
              .orient('bottom');

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient('left');

          var area = d3.svg.area()
              .x(function (d) { return x(d.date); })
              .y0(height)
              .y1(function (d) { return y(d.value); });

          var svg = d3.select(element[0]).append('svg')
              .attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
            .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          var grad = svg.append('defs')
            .append('linearGradient')
            .attr({
              id: 'temperature-grad',
              x1: '0%',
              x2: '0%',
              y1: '100%',
              y2: '0%',
              gradientUnits: 'userSpaceOnUse'
            });

          grad.append('stop')
            .attr('offset', '0%')
            .style('stop-color', '#e74c3c');

          grad.append('stop')
            .attr('offset', '44.15%')
            .style('stop-color', '#e74c3c');

          grad.append('stop')
            .attr('offset', '44.15%')
            .style('stop-color', '#e67e22');

          grad.append('stop')
            .attr('offset', '56.4%')
            .style('stop-color', '#e67e22');

          grad.append('stop')
            .attr('offset', '56.4%')
            .style('stop-color', '#40d47e');

          grad.append('stop')
            .attr('offset', '70%')
            .style('stop-color', '#40d47e');

          grad.append('stop')
            .attr('offset', '70%')
            .style('stop-color', '#e67e22');

          grad.append('stop')
            .attr('offset', '80%')
            .style('stop-color', '#e67e22');

          grad.append('stop')
            .attr('offset', '80%')
            .style('stop-color', '#e74c3c');

          grad.append('stop')
            .attr('offset', '100%')
            .style('stop-color', '#e74c3c');

          x.domain(d3.extent(data, function (d) { return d.date; }));

          y.domain([0, 40]);

          svg.append('path')
              .datum(data)
              .attr('class', 'temperature-area area')
              .attr('fill', 'url(' + location.href + '#temperature-grad)')
              .attr('d', area);

          svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(0,' + height + ')')
              .call(xAxis);

          svg.append('g')
              .attr('class', 'y axis')
              .call(yAxis)
            .append('text')
              .attr('transform', 'rotate(-90)')
              .attr('y', 6)
              .attr('dy', '.71em')
              .style('text-anchor', 'end')
              .text('Degree (°C)');

          var tooltip = d3.select(element[0])
            .append('div')
            .attr('class', 'graph-tooltip');

          var vertical = d3.select(element[0])
            .append('div')
            .attr('class', 'vertical-bar')
            .style('height', height + 'px')
            .style('bottom', (margin.bottom + 5) + 'px');

          var bisectDate = d3.bisector(function (d) { return d.date; }).left;

          d3.select('.temperature-area').on('mousemove', function (d, i) {
            var mousex = d3.mouse(this)[0];
            var xValue = x.invert(mousex);

            var i = bisectDate(data, xValue, 1);

            var d0 = data[i - 1];
            var d1 = data[i];

            // work out which date value is closest to the mouse
            var d = mousex - d0[0] > d1[0] - mousex ? d1 : d0;

            var yValue = Math.round(d.value * 100) / 100;

            vertical.style('left', mousex + margin.left + 'px');
            var tooltipWidth = tooltip.style('width');
            tooltipWidth = tooltipWidth.substr(0, tooltipWidth.length - 2);
            tooltip.style('left', (mousex + margin.left - tooltipWidth / 2) + 'px');
            tooltip.style('bottom', height - (y(d.value)) + margin.bottom + 5 + 'px');

            d3.select(this)
              .classed('hover', true)
              .attr('stroke', 'white')
              .attr('stroke-width', '0.5px'),
              tooltip.html('<div class="tooltip-arrow"></div><div class="tooltip-inner"><p>' + yValue + '°C<br>' + moment(xValue).format('LLLL') + '</p></div>').style('visibility', 'visible');
          });

        };
      }
    };
  });
