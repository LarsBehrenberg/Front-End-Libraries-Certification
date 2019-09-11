const requestLink = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

window.onload = function () {
    var req = new XMLHttpRequest();
    req.open("GET", requestLink, true);
    req.send();
    req.onload = () => {
        const data = JSON.parse(req.responseText);
        const dataset = data.monthlyVariance;

        // Define svg container width, height & padding
        const w = 1400;
        const h = 600;
        const padding = 70;

        // Build the svg
        const svg = d3.select("#svgContainer")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        var div = d3.select("#svgContainer").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)


        // Setting up domain array for scaling the x-Axis && Months array for y-Axis
        const years = [];
        dataset.forEach((d) => {
            years.includes(d.year) == false ? years.push(d.year) : false;
        });
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        // Build X & Y scales and axis:
        const xScale = d3.scaleBand()
            .domain(years)
            .range([padding, w - padding]);
        const yScale = d3.scaleBand()
            .domain(monthNames)
            .range([h - padding, padding]);

        const xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter((d, i) => !(i % 10)));
        const yAxis = d3.axisLeft(yScale)

        // Draw axes
        svg.append("g")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .attr("id", "x-axis")
            .call(xAxis);
        svg.append("g")
            .attr("transform", "translate(" + (padding) + ",0)")
            .attr("id", "y-axis")
            .call(yAxis);

        // Color scale
        const colors = ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"]
        var myColor = d3.scaleQuantile()
            .range(colors.reverse())
            .domain([d3.min(dataset, (d) => d.variance), d3.max(dataset, (d) => d.variance)])


        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return xScale(d.year)
            })
            .attr("y", function (d) {
                return yScale(monthNames[d.month - 1])
            })
            .attr("width", xScale.bandwidth())
            .attr("height", yScale.bandwidth())
            .attr("class", "cell")
            .attr("data-month", (d) => d.month - 1)
            .attr("data-year", (d) => d.year)
            .attr("data-temp", (d) => d.variance)
            .style("fill", function (d) {
                return myColor(d.variance)
            })
            .on("mouseover", function (d) {

                div.transition()
                    .duration(200)
                    .style("opacity", 0.6);

                var htmlOutput = d.year + " - " + monthNames[d.month-1] + "<br />" + (data.baseTemperature + d.variance).toFixed(1) + "\xB0C<br />" + d.variance.toFixed(1) + "\xB0C";

                div.html(htmlOutput)
                    .style("top", (d3.mouse(this)[1]) + 50 + "px")
                    .style("left", (d3.mouse(this)[0])  + "px")
                    .attr("id", "tooltip")
                    .attr("data-year", d.year)
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        // svg.append("rect")
        //     .attr("width", 50)
        //     .attr("height", 50)
        //     .attr("x", w / 2)
        //     .attr("y", h + 50)

    }
}