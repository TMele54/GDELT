function render_cool_map() {

    var width = "100%";
    var height = 750;

    var projection_scale = 1400
    var offset = [600, 350]
    var projection = d3.geo.albersUsa().scale(projection_scale).translate(offset);
    var path = d3.geo.path().projection(projection);


    var svg = d3.select("#cool_map").append("svg").attr("id", "map_svg").attr("width", width).attr("height", height)
        .style("background-color", "#000000");

    queue()
        .defer(d3.json, "/static/data/geojson/zips_us_topo.json")
        .defer(d3.json, "/static/data/geojson/us.json")
        .await(ready);

    function ready(error, zips, states) {

        //ZIPS
        svg.append("g")
            .selectAll("path")
            .data(topojson.feature(zips, zips.objects.zip_codes_for_the_usa).features)
            .enter().append("path")
            .attr("class", "zip")
            .attr("data-zip", function(d) {return d.properties.zip; })
            .attr("data-state", function(d) {return d.properties.state; })
            .attr("data-name", function(d) {return d.properties.name; })
            .attr("d", path)
            .attr("class", "counties")
            .attr("fill", "#0a0a0a")
            .attr("opacity", 1)
            .attr("stroke", "#f8f8f8")
            .attr("stroke-width", "0.1px")

        var line = d3.line().curve(d3.curveLinear)
          .x(function (d) { return x(d.x); })
          .y(function (d) { return y(d.y); });

        var mouse_events = {
                            "mouseover": function(d) {
                                d3.select(this).style("cursor", "pointer")
                                d3.select(this).transition().duration(2000)
                                      .attrTween('d', function (d) {
                                        var previous = d3.select(this).attr('d');
                                        var current = line(d);
                                        return d3.interpolatePath(previous, current);
                                      });
                            },
                            "mouseout": function(d) {
                                d3.select(this).style("cursor", "default");
                                },
                            "click": function(d) {render_minimap(d)}
                            }

        //STATES
        svg.append("g")
            .selectAll("path")
            .data(topojson.feature(states, states.objects.states).features)
            .enter().append("path")
            .attr("d", path)
            .attr("class", "states")
            .attr("fill", "#101010")
            .attr("opacity", "0.25")
            .attr("stroke", "#ffffff")
            .attr("stroke-width", "1px")
            .on(mouse_events)

    }

}