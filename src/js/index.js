var map = L.map('map').setView([25.245074186193185, 33.19374812809622], 6);

googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    attribution: "Fâtımîler Dönemi Mısır Haritası (360-560)",
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

var esriWorldShaded = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
	maxZoom: 13
});

var CartoDB_VoyagerNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});


var waterColorMap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});


/// İklim:
//L.geoJSON(iklimJSON, {
//    onEachFeature: function(feature, layer) {
//        layer.bindPopup(feature.properties.name)
//    },
//}).addTo(map);


/// City:
// City bindpopup Stil:	
var s_light_style = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 2,
    opacity: 2,
    fillOpacity: 0.9
};

// Şehirler:
var city = L.geoJSON(locationMisirJSON, {
    onEachFeature : function(feature, layer){
        var popupContent =  '<h4 class = "text-primary">'+ feature.properties.name +'</h4>' +
                            '<div class="container"><table class="table table-striped">' +
                            '<tr><td><b>Arabic:</b></td><td><b>' + feature.properties.arabicName +'</b></td></tr>' +
                            '<tr><td><b>Bilgi:</b></td><td>' + feature.properties.bilgi + '</td></tr>' +
                            '<tr><td><b>Resim:</b></td><td><a href="./doc/sehir/'+ feature.properties.doc +' " target="_blank"><img src="./doc/sehir/' + feature.properties.img + '" width="190" height="170" /></td></tr>';
        layer.bindPopup(popupContent);
        layer.bindTooltip(feature.properties.name, {
            permanent: true,
            opacity: 0.8,
            direction: 'right'            
        });
	},
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, s_light_style);
    }
}).addTo(map);


/// Mescid:
// Camiler için icon:
var camiIcon = L.icon({
    iconUrl: "./src/img/mscd.png",
    iconSize: [30, 37]

});

var mesque = L.geoJSON(camiJSON, {
    onEachFeature : function(feature, layer){
        var popupContent =  '<h4 class = "text-primary">'+ feature.properties.name +'</h4>' +
                            '<div class="container"><table class="table table-striped">' +
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



// > Mesafeler > //
var mesafeStyle = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 5,
    opacity: 5,
    fillOpacity: 0.9
};

var mesafe = L.geoJSON(mesafeJSON, {
    onEachFeature : function(feature, layer) {
        var popupContent =  '<h4 class = "text-primary">'+ feature.properties.name +' Güzargahı</h4>' +
                            '<div class="container"><table class="table table-striped">' +
                            '<tbody><tr><td><b>Mesafe:</b></td><td><b>'+ feature.properties.mesafe +'</b></td></tr>' +
                            '<tr><td><b>KM:</b></td><td><b>' + feature.properties.km +'</b></td></tr>' +
                            '<tr><td><b>Bilgi:</b></td><td>' + feature.properties.bilgi + '</td></tr>'
        layer.bindPopup(popupContent);
    },
    style: mesafeStyle
}).addTo(map);


//Layer Control
var baseMaps = {
    "Google Satellite" : googleSat,
    "Esri World Shaded": esriWorldShaded,
    " CartoDB_Etiketsiz" : CartoDB_VoyagerNoLabels,
    "Water Color Map" : waterColorMap
}

// Over Layer Control
var overLayerMaps = {
    "Şehirler": city,
    "Camiiler": mesque,
    "Mesafeler": mesafe
} 


L.control.layers(baseMaps, overLayerMaps).addTo(map);
