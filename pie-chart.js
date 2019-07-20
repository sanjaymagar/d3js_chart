function drawPieChart(json, graphId) {
    if (!json) {
        console.log('Error drawMultiLineChart: Invalid Json.');
        return false;
    }

    let data = json;

    // 1. Use the margin convention practice
    let _width = document.getElementById(graphId).getAttribute("width");
    let _height = document.getElementById(graphId).getAttribute("height");

    let margin = {
            top: 0,
            right: 0,
            bottom: 70,
            left: 0
        },
        width = _width - margin.left - margin.right, // Use the division's width
        height = _height - margin.top - margin.bottom; // Use the division's height

    let thickness = 18;
    let text = "";

    let radius = Math.min(width, height) / 2;
    let values = data.data.values;

    function color(i) {
        let color = ["#92c639", "#0084be", "#003c6a", "red", "green", "blue", "yellow", "purple"];
        return color[i];
    }

    svg = d3
        .select("#" + graphId)
        .attr('class', 'donut');

    let g = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let arc = d3
        .arc()
        .innerRadius(radius)
        .outerRadius(0);

    let pie = d3
        .pie()
        .value(function (d) {
            return d.y;
        })
        .sort(null);

    // Tooltip div size
    var div = d3
        .select("div")
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0.9)
        .style('display', 'none')


    g.selectAll("path")
        .data(pie(values))
        .enter()
        .append("g")
        .on("mouseover", (d) => div.style("display", null))
        .on("mouseout", (d) => div.style("display", "none"))
        .on("mousemove", (d, i) => {
            let type = data.meta.type;
            let tooltipHtml = 
                `<div>
                    ${d.data.x} <br/> Member : ${formatData(d.data.y)}
                </div>`
            div.html(tooltipHtml)
                .style("left", (d3.event.pageX - 70) + "px")
                .style("top", (d3.event.pageY - 55) + "px");
        })
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .each(function (d, i) {
            this._current = i;
        });

    g.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .text(text);

    let yLabel = svg.append('text')
        .attr('transform', 'translate(' + 70 + ',' + 220 + ')')
        .attr("class", "y-legend-label");

    yLabel.append('tspan')
        .attr('x', 0)
        .attr('dy', -5)
        .text(data.meta.x_axis_label);

    // legend automated
    // legend part
    let xtrans = 0;
    let ytrans = height + 20;
    let legendsPerRow = 3;
    for (let i = 0; i < values.length; i++) {
        if (i > legendsPerRow - 1) {
            ytrans = ytrans + 20;
            xtrans = 0;
            legendsPerRow = legendsPerRow + 3;
        }
        g = svg
            .append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + xtrans + "," + ytrans + ")");

        g.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", 4)
            .attr("width", 15)
            .attr("fill", color(i));

        g.append("text")
            .attr("transform", "translate(25, 6)")
            .attr("text-anchor", "start")
            .attr("font-size", "10px")
            .text(values[i].x);

        xtrans = xtrans + 95;
    }
}