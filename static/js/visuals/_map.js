function canvas_map() {
    var width = 1000;
    var height = 500;
    var colorRange = ["#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"]
    var colorDomain = [250, 500, 750, 1000, 1250, 1500, 1750, 2000]
    var color = d3.scaleThreshold().range(colorRange).domain(colorDomain);
    var devicePixelRatio = window.devicePixelRatio || 1;

    var canvas = d3.select("#_map")
        .append("canvas")
        .attr("width", width * devicePixelRatio)
        .attr("height", height * devicePixelRatio)
        .style("width", width + "px")
        .style("height", height + "px").node();

    var context = canvas.getContext("2d");
    context.scale(devicePixelRatio, devicePixelRatio);

    var tooltip = d3.select("#_map")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden");

    d3.queue()
        .defer(d3.json, "/static/data/iso/accidents.json")
        .defer(d3.json, "/static/data/geojson/us.json")
        .await(ready);

    console.log("Initialized")

    function ready(error, accidents, us) {
        var accidentsByFips = {};
        var _acc = accidents['accidents']
        _acc.forEach(function (d) {
            accidentsByFips[d["FIPS"]] = d;
        });
        console.log(accidentsByFips)

        var path = d3.geoPath().projection(d3.geoAlbersUsa()).context(context);
        var subset = topojson.feature(us, us.objects.counties).features.filter(function (d) {
            return d.id in accidentsByFips;
        });

        context.strokeStyle = "#fff";
        context.lineWidth = 0.3;
        subset.forEach(function (d) {
            console.log(d)
            context.fillStyle = color(accidentsByFips[d.id]["Crude Rate"]);
            context.beginPath();
            path(d);
            context.fill();
            context.stroke();
        });

        context.lineWidth = 1;
        path(topojson.mesh(us, us.objects.states, function (a, b) {
            return a.id !== b.id;
        }));
        context.stroke();
        console.log("Completed code")
    }

}
