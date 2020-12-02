function render_minimap(data){
    console.log("DATA:", data)
    $("#mini_map").empty()
    state_fips = [
                    {
                        "Name": "Alabama",
                        "_Name": "AL",
                        "FIPS": "01"
                    },
                    {
                        "Name": "Alaska",
                        "_Name": "AK",
                        "FIPS": "02"
                    },
                    {
                        "Name": "Arizona",
                        "_Name": "AZ",
                        "FIPS": "04"
                    },
                    {
                        "Name": "Arkansas",
                        "_Name": "AR",
                        "FIPS": "05"
                    },
                    {
                        "Name": "California",
                        "_Name": "CA",
                        "FIPS": "06"
                    },
                    {
                        "Name": "Colorado",
                        "_Name": "CO",
                        "FIPS": "08"
                    },
                    {
                        "Name": "Connecticut",
                        "_Name": "CT",
                        "FIPS": "09"
                    },
                    {
                        "Name": "Delaware",
                        "_Name": "DE",
                        "FIPS": "10"
                    },
                    {
                        "Name": "Florida",
                        "_Name": "FL",
                        "FIPS": "12"
                    },
                    {
                        "Name": "Georgia",
                        "_Name": "GA",
                        "FIPS": "13"
                    },
                    {
                        "Name": "Hawaii",
                        "_Name": "HI",
                        "FIPS": "15"
                    },
                    {
                        "Name": "Idaho",
                        "_Name": "ID",
                        "FIPS": "16"
                    },
                    {
                        "Name": "Illinois",
                        "_Name": "IL",
                        "FIPS": "17"
                    },
                    {
                        "Name": "Indiana",
                        "_Name": "IN",
                        "FIPS": "18"
                    },
                    {
                        "Name": "Iowa",
                        "_Name": "IA",
                        "FIPS": "19"
                    },
                    {
                        "Name": "Kansas",
                        "_Name": "KS",
                        "FIPS": "20"
                    },
                    {
                        "Name": "Kentucky",
                        "_Name": "KY",
                        "FIPS": "21"
                    },
                    {
                        "Name": "Louisiana",
                        "_Name": "LA",
                        "FIPS": "22"
                    },
                    {
                        "Name": "Maine",
                        "_Name": "ME",
                        "FIPS": "23"
                    },
                    {
                        "Name": "Maryland",
                        "_Name": "MD",
                        "FIPS": "24"
                    },
                    {
                        "Name": "Massachusetts",
                        "_Name": "MA",
                        "FIPS": "25"
                    },
                    {
                        "Name": "Michigan",
                        "_Name": "MI",
                        "FIPS": "26"
                    },
                    {
                        "Name": "Minnesota",
                        "_Name": "MN",
                        "FIPS": "27"
                    },
                    {
                        "Name": "Mississippi",
                        "_Name": "MS",
                        "FIPS": "28"
                    },
                    {
                        "Name": "Missouri",
                        "_Name": "MO",
                        "FIPS": "29"
                    },
                    {
                        "Name": "Montana",
                        "_Name": "MT",
                        "FIPS": "30"
                    },
                    {
                        "Name": "Nebraska",
                        "_Name": "NE",
                        "FIPS": "31"
                    },
                    {
                        "Name": "Nevada",
                        "_Name": "NV",
                        "FIPS": "32"
                    },
                    {
                        "Name": "New Hampshire",
                        "_Name": "NH",
                        "FIPS": "33"
                    },
                    {
                        "Name": "New Jersey",
                        "_Name": "NJ",
                        "FIPS": "34"
                    },
                    {
                        "Name": "New Mexico",
                        "_Name": "NM",
                        "FIPS": "35"
                    },
                    {
                        "Name": "New York",
                        "_Name": "NY",
                        "FIPS": "36"
                    },
                    {
                        "Name": "North Carolina",
                        "_Name": "NC",
                        "FIPS": "37"
                    },
                    {
                        "Name": "North Dakota",
                        "_Name": "ND",
                        "FIPS": "38"
                    },
                    {
                        "Name": "Ohio",
                        "_Name": "OH",
                        "FIPS": "39"
                    },
                    {
                        "Name": "Oklahoma",
                        "_Name": "OK",
                        "FIPS": "40"
                    },
                    {
                        "Name": "Oregon",
                        "_Name": "OR",
                        "FIPS": "41"
                    },
                    {
                        "Name": "Pennsylvania",
                        "_Name": "PA",
                        "FIPS": "42"
                    },
                    {
                        "Name": "Rhode Island",
                        "_Name": "RI",
                        "FIPS": "44"
                    },
                    {
                        "Name": "South Carolina",
                        "_Name": "SC",
                        "FIPS": "45"
                    },
                    {
                        "Name": "South Dakota",
                        "_Name": "SD",
                        "FIPS": "46"
                    },
                    {
                        "Name": "Tennessee",
                        "_Name": "TN",
                        "FIPS": "47"
                    },
                    {
                        "Name": "Texas",
                        "_Name": "TX",
                        "FIPS": "48"
                    },
                    {
                        "Name": "Utah",
                        "_Name": "UT",
                        "FIPS": "49"
                    },
                    {
                        "Name": "Vermont",
                        "_Name": "VT",
                        "FIPS": "50"
                    },
                    {
                        "Name": "Virginia",
                        "_Name": "VA",
                        "FIPS": "51"
                    },
                    {
                        "Name": "Washington",
                        "_Name": "WA",
                        "FIPS": "53"
                    },
                    {
                        "Name": "West Virginia",
                        "_Name": "WV",
                        "FIPS": "54"
                    },
                    {
                        "Name": "Wisconsin",
                        "_Name": "WI",
                        "FIPS": "55"
                    },
                    {
                        "Name": "Wyoming",
                        "_Name": "WY",
                        "FIPS": "56"
                    },
                    {
                        "Name": "American Samoa",
                        "_Name": "AS",
                        "FIPS": "60"
                    },
                    {
                        "Name": "Guam",
                        "_Name": "GU",
                        "FIPS": "66"
                    },
                    {
                        "Name": "Northern Mariana Islands",
                        "_Name": "MP",
                        "FIPS": "69"
                    },
                    {
                        "Name": "Puerto Rico",
                        "_Name": "PR",
                        "FIPS": "72"
                    },
                    {
                        "Name": "Virgin Islands",
                        "_Name": "VI",
                        "FIPS": "78"
                    }
                ]
    targtState = []

    var width = 400, height = 400;
    var projection = d3.geo.albers();
    var path = d3.geo.path().projection(projection);
    var svg = d3.select("#mini_map").append("svg").attr("width", width).attr("height", height);

    d3.json("/static/data/geojson/us.json", function(error, us) {
        if (error) throw error;

        var states = topojson.feature(us, us.objects.states);
        var state = states.features.filter(function(d) { return d.id === parseInt(data["id"]); })[0];

        projection.scale(1).translate([0, 0]);

        var b = path.bounds(state);
        var s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
        var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        projection.scale(s).translate(t);

        svg.append("path").datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })).attr("class", "_mesh").attr("d", path);
        svg.append("path").datum(state).attr("class", "_outline").attr("d", path).attr('id', 'land');
        svg.append("clipPath").attr("id", "clip-land").append("use").attr("xlink:href", "#land");

        svg.selectAll("path")
            .data(topojson.feature(us, us.objects.counties).features)
            .enter().append("path")
            .attr("d", path)
            .attr("fill", "#090908")
            .attr("stroke", "#f8f8f8")
            .attr("stroke-width", "1px")
            .attr("stroke-linejoin", "round")
            .attr('county-id', function(d){return d.id})
            .attr("clip-path", "url(#clip-land)").attr('class', 'county');

        state_fips.forEach(function(d){
            if(parseInt(d["FIPS"]) === parseInt(data["id"])){
                console.log("This is the way")
                console.log(d)
                targetState = d["_Name"]
                plot_accidents(targetState)
            }
        })
        function plot_accidents(state){

            d3.json("/static/data/states_simple/"+state+".json", function(events) {

                /*
                ID: "A-729"
                Severity: "3"
                Start_Lat: "38.0853"
                Start_Lng: "-122.233017"
                Start_Time: "2016-06-21 10:34:40"
                */


                var radiusScale = d3.scale.sqrt().domain(d3.extent(events, function(d) { return +d["Severity"]; })).range([1, 6]);

                svg.selectAll("circle")
                    .data(events)
                    .enter().append("circle")
                    .attr("fill", "red")
                    .attr("class", "_circle")
                    .attr("cx", function(d) {return projection([+d["Start_Lng"], +d["Start_Lat"]])[0];})
                    .attr("cy", function(d) {return projection([+d["Start_Lng"], +d["Start_Lat"]])[1];})
                    .attr("r",  function(d) {return radiusScale(d["Severity"])})
                    .attr("stroke",  "black")
                    .attr("stroke-width",  "1px")
                    .attr("opacity",  "0.5")

                })

        }

    });
}