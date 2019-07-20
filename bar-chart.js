function wrap(text, width) {
    text.each(function() {
        var text = d3.select(this),
            words = text
                .text()
                .split(/\s+/)
                .reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text
                .text(null)
                .append("tspan")
                .attr("x", 0)
                .attr("y", y)
                .attr("dy", dy + "em");
        while ((word = words.pop())) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text
                    .append("tspan")
                    .attr("x", 0)
                    .attr("y", y)
                    .attr("dy", ++lineNumber * lineHeight + dy + "em")
                    .text(word);
            }
        }
    });
}

function drawSimpleBarChart(json, graphId) {
    if (!json) {
        console.log("Error drawSimpleBarChart: Invalid Json.");
        return false;
    }

    var data = json;

    var margin = {
        top: 15,
        right: 10,
        bottom: 50,
        left: 40
    };

    var _width = document.getElementById(graphId).getAttribute("width");
    var _height = document.getElementById(graphId).getAttribute("height");

    var width = _width - margin.left - margin.right,
        height = _height - margin.top - margin.bottom,
        color = d3.scaleOrdinal(d3.schemeCategory10),
        values = data.data.values,
        yMaxValue = d3.max(values.map((d, i) => d.y));

    var svg = d3
        .select("#" + graphId)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // create x-scale
    var xScale = d3
        .scaleBand()
        .domain(values.map((d, i) => d.x))
        .rangeRound([0, width])
        .padding(.4);

    // create x-axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(
            d3
                .axisBottom(xScale)
                .ticks(4)
                .tickSizeOuter(0)
        )
        .selectAll(".x-axis .tick text")
        .call(wrap, 60);

    // create y-scale
    var yScale = d3
        .scaleLinear()
        .domain([0, yMaxValue])
        .range([height, 0])
        .nice();

    // create y-axis
    svg.append("g")
        .attr("class", "y-axis")
        .call(
            d3.axisLeft(yScale)
                .ticks(4)
                .tickFormat((d)=> {
                    return d3.format('.0s')(d)
                })
                .tickSizeOuter(0)
        );

    // Tooltip div size
    var div = d3
        .select("div")
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0.9)
        .style('display', 'none')


    var bar = svg
        .selectAll(".bar")
        .append("g")
        .data(values)
        .enter()
        .append("g");

    bar
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.x))
        .attr("y", d => yScale(d.y))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.y))
        .attr('fill', (d, i) => color(i))
        .on("mouseover", (d) => div.style("display", null))
        .on("mouseout", (d) => div.style("display", "none"))
        .on("mousemove", (d, i) => {
            div.html("Age Gap: " + (d.x) + "<br/>" + "Member : " + formatData(d.y) )
                .style("left", (d3.event.pageX - 70) + "px")
                .style("top", (d3.event.pageY - 55) + "px");
        });


    bar
        .append("text")
        .attr("class", "label-bar")
        .attr("x", d => xScale(d.x))
        .attr("y", d => yScale(d.y) - 5)
        .text(d => formatData(d.y))
        .attr("font-size", 10);

    let yLabel = svg.append('text')
        .attr("transform", "translate(-40, -" + Number(margin.top - 15) + ")")
        .attr("class", "y-legend-label");

    yLabel.append('tspan')
        .attr('x', 0)
        .attr('dy', -5)
        .text(() => data.meta.y_axis_label);

    svg.append('text')
        .attr("transform", "translate(" + (width / 2) + "," + (height + 50) + ")")
        .attr("class", "y-legend-label")
        .append('tspan')
        .attr('x', -15)
        .attr('dy', -5)
        .text(() => data.meta.x_axis_label);
}
