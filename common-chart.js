const formatTimeTip =  d3.timeFormat('%Y')

const formatData = (d) => d3.format(",")(d)

function formatDates(d) {
    let date = new Date(d);
    let date_ = new Date("9999-01-01")
    date_.setFullYear(date.getFullYear())
    if (date_ < date) {
        return d3.timeFormat('%b')(date);
    } else {
        return d3.timeFormat('%Y')(date);
    }
}

function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }


  function formatGraphData(d, m) {
    if (m == "Cost" || m == "Spend" || m == "PMPY" || m == "PMPM" || m == "Benchmark") {
        if (d >= 1000) {
            let amt = d / 1000;
            return "$" + d3.format(",.2f")(amt) + "K";
        }
        if(d >= 'NA'){
            return d;
        }
        return "$" + d3.format(",.2f")(d);
    } else if (m == "% Change") {
        return d + "%";
    } else if (m == "Members") {
        return d3.format(",")(d);
    }
    return d;
}