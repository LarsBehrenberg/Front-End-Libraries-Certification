const requestLink = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

window.onload = () => {
    var req = new XMLHttpRequest();
    req.open("GET", requestLink, true);
    req.send();
    req.onload = () => {
        dataset = JSON.parse(req.responseText);

        const w = 900;
        const h = 600;
        const padding = 50;


        const svg = d3.select("#svgContainer")
            .append("svg")
            .attr("width", w)
            .attr("height", h)

        var div = d3.select("#svgContainer").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)


        // Setting up x-Scale
        function getYear(year) {
            const date = new Date();
            date.setFullYear(year);
            return date;
        }
        const xScale = d3.scaleTime()
            .domain([d3.min(dataset, (d) => getYear(d.Year)), d3.max(dataset, (d) => getYear(d.Year))])
            .range([padding, w - padding]);

        // Setting up y-Scale
        var specifier = "%M:%S";
        var parsedData = dataset.map(function (d) {
            return d3.timeParse(specifier)(d.Time)
        });
        const yScale = d3.scaleTime()
            .domain(d3.extent(parsedData).reverse())
            .range([h - padding, padding]);

        // Defining and drawing x & y-Axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale)
            .tickFormat(function (d) {
                return d3.timeFormat(specifier)(d)
            });

        svg.append("g")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .attr("id", "x-axis")
            .call(xAxis)

        svg.append("g")
            .attr("transform", "translate(" + (padding) + ",0)")
            .attr("id", "y-axis")
            .call(yAxis)


        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", (d, i) => xScale(getYear(d.Year)))
            .attr("cy", (d, i) => yScale(d3.timeParse(specifier)(d.Time)))
            .attr("r", 6)
            .attr("data-xvalue", (d, i) => d.Year)
            .attr("data-yvalue", (d, i) => d3.timeParse(specifier)(d.Time))
            .attr("fill", (d) => d.Doping !== "" ? "rgb(31, 119, 180)" : "rgb(255, 127, 14)")
            .attr("stroke", "black")
            .on("mouseover", function (d) {

                div.transition()
                    .duration(200)
                    .style("opacity", 1);

                var htmlOutput = d.Name + ": " + d.Nationality + "<br />Year: " + d.Year + ", Time: " + d.Time + "<br /><br />" + d.Doping;

                div.html(htmlOutput)
                    .style("top", (d3.mouse(this)[1]) + 150 + "px")
                    .style("left", (d3.mouse(this)[0]) + 250 + "px")
                    .attr("id", "tooltip")
                    .attr("data-year", d.Year)
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svg.append("text")
            .attr("y", h / 2 - padding / 2)
            .attr("x", w - padding)
            .attr("dy", "1em")
            .attr("id", "legend")
            .style("text-anchor", "end")
            .style("fill", "rgb(31, 119, 180)")
            .text("Riders with doping allegations");

        svg.append("text")
            .attr("y", h / 2 - padding)
            .attr("x", w - padding)
            .attr("dy", "1em")
            .attr("id", "legend")
            .style("text-anchor", "end")
            .style("fill", "rgb(255, 127, 14)")
            .text("No doping allegations");

        svg.append("text")
            .attr("y", padding + 20)
            .attr("x", 0 - (h / 2) + padding * 2)
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "end")
            .text("Time in Minutes");
    }
}