var width = 1960, height = 600;
var color_domain = [1,2,3,4,5,6,7,8,9,10,11,12]
var ext_color_domain = [0,1,2,3,4,5,6,7,8,9,10]
var legend_labels = ["< 500", "500+", "1000+", "1500+", "2000+", "2500+", "3000+", "3500+", "4000+", "4500+", "5000+", "5500+"]
var color = d3.scale.threshold().domain(color_domain).range([
		"#dcdcdc", "#d0d6cd", "#bdc9be",
		"#aabdaf", "#97b0a0", "#84a491",
		"#719782", "#5e8b73", "#4b7e64",
		"#387255", "#256546", "#125937"
	]);
var div = d3.select("#__map").append("div").attr("class", "tooltip").style("opacity", 0);
var svg = d3.select("#__map").append("svg").attr("width", width).attr("height", height).style("margin", "-15px auto");
var path = d3.geo.path()

queue()
	.defer(d3.json, "/static/data/geojson/us.json")
	.defer(d3.json, "/static/data/iso/fips_counts.json")
	.await(ready);

function ready(error, us, cnts) {

	var pairRainWithId = {};
	var pairSeveWithId = {};

	//var meta = meta["accidents"]
	var data = cnts["count"]
	var counts = []
	var num=[]
	for (var key in data) {
		var cnt = {}
		num.push(parseInt(data[key]))
		if (data.hasOwnProperty(key)) {
			cnt["fips"] = key
			cnt["num_acc"] = data[key]
			counts.push(cnt)
		}else{
			console.log(key)
		}
	}
	var domainA = d3.extent(counts, function(d) { return d["num_acc"]})
	//var domainS = d3.extent(data, function(d) { return d["Severity"]})
	//var domainP = d3.extent(data, function(d) { return d["Precipitation(in)"]})

	var colorA = d3.scale.linear().domain([0,50000]).range(["#2f6166", "#fc084c"]);
	//var colorS = d3.scale.threshold().domain(domainS).range(["#dcdcdc", "#d0d6cd", "#bdc9be","#aabdaf", "#97b0a0", "#84a491","#719782", "#5e8b73", "#4b7e64","#387255", "#256546", "#125937"]);
	//var colorP = d3.scale.threshold().domain(domainP).range(["#dcdcdc", "#d0d6cd", "#bdc9be","#aabdaf", "#97b0a0", "#84a491","#719782", "#5e8b73", "#4b7e64","#387255", "#256546", "#125937"]);

	d3.selection.prototype.moveToFront = function() {
		return this.each(function(){
			this.parentNode.appendChild(this);
		});
	};
	d3.selection.prototype.moveToBack = function() {
		return this.each(function() {
			var firstChild = this.parentNode.firstChild;
			if (firstChild) {
				this.parentNode.insertBefore(this, firstChild);
			}
		});
	};
	t=0

	counts.forEach(function(d) {
		pairRainWithId[d["fips"]] = d;
		pairSeveWithId[d["fips"]] = d;
	});
	console.log(pairRainWithId)
	svg.append("g")
		.attr("class", "county")
		.selectAll("path")
		.data(topojson.feature(us, us.objects.counties).features)
		.enter()
		.append("path")
		.attr("d", path)
		.style("fill" , function (d) {

			return "lightgreen"
			/*
			if (data[d.id] !== undefined) {
				return colorA(data[d.id])
			  }else{
			 	return "#00FFF7"
			}
			 */

		})
		.style("opacity", 1.0)
		.on("mouseover", function(d) {
			var sel = d3.select(this);
			sel.moveToFront();
			d3.select(this).transition().duration(300).style({'opacity': 1, 'stroke': 'black', 'stroke-width': 1.5});
			div.transition().duration(300).style("opacity", 1)
			div.text(d.id + ": " + pairRainWithId[d.id]['num_acc']).style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY -30) + "px");
			})
		.on("mouseout", function() {
			var sel = d3.select(this);
			sel.moveToBack();
			d3.select(this).transition().duration(300).style({'opacity': 0.8, 'stroke': 'white', 'stroke-width': 1});
			div.transition().duration(300).style("opacity", 0);
			})

	};

	var legend = svg.selectAll("g.legend").data(ext_color_domain).enter().append("g").attr("class", "legend");
	var ls_w = 73, ls_h = 20;

	legend.append("rect")
		.attr("x", function(d, i){ return width - (i*ls_w) - ls_w;})
		.attr("y", 550)
		.attr("width", ls_w)
		.attr("height", ls_h)
		.style("fill", function(d, i) { return color(d); })
		.style("opacity", 0.8);

	legend.append("text")
		.attr("x", function(d, i){ return width - (i*ls_w) - ls_w;})
		.attr("y", 590)
		.text(function(d, i){ return legend_labels[i]; });

	var legend_title = "Number of independent farms";

	svg.append("text")
		.attr("x", 10)
		.attr("y", 540)
		.attr("class", "legend_title")
		.text(function(){return legend_title});
