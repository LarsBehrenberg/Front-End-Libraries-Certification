const educationJSON = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";
const countyJSON = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";

const h = 600;
const w = 1000;
const padding = {
    "top": 50,
    "right": 50,
    "bottom": 50,
    "left": 50
}

const colors = ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"]



// D3 Projection - "Wold"-Map to 2d display

var path = d3.geoPath() // path to convert geoJSON into paths
// .projection(projection); // tell it to use usa projection

// Create svg with height and width in #svgContainer div
const svg = d3.select("#svgContainer").append("svg")
    .attr("width", w)
    .attr("height", h)

const div = d3.select("#svgContainer").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)


// load all data and then execute function
Promise.all([ // D3 function
    d3.json(educationJSON),
    d3.json(countyJSON)
]).then(function (data) {

    educationDataset = data[0];
    countyDataset = data[1];
    console.log(educationDataset)

    // const colorScale = d3.scaleSequential()
    //     .interpolator(d3.interpolatePuRd)
    //     .domain([d3.min(educationDataset, (d) => d.bachelorsOrHigher), d3.max(educationDataset, (d) => d.bachelorsOrHigher)]);

    var colorScale = d3.scaleQuantile()
        .range(colors.reverse())
        .domain([d3.min(educationDataset, (d) => d.bachelorsOrHigher), d3.max(educationDataset, (d) => d.bachelorsOrHigher)])

    var geojson = topojson.feature(data[1], data[1].objects.counties).features;
    console.log(geojson)

    svg.selectAll(".state")
        .data(geojson)
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("d", path)
        .style("stroke", "white")
        .style("stroke-width", "1")
        .style("fill", (d) => {
            for (let x = 0; x < educationDataset.length; x++) {
                if (d.id == educationDataset[x].fips) {
                    return colorScale(educationDataset[x].bachelorsOrHigher)
                }
            }
        })
        .attr("data-fips", (d) => d.id)
        .attr("data-education", (d) => {
            for (let x = 0; x < educationDataset.length; x++) {
                if (d.id == educationDataset[x].fips) {
                    return educationDataset[x].bachelorsOrHigher;
                }
            }
        })
        .on("mouseover", function (d) { // Add tooltip on hover

            div.transition()
                .duration(200)
                .style("opacity", 0.8);

            console.log(d3.select(this).attr("data-education"))

            var htmlOutput = "Percentage with Bachelor<br />or higher: "　+ d3.select(this).attr("data-education") + "%";

            div.html(htmlOutput)
                .style("top", (d3.mouse(this)[1]) + 50 + "px")
                .style("left", (d3.mouse(this)[0]) + 100 + "px")
                .attr("id", "tooltip")
                .attr("data-education", d3.select(this).attr("data-education"))
            
        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });



    let legendLength = 7

    for (let x = 1; x < colors.length + 1; x++) {
        svg
            .append("rect")
            .attr("id", "legend")
            .attr("class", "legend")
            .attr("width", 30)
            .attr("height", 20)
            .attr("x", w - 40)
            .attr("y", ((h / 2) - 20 * 3) + (20 * x))
            .style("stroke", "black")
            .style("fill", colors[x - 1])
            .append("text")
    }

});