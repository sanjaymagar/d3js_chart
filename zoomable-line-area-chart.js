function drawZoomableAreaChart(json, graphId) {

    if (!json) {
        console.log('Error drawZoomableAreaChart: Invalid Json.');
        return false;
    }

    const data = json,
        _width = document.getElementById(graphId).getAttribute("width"),
        _height = document.getElementById(graphId).getAttribute("height"),
        margin = {
            top: 40,
            right: 40,
            bottom: 30,
            left: 50
        },
        width = _width - margin.left - margin.right,
        height = _height - margin.top - margin.bottom - 50;
    // let parseDate = d3.timeParse('%Y-%m');
    let parseDate = d3.timeParse('%Y');

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

    // Scaling
    let xScale = d3.scaleTime()
        .domain(d3.extent(values, d => d.x))
        .range([0, width])
        .nice();

    console.log("Date", d3.extent(values, d => d.x))

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
            .tickSize(0)
        );

    let yAxis = svg.append('g')
        .attr('class', 'y-axis')
        .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
        .call(
            d3
            .axisLeft(yScale)
            .ticks(4)
            .tickSize(0)
        );

    // remove axis line
    xAxis.selectAll(".domain").remove()

    xAxis.selectAll('.tick text')
        .attr('y', 10)
        .call(wrap, 60)
        .attr('class', 'axis-label');

    yAxis.selectAll('.tick text')
        .attr('x', -8)
        .attr('class', 'axis-label');

    yAxis.selectAll(".domain").remove()


    /**********************************************************
     ************************Area Generator*******************
     **********************************************************/
    // create color range
    let color = ["#668aa6", "#ccd8e1"];

    let area = d3.area()
        .curve(d3.curveCardinal)        
        .x(d => xScale(d.x))
        .y0(height)
        .y1(d => yScale(d.y));

    let valueline = d3.line()
        .curve(d3.curveCardinal)
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

    svg.append('g')
        .attr('class', 'area-path')
        .append('path')
        .datum(values)
        .attr('d', area)
        .attr('fill', '#ded5e2')

    svg.append('g')
        .attr('class', 'line-path')
        .append('path')
        .datum(values)
        .attr('d', valueline)
        .style('fill', 'none')
        .style('stroke', '#5a2f6d')
        .style('stroke-width', 2);
}