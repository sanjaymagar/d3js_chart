function drawZoomableAreaChart(json, graphId) {
    if(!json) return console.log("Error Zoomable Area Chart: Invalid Json");

    let _width = document.getElementById(graphId).getAttribute("width"),
        _height = document.getElementById(graphId).getAttribute("height"),
        margin = { top: 30, right: 45, bottom: 10, left: 40 },
        width = _width - margin.left - margin.right,
        height = _height - margin.top - margin.bottom - 50;
        
    let svg = d3.select('#'+graphId)
        .append('g')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'none');

    let parseDate = d3.timeParse('%Y-%m');
    let data = json,
        values = data.data.values;

    // Find the max Y value
    let yMax = d3.max(values.map(d => d.y)),
        yLabel = data.meta.y_axis_label,
        unit = data.meta.y_axis_unit,
        benchmark = parseFloat(data["options"]["benchmark"]),
        legends_label = data.meta.legends_name,
        circleRadius = 5,
        color = data["meta"]["color_field"];
        
    let yScaleValue = (benchmark > yMax) ? benchmark : yMax;

    // get month and last 2 digit of full year
    let formatDate = (d) => {
        let last2Digit = parseInt(new Date(d).getFullYear().toString().substr(-2));
        return d3.timeFormat('%b')(new Date(d))+' '+last2Digit;
    }

    // parse the data
    values.map(d => {
        d.x=parseDate(d.x)
    })

    // handling negative value
    values.map(d => (d.y < 0) ? d.y = 0 : d.y)

    // scaling
    let xScale = d3
        .scaleTime()
        .domain(d3.extent(values.map(d => d.x)))
        .range([0, width]);

    let yScale = d3
        .scaleLinear()
        .domain([0, yScaleValue])
        .range([height, 0])
        .nice();

    let xAxis = svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', 'translate(' + 0 + ',' + height + ')')
            .call(
                d3.axisBottom(xScale)
                    .tickSize(0) 
                    .tickFormat(formatDate)
            );
    
    // Rotate x-axis with 90 degree angle
    xAxis.selectAll(".tick text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".1em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

    let yAxis = svg.append('g')
            .attr('class', 'y-axis')
            .attr('transform', 'translate('+ 0 +','+ 0 +')')
            .call(
                d3.axisLeft(yScale)
                    .ticks(3)
                    .tickSize(0)
            );

    // Remove axis domain line
    xAxis.select('.domain').remove();
    yAxis.select('.domain').remove();

    // y-axis labeling
    let label = svg.append('g')
                .append('text')
                .attr('class', 'label')
                .attr("transform", "translate(" + (-30) + ", " + (-10) + ")");

    label.append('tspan')
            .attr('class', 'y-legend-label')
            .attr('x', 0)
            .attr('y', -13)
            .text(yLabel);

    if(yMax > 1000) {
        label.append('tspan')
            .attr('class', 'y-legend-label')
            .attr('x', 0)
            .attr('y', -4)
            .text(`(${unit})`);
    }    

    // Add a clipPath: everything out of this area won't be drawn.
    svg.append('clipPath')
            .attr('id', 'clip_'+graphId)
            .append('rect')
            .attr('width', width)
            .attr('height', (height+15))
            .attr("x", 0)
            .attr("y", -10);

    // Area Generator
    let area = d3.area()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.x))
                .y0(height)
                .y1(d => yScale(d.y));
            
    let line = d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));

    svg.append('g')
            .append('path')
            .datum(values)
            .attr('class', 'area-path')
            .attr('style', '-webkit-clip-path: url(#clip_' + graphId + '); clip-path: url(#clip_' + graphId + ');')
            .attr('d', area)
            .attr('fill', color[1]);

    svg.append('g')
            .append('path')
            .datum(values)
            .attr('class', 'line-path')
            .attr('style', '-webkit-clip-path: url(#clip_' + graphId + '); clip-path: url(#clip_' + graphId + ');')
            .attr('d', line)
            .attr('fill', 'none')
            .attr('stroke', color[0])
            .attr('stroke-width', 3);

    // Zoom Functionality
    let zoom = d3.zoom()
                .scaleExtent([1, 4])
                .translateExtent([[0, 0], [width, height]])
                .extent([[0, 0], [width, height]])
                .on('zoom', (d) => {
                    let reScaleX = d3.event.transform.rescaleX(xScale);
        
                    // rescale x-axis
                    xAxis.call(
                        d3.axisBottom(reScaleX)
                            .tickSize(0)
                            .tickFormat(formatDate)
                        )

                    xAxis.selectAll(".tick text")
                        .attr("y", 0)
                        .attr("x", 9)
                        .attr("dy", ".1em")
                        .attr("transform", "rotate(90)")
                        .style("text-anchor", "start");
                        
                    // rescale area-path
                    svg.select('.area-path')
                        .attr('d', area.x(d => reScaleX(d.x)));

                    // rescale line-path
                    svg.select('.line-path')
                        .attr('d', line.x(d => reScaleX(d.x)));
                });

    let lenValues = values.length,
        d1 = values[lenValues-1].x,
        d0 = values[lenValues-6].x;

    svg.call(zoom)
        .transition()
        .duration(1500)
        .call(zoom.transform, d3.zoomIdentity
            .scale(width/(xScale(d1) - xScale(d0)))
            .translate(-xScale(d0), 0)
        );


    // benchmark line
    if(benchmark && benchmark != null && benchmark != undefined) {
        let benchmarkScale = yScale(benchmark);
        svg.append('line')
            .attr("transform", "translate(" + 0 + ", " + 0 + ")")          
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', benchmarkScale)
            .attr('y2', benchmarkScale)
            .style('stroke-dasharray', 3)
            .attr('stroke', color[0]);

        svg.append('text')
            .attr('class', 'benchmark-label')
            .attr('x', width+2)
            .attr('y', benchmarkScale)
            .text((d, m) => '$' + d3.format(',')(Number(benchmark)));
    }

    // legends
    let legend = svg.append('g')
        .attr("transform", "translate(" + 10 + ", " + height + ")");
    
    legend.append('circle')
        .attr('class', 'circle-style')
        .attr('cx', 20)
        .attr('cy', 52)
        .attr("r", circleRadius)
        .attr("fill", color[0]);

    legend.append("text")
        .attr("x", 30)
        .attr("y", 55)
        .attr("class", "legend-style")
        .text(legends_label[1]);

    if(benchmark && benchmark != null && benchmark != undefined) {
        legend.append("g")
            .append("line")
            .attr("x1", 120)
            .attr("y1", 52)
            .attr("x2", 140)
            .attr("y2", 52)
            .style('stroke', color[0])
            .attr("class", "benchmark-line-style");

        legend.append("g")
            .append("text")
            .attr("x", 150)
            .attr("y", 55)
            .attr("class", "legend-style")
            .text(legends_label[0]);
    }
}