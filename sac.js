function drawSimpleAreaChart(json, graphId) {

  if (!json) {
      console.log('Error drawZoomableAreaChart: Invalid Json.');
      return false;
  }

  const data = json,
      circleRadius = 5,
      hoverCircleRadius = 7,
      _width = document.getElementById(graphId).getAttribute("width"),
      _height = document.getElementById(graphId).getAttribute("height"),
      margin = {
          top: 40,
          right: 40,
          bottom: 30,
          left: 50
      },
      width = _width - margin.left - margin.right,
      height = _height - margin.top - margin.bottom - 50,
      parseDate = d3.timeParse('%Y');

  // 2. Add a SVG to draw the graph on
  let svg = d3
      .select("#" + graphId)
      .append("g")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "none");

  // data manipulation
  let values = data.data.values
  // 1. sorting data
  values.sort((a, b) => a.x - b.x)

  // 2. parse
  values.map(d => {
      d.x = parseDate(d.x);
      d.y = +d.y;
  });

  // 3. handling negative value into zero
  values.map(d => (d.y < 0) ? d.y = 0 : d.y)

  // 5. find out the maximum y-value for scaling
  const yMaxValue = Math.max(...values.map(d => d.y))
  const yLabel = data.meta.y_axis_label;

  // Scaling
  let xScale = d3.scaleTime()
      .domain(d3.extent(values, d => d.x))
      .range([0, width])
      .nice();

  let yScale = d3.scaleLinear()
      .domain([0, yMaxValue])
      .range([height, 0])
      .nice();
      
  // create axes
  let xAxis = svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(' + 0 + ',' + height + ')')
      .call(d3
          .axisBottom(xScale)
          .ticks(4)
          // .tickSize(0)
          .tickSizeOuter(0)
      );

  let yAxis = svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
      .call(
          d3
          .axisLeft(yScale)
          .ticks(4)
          // .tickSize(0)
          .tickFormat((d)=> {
            return d3.format('.0s')(d)
          })
          .tickSizeOuter(0)
      );

  // remove axis line
  // xAxis.selectAll(".domain").remove()

  // xAxis.selectAll('.tick text')
  //     .attr('y', 10)
  //     .attr('class', 'axis-label');

  // yAxis.selectAll('.tick text')
  //     .attr('x', -8)
  //     .attr('class', 'axis-label');

  // yAxis.selectAll(".domain").remove()
  

  let yLabelLegend = svg.append('text')
      .attr('transform', 'translate(' + 0 + ',' + (-10) + ')');

  yLabelLegend.append('tspan')
    .attr('class', 'y-legend-label')
    .attr('x', -30)
    .attr('y', -10)
    .text(yLabel);

  svg.append('text')
    .attr("transform", "translate(200," + (height + 50) + ")")
    .attr("transform", "translate(" + (width / 2) + "," + (height + 50) + ")")
    .attr("class", "y-legend-label")
    .append('tspan')
    .attr('x', -15)
    .attr('dy', -5)
    .text(() => data.meta.x_axis_label);
  /**********************************************************
   ************************Area Generator*******************
   **********************************************************/
  // create color range
  let color = "#668aa6";

  let area = d3.area()
      .x(d => xScale(d.x))
      .y0(height)
      .y1((d, i) => yScale(d.y));

  svg.append('g')
      .attr('class', 'area-path')
      .append('path')
      .datum(data.data.values)
      .attr('d', area)
      .attr('fill', color)


  // Tooltip div size
  var div = d3
    .select("div")
    .append("g")
    .attr("class", "tooltip")
    .style("opacity", 0.9)
    .style('display', 'none')


  // Add the scatter plot
  svg.selectAll("circle")
      .data(data.data.values)
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", circleRadius)
      .style("fill", color)
      .style('stroke', '#fff')
      .style('stroke-width', '2')
      .on("mouseover", function (d) {
        d3.select(this)
            .transition()
            .duration(100)
            .attr('r', hoverCircleRadius)
            .style('fill', '#00006f');
          
        div.style("display", null)

      })
      .on("mouseout", function () {
          d3.select(this)
              .transition()
              .duration(100)
              .attr('r', circleRadius)
              .style('fill', color);

          div.style("display", "none")
      })
      .on("mousemove", (d, i) => {
          div.html("Date: " + formatTimeTip(d.x) + "<br/>" + "Member : " + formatData(d.y) )
              .style("left", (d3.event.pageX - 70) + "px")
              .style("top", (d3.event.pageY - 55) + "px");
      });

  // Transform legend group
  var legend = svg.append("g")
      .attr("transform", "translate(0, " + (height - 175) + ")");

  // Legends symbol -circle
  legend.append("g")
    .append("circle")
    .attr("class", "circle-style")
    .attr("cx", 80)
    .attr("cy", 240)
    .attr("r", circleRadius)
    .attr("fill", color);

  // Legend text - ["Actual Spend", "Projected"]
  legend.append("g")
    .append("text")
    .attr("x", 90 )
    .attr("y", 243)
    .attr("class", "legend-style")
    .text(data.meta.legends_name)
}