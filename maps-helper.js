/*
 * Markers: https://sites.google.com/site/gmapsdevelopment/
*/
var map;

function initialize() {
	var mapCanvas = document.getElementById('map-canvas');
	var mapOptions = {
		center: new google.maps.LatLng(34.0450, -118.2500),
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(mapCanvas, mapOptions);
	
}

google.maps.event.addDomListener(window, 'load', initialize);
