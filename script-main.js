/*
 * Markers: https://sites.google.com/site/gmapsdevelopment/
*/
var map;

function init_map() {
	var mapCanvas = document.getElementById('map-canvas');
	var mapOptions = {
		center: new google.maps.LatLng(34.0450, -118.2500),
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(mapCanvas, mapOptions);
}

google.maps.event.addDomListener(window, 'load', init_map);

var restaurant_list = [];
var infoWindow_list = [];
var iconBase = 'http://labs.google.com/ridefinder/images/';

$.getJSON("https://raw.githubusercontent.com/matikin9/map-dtla-lowcarb/master/data/low-carb-data.json", function (data) {
    var items = data.restaurants;
    
    $.each(data, function (key, val) {
        if (key == "restaurants") {
            restaurant_list = val;
	
        	restaurant_list.forEach(function(r) {
        		var myLatLng = new google.maps.LatLng(r.coordinates.latitude, r.coordinates.longitude);
        		
        		var marker = new google.maps.Marker({
        			position: myLatLng,
        			map: map,
        			icon: iconBase + 'mm_20_red.png',
        			title: r.name
        		});
        		
        		var contentString = '<div id="wndContent">'+
        			'<h3>' + r.name + '</h3>'+
        			'<div id="wndBodyContent">'+
        			r.description + '<br /><br />' + r.address +
        			'</div>'+
        			'</div>';
        		  
        		var infoWindow = new google.maps.InfoWindow({
        			content: contentString
        		});
        		
				infoWindow_list.push(infoWindow);
				
        		google.maps.event.addListener(marker, 'click', function() {
					infoWindow_list.forEach(function(item) {
						item.close();
					});
        			infoWindow.open(map,marker);
        		});
        	});
        }

    });
});
