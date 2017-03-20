import React, { Component } from 'react'
import * as d3 from 'd3'

var setWidth = 500;
var setHeight = 500;

class LineChart extends Component {
  renderChart() {
    var svg = d3.select('#linechart')
      .append('svg'),
      margin = {top: 20, right: 80, bottom: 30, left: 50},
      width = setWidth - margin.left - margin.right,
      height = setHeight - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseTime = d3.timeParse("%Y%m%d");
    
    var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);


    var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });

  }

  componentDidMount() {
    this.renderChart();
  }

  render() {
    return(
      <div>
        <div id='linechart'>
        </div>
      </div>
    )
  }
}

export default LineChart