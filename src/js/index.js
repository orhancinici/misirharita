var map = L.map('map').setView([25.245074186193185, 33.19374812809622], 6);

googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    attribution: "Mısır",
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);


// Camiler için icon:
var camiIcon = L.icon({
    iconUrl: "./src/img/mscd.png",
    iconSize: [30, 37]

});


// Stil:	
var s_light_style = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 2,
    opacity: 2,
    fillOpacity: 0.9
};

// Şehirler:
L.geoJSON(locationMisirJSON, {
    onEachFeature : function(feature, layer){
        var popupContent =  '<h4 class = "text-primary">Şehirler</h4>' +
                            '<div class="container"><table class="table table-striped">' +
                            '<thead><tr><th>Başlıklar</th><th></th></tr></thead>' +
                            '<tbody><tr><td><b>Şehir:</b></td><td><b>'+ feature.properties.name +'</b></td></tr>' +
                            '<tr><td><b>Arabic:</b></td><td><b>' + feature.properties.arabicName +'</b></td></tr>' +
                            '<tr><td><b>Bilgi:</b></td><td>' + feature.properties.bilgi + '</td></tr>' +
                            '<tr><td><b>Resim:</b></td><td><a href="./doc/sehir/'+ feature.properties.doc +' " target="_blank"><img src="./doc/sehir/' + feature.properties.img + '" width="190" height="170" /></td></tr>';
        layer.bindPopup(popupContent)
	},
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, s_light_style);
    }
}).addTo(map);




// Mescidler:
L.geoJSON(camiJSON, {
    onEachFeature : function(feature, layer){
        var popupContent =  '<h4 class = "text-primary">Camiler</h4>' +
                            '<div class="container"><table class="table table-striped">' +
                            '<thead><tr><th>Başlıklar</th><th></th></tr></thead>' +
                            '<tbody><tr><td><b>Cami:</b></td><td><b>'+ feature.properties.name +'</b></td></tr>' +
                            '<tr><td><b>Arabic:</b></td><td><b>' + feature.properties.arabicName +'</b></td></tr>' +
                            '<tr><td><b>Bilgi:</b></td><td>' + feature.properties.bilgi + '</td></tr>' +
                            '<tr><td><b>Resim:</b></td><td><a href="./doc/cami/'+ feature.properties.doc +' " target="_blank"><img src="./doc/cami/' + feature.properties.img + '" width="190" height="170" /></td></tr>';
        layer.bindPopup(popupContent)
	},
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: camiIcon
        });
    }
}).addTo(map);






//Layer Control

var haritalar = {
    "OSM" : osm,
    "Water Color Map" : watercolor,
    "Dark" : dark,
    "Google Street" : googleStreets,
    "Google Satellite" : googleSat
}

L.control.layers(haritalar, { collapsed: false}).addTo(map);