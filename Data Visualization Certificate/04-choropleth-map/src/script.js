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
const colors = ['#f9f9f9', '#bc2a66']; // low to high


// D3 Projection - "Wold"-Map to 2d display

var path = d3.geoPath() // path to convert geoJSON into paths
    // .projection(projection); // tell it to use usa projection

// Create svg with height and width in #svgContainer div
const svg = d3.select("#svgContainer").append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("border", "1px solid black")


// load all data and then execute function
Promise.all([
    d3.json(educationJSON),
    d3.json(countyJSON)
]).then(function (data) {

    educationDataset = data[0];
    countyDataset = data[1];
    console.log(educationDataset)

    const colorScale = d3.scaleSequential()
        .interpolator(d3.interpolatePuRd)
        .domain([d3.min(educationDataset, (d) => d.bachelorsOrHigher), d3.max(educationDataset, (d) => d.bachelorsOrHigher)]);

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
            for(let x = 0; x < educationDataset.length; x++){
                if(d.id == educationDataset[x].fips){
                    return colorScale(educationDataset[x].bachelorsOrHigher)
                }
            }
        })
        .attr("data-fips", (d) => d.id)
        .attr("data-education", (d) => {
            for(let x = 0; x < educationDataset.length; x++){
                if(d.id == educationDataset[x].fips){
                    return educationDataset[x].bachelorsOrHigher;
                }
            }
        })
});