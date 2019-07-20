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
            bottom: 60,
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

    // shallow clone y array value & legend name
    let zeroIndexY = [...values[0]["y"]],
        oneIndexY = [...values[1]["y"]],
        twoIndexY = [...values[2]["y"]],
        legendClone = [...data.meta.legends_name]

    // find the sorted index value of last index y value
    let sortedIndexArray = twoIndexY.map((val, ind) => {
            return {
                ind,
                val
            }
        })
        .sort((a, b) => {
            return b.val > a.val ? 1 : a.val == b.val ? 0 : -1
        })
        .map((obj) => obj.ind);

    // assign y value with soreted index value of all y array value
    for (let index = 0; index < twoIndexY.length; index++) {
        values[0]["y"][index] = zeroIndexY[sortedIndexArray[index]]
        values[1]["y"][index] = oneIndexY[sortedIndexArray[index]]
        values[2]["y"][index] = twoIndexY[sortedIndexArray[index]]
        data.meta.legends_name[index] = legendClone[sortedIndexArray[index]]
    }

    // 2. parse
    values.map(d => {
        d.x = parseDate(d.x);
    });

    // 3. handling negative value into zero
    values.map(d => (d.y < 0) ? d.y = 0 : d.y)

    // 5. find out the maximum y-value for scaling
    let max_all = [];
    values.map(d => {
        let max_eachY = d3.max(d.y);
        max_all.push(max_eachY);
    })
    let yMaxValue = d3.max(max_all);
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
            .tickSize(0)
            .tickSizeOuter(0)
        );

    if (data.options.show_y_axis === "true") {
        let yAxis = svg.append('g')
            .attr('class', 'y-axis')
            .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
            .call(
                d3
                .axisLeft(yScale)
                .ticks(4)
                .tickSize(0)
                .tickFormat((d) => {
                    return d3.format('.0s')(d)
                })
                .tickSizeOuter(0)
            );

        yAxis.selectAll('.tick text')
            .attr('x', -8)
            .attr('class', 'axis-label');

        yAxis.selectAll(".domain").remove()
    }

    // remove axis line
    xAxis.selectAll(".domain").remove()

    xAxis.selectAll('.tick text')
        .attr('y', 10)
        .attr('class', 'axis-label');


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
    let defaultColor = d3.scaleOrdinal(d3.schemeCategory10);

    // Tooltip div size
    var div = d3
        .select("div")
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0.9)
        .style('display', 'none')


    let current_data = data.data.values
        .reduce((accu, d, i, arr) => (i < arr.length - 1 && accu.push(d), accu), []);

    let projected_data = data.data.values
        .reduce((accu, d, i, arr) => (i > arr.length - 3 && accu.push(d), accu), []);

    for (let i = 0; len = data.data.values[0].y.length, i < len; i++) {

        let area = d3.area()
            .x(d => xScale(d.x))
            .y0(height)
            .y1(d => yScale(d.y[i]));


        svg.append('g')
            .attr('class', 'current-area-path')
            .append('path')
            .datum(current_data)
            .attr('d', area)
            .attr('fill', defaultColor(i))
            .attr('opacity', .8)

        svg.append('g')
            .attr('class', 'projected-area-path')
            .append('path')
            .datum(projected_data)
            .attr('d', area)
            .attr('fill', "#B2C4D2")
            .attr('opacity', .8)
    }

    let table_name = data.meta.table_col_name

    let spend, memberCount, spendName, memberCountName
    let tooltipData =[];

    for (let index = 1; index < (values[0]['table'].length) / 2; index++) {
    
        let itemData = [];

        for (let valIndex = 0; valIndex < values.length; valIndex++) {
            let item = {};
            item.spend = values[valIndex]['table'][2 * index - 1]
            item.memberCount = values[valIndex]['table'][(2 * index)]
            item.spendName = table_name[2 * index - 1]
            item.memberCountName = table_name[2 * index]

            itemData.push(item);

        }
        tooltipData.push(itemData);
    }


    if (data.options.show_tooltip === "true" && tooltipData.length !== 0) {

        for (let i = 0; i < values[0]["y"].length; i++) {
            for (let j = 0; j < values.length; j++) {
                let xValue = values[j]["x"]
                let yValue = values[j]["y"][i]
                let color = defaultColor(i)

                let circleId = graphId+'_circle_'+i+'_'+j;
                let tooltipItem = tooltipData[i][j]; 

                svg
                    .append('circle')
                    .attr('class', 'circle')
                    .attr('id',circleId)
                    .attr('cx', xScale(xValue))
                    .attr('cy', yScale(yValue))
                    .attr('r', circleRadius)
                    .attr('spend', tooltipItem.spend)
                    .attr('spendName', tooltipItem.spendName)
                    .attr('memberCount', tooltipItem.memberCount)
                    .attr('memberCountName', tooltipItem.memberCountName)
                    .style('fill', color)
                    .style('stroke', '#fff')
                    .style('stroke-width', '2')
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .transition()
                            .duration(100)
                            .attr('r', hoverCircleRadius);

                        div.style("display", null)

                    })
                    .on("mouseout", function () {
                        d3.select(this)
                            .transition()
                            .duration(100)
                            .attr('r', circleRadius);

                        div.style("display", "none")
                    })
                    // .on("mousemove", (d, i) => {
                    //     console.log({
                    //         d
                    //     })
                    //     div.html("Date: " + formatTimeTip(xValue) + "<br/>" + "Member : " + formatData(yValue))
                    //         .style("left", (d3.event.pageX - 70) + "px")
                    //         .style("top", (d3.event.pageY - 55) + "px");
                    // })
                    .on("click", (d, i) => {
                        div.transition().duration(200).style("display", "block");

                        spendName = d3.event.target.getAttribute('spendName');
                        spend = d3.event.target.getAttribute('spend');
                        memberCountName = d3.event.target.getAttribute('memberCountName');
                        memberCount = d3.event.target.getAttribute('memberCount');

                        div.html('<div class="container">' +
                                '<div class="row">' +
                                '<div class="col-6 tipinfo-spend">' + formatTimeTip(xValue) + " " + spendName + '<br/>' + formatGraphData(spend, yLabel) + '</div>' +
                                '<div class="col-6 tipinfo-members">' + memberCountName + '<br/>' + d3.format(",")(memberCount) + '</div>' +
                                '</div>' +
                                '</div>')
                            .style("left", (d3.event.pageX - 50) + "px")
                            .style("top", (d3.event.pageY - 50) + "px");



                    });
            }
        }
    }



    let legends_label = data.meta.legends_name;
    let lenArr = legends_label.map(d => d.length)
    let maxLength = d3.max(lenArr)

    // legend part
    let xtrans = 0;
    let ytrans = height + 20;
    let legendsPerRow = 2;
    for (let i = 0; i < data.meta.legends_name.length; i++) {
        if (maxLength >= 20 || i > legendsPerRow - 1) {
            ytrans = ytrans + 20;
            xtrans = 0;
            legendsPerRow = legendsPerRow + 3;
        }

        g = svg
            .append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + xtrans + "," + ytrans + ")");

        g.append("circle")
            .attr("cx", 0)
            .attr("cy", 5 + (i * 1))
            .attr("r", 4)
            .attr("fill", defaultColor(i));

        let legendText = g.append("text")
            .attr("transform", "translate(10, 4)")
            .attr("text-anchor", "start")
            .attr("font-size", "10px")
            .text(data.meta.legends_name[i])


        if (maxLength >= 20) {
            legendText.attr('y', 6)
                .attr('dy', '0em')
                .call(wrap, width)
        } else {
            legendText
                .attr('dy', '.6em')
                .call(wrap, width)
        }

        xtrans = xtrans + width / 2;
    }
}