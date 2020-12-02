var map = new L.Map("map", {center: [37.8, -96.9], zoom: 4})
    .addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}));

d3.json("/static/data/geojson/states-data.json", function(statesData) {
    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        info.update(layer.feature.properties);
    }
    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    var geojson;

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
        render_minimap(e.target.feature.properties['fips'])
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }

    function getColor(d) {
        return d > 500000 ? '#800026' :
               d > 100000  ? '#BD0026' :
               d > 50000  ? '#E31A1C' :
               d > 20000  ? '#FC4E2A' :
               d > 10000   ? '#FD8D3C' :
               d > 1000   ? '#FEB24C' :
               d > 10   ? '#FED976' :
                          '#FFEDA0';
    }

    function style(feature) {
        return {
            fillColor: getColor(feature.properties.accidents),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    geojson = L.geoJson(statesData, {style: style, onEachFeature: onEachFeature }).addTo(map);

    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        this._div.innerHTML = '<h4>US Population Density</h4>' + (props ? '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup><br />' + props.accidents + ' accidents' : 'Hover over a state');
    };
    info.addTo(map);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'), grades = [0, 1000, 10000, 20000, 50000, 100000, 500000], labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;

    };

    legend.addTo(map);

    var control = new L.Control({position:'bottomleft'});
    control.onAdd = function(map) {
            var azoom = L.DomUtil.create('button','resetzoom');
            azoom.innerHTML = "Reset Map";
            L.DomEvent.disableClickPropagation(azoom)
                            .addListener(azoom, 'click', function() {
                                map.setView(map.options.center, map.options.zoom);
                            },azoom);
            return azoom;
        };
    control.addTo(map);

})

