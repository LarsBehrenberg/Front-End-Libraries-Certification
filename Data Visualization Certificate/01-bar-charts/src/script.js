const requestLink = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";



window.onload = function () {
    var request = new XMLHttpRequest();
    request.open("GET", requestLink, true);
    request.send();
    request.onload = function () {

        datasetJSON = JSON.parse(request.responseText);
        dataset = datasetJSON.data;

        w = 1000;
        h = 500;
        padding = 50;

        // Defining svg size
        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        // creating tooltip div
        var div = d3.select("#chart").append("div")
            .attr("class", "tooltip")
            .style("opacity", 1)



        // Setting up Scales
        const xScale = d3.scaleTime()
            .domain([d3.min(dataset, (d) => new Date(d[0])), d3.max(dataset, (d) => new Date(d[0]))])
            .range([padding, w - padding]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, (d) => d[1])])
            .range([h - padding, padding]);

        // Draw bars on svg
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", (d, i) => xScale(new Date(d[0])))
            .attr("y", (d, i) => yScale(d[1]))
            .attr("width", 3)
            .attr("height", (d) => (h - padding) - yScale(d[1]))
            .attr("fill", "rgb(51, 173, 255)")
            .attr("class", "bar")
            .attr("data-date", (d) => d[0])
            .attr("data-gdp", (d) => d[1])
            .on("mouseover", function (d) { // Tooltip on mouseover
                var date = new Date(d[0]);

                div.transition()
                    .duration(200)
                    .style("opacity", 1);

                div.html(date.getFullYear() + " Q" + Math.floor((date.getMonth() + 3) / 3) + "<br />$" + d[1] + " Billions")
                    .style("top", (d3.mouse(this)[1]) + 150 + "px")
                    .style("left", (d3.mouse(this)[0]) + 100 + "px")
                    .attr("id", "tooltip")
                    .attr("data-date", d[0])
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // Set Axes with Scales and draw them on svg + descriptions
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .attr("id", "x-axis")
            .call(xAxis);

        svg.append("text")
            .attr("y", h - padding + 20)
            .attr("x", w / 2 - padding / 2)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Timeline");

        svg.append("g")
            .attr("transform", "translate(" + padding + ",0)")
            .attr("id", "y-axis")
            .call(yAxis)

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", padding + 10)
            .attr("x", 0 - (h / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Gross Domestic Product");
    }
}