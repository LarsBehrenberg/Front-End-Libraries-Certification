let videoGameApi = "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json",
    movieSaleApi = "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json",
    kickstarterPledgeApi = "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json";


const width = 1300;
const height = 600;

const paddingDiagram = {
    top: 50,
    right: 50,
    bottom: 150,
    left: 50
}
format = d3.format(",d")
color = d3.scaleOrdinal(d3.schemeTableau10);

const svg = d3.select("#svgContainer")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

const div = d3.select("#svgContainer").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)


d3.json(videoGameApi).then(function (dataset) {

    var root = d3.hierarchy(dataset).sum(function (d) {
        return d.value
    })

    d3.treemap()
        .size([width, height - paddingDiagram.bottom])
    //.padding(1)
    (root);

    svg.selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr('x', function (d) {
            console.log(d)
            return d.x0;
        })
        .attr('y', function (d) {
            return d.y0;
        })
        .attr('width', (d) => {return d.x1 - d.x0})
        .attr('height', function (d) {
            return d.y1 - d.y0;
        })
        .style("stroke", "white")
        .attr("fill", d => {
            while (d.depth > 1) d = d.parent;
            return color(d.data.name);
        })
        .attr("class", "tile")
        .attr("data-name", (d) => d.data.name)
        .attr("data-category", (d) => d.data.category)
        .attr("data-value", (d) => d.data.value)
        .style("opacity", 0.8)
        .on("mouseover", function (d) {
            div.transition()
                .duration(200)
                .style("opacity", 0.8)

            let htmlOutput = "Name: " + d.data.name + "<br />Category: " + d.data.category + "<br />Value: " + d.data.value

            div.html(htmlOutput)
                .style("top", (d3.event.pageY - 100) + "px")
                .style("left", (d3.event.pageX - 150) + "px")
                .attr("id", "tooltip")
                .attr("data-value", d.data.value)
        })
        .on("mouseout", (d) => {
            div.transition()
                .duration(500)
                .style("opacity", 0)
        })


    svg.selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", (d) => d.x0 + 5)
        .attr("y", (d) => d.y0 + 10)
        .attr('width', function (d) {
            return d.x1 - d.x0 - 5;
        })
        .text(function (d) {
            return d.data.name;
        })
        .attr("font-size", "10px")
        .attr("fill", "black")
        .attr("class", "wrapme")



    function wrap(text) {
        text.each(function () {
            var text = d3.select(this);
            var words = text.text().split(/\s+/).reverse();
            var lineHeight = 10;
            var width = parseFloat(text.attr('width'));
            var y = parseFloat(text.attr('y'));
            var x = text.attr('x');
            var anchor = text.attr('text-anchor');

            var tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('text-anchor', anchor);
            var lineNumber = 0;
            var line = [];
            var word = words.pop();

            while (word) {
                line.push(word);
                tspan.text(line.join(' '));
                if (tspan.node().getComputedTextLength() > width) {
                    lineNumber += 1;
                    line.pop();
                    tspan.text(line.join(' '));
                    line = [word];
                    tspan = text.append('tspan').attr('x', x).attr('y', y + lineNumber * lineHeight).attr('anchor', anchor).text(word);
                }
                word = words.pop();
            }
        });
    }
    d3.selectAll('.wrapme').call(wrap);

    let g = svg.append("g")
    .attr("id", "legend")
    .attr("class", "legend")

    for (x = 0; x < color.range().length; x++) {
        g
            .append("rect")
            .attr("width", 30)
            .attr("height", 20)
            .attr("x", (width / 10) + ((width / 10)*(x-1)+40))
            .attr("y", height - 70)
            .style("stroke", "black")
            .attr("fill", color.range()[x])
            .attr("class", "legend-item")
        
        g
            .append("text")
            .attr("x", (width / 10) + ((width / 10)*(x-1)+40))
            .attr("y", height - 80)
            .text(color.domain()[x])
    }
});