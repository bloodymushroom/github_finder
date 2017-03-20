import React, { Component } from 'react'
import * as d3 from "d3";

import { toJS } from 'mobx';
import { observer } from 'mobx-react'
import { user1, user2 } from '../mobx/Store'

import classNames from '../styles/style.css'

@observer
class RepoChart extends Component {
  constructor() {
    super()

    this.state = {
      dataset: user1.repos,
      width: 240,
      height: 240,
      radius: Math.min(240, 240) /2,
      color: d3.scaleOrdinal(d3.schemeCategory20b)
    }
  }

  makePieChart() {
    var dataset = user1.repos.filter((repo) => repo.starCount > 0);
    var width = 240;
    var height = 240;
    var radius = Math.min(width, height) /2 ;
    var color = d3.scaleOrdinal(d3.schemeCategory20b);

    var svg = d3.select('#starChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');
    
    var arc = d3.arc()
    .innerRadius(radius* 0.7)
    .outerRadius(radius);

    var pie = d3.pie()
    .value( d => d.starCount)
    .sort(null);

    var path = svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => this.state.color(d.data.name))

    var tooltip = d3.select('#chart')
    .append('div')
    .attr('class', classNames.tooltip);

    tooltip.append('div')
    .attr('class', 'label')

    tooltip.append('div')
    .attr('class', 'starCount')

    tooltip.append('div')
    .attr('class', 'percent')

    path.on('mouseover', d => {
      var totalStars = d3.sum(dataset.map( d => d.starCount));
      var percent = Math.round( 100 * d.starCount / totalStars);
      tooltip.select('.label').html(d.data.name);
      tooltip.select('.starCount').html(d.data.starCount);
      tooltip.select('.percent').html(percent + '%');
      tooltip.style('display', 'block')

    })

    path.on('mouseout', d => {
      tooltip.style('display', 'none');
    })
  }

  makeLegend() {
    var legendRectSize = 18;
    var legendSpacing = 4;
    var height = this.state.color.domain().length * (legendRectSize + legendSpacing)

    var svg = d3.select('#legend')
    .append('svg')
    .attr('width', this.state.width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (this.state.width / 5) +  ',' + (height/2) + ')');

    var legend = svg.selectAll('.legend')
    .data(this.state.color.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => {
      var height = legendRectSize + legendSpacing;
      var offset = height * this.state.color.domain().length / 2;
      var horz = -2 * legendRectSize;
      var vert = i * height - offset;
      return `translate(${horz}, ${vert})`
    })

    legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', this.state.color)
    .style('stroke', this.state.color)

    legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text( d => d)
  }

  addTooltip() {
    var tooltip = d3.select('#chart')
    .append('div')
    .attr('class', 'tooltip');

    tooltip.append('div')
    .attr('class', 'label')

    tooltip.append('div')
    .attr('class', 'starCount')

    tooltip.append('div')
    .attr('class', 'percent')

    return tooltip;
  }


  componentDidMount() {
    this.makePieChart();
    this.makeLegend();
    // setTimeout(this.makePieChart,1000)
  }

  render() {
    return (
      <div className={classNames.chartContainer} >
        <h1>Star Distribution</h1>
        <span>Total stars: {user1.totalStars}</span>
        <div id='starChart' />
        <span>Starred Repos</span><br/>
        <div className={classNames.legendContainer}>
          <div id='legend' />
        </div>
      </div>
    )
  }
}

export default RepoChart