/*
 * Markers: https://sites.google.com/site/gmapsdevelopment/
*/
function initialize() {
	var mapCanvas = document.getElementById('map-canvas');
	var mapOptions = {
		center: new google.maps.LatLng(34.0450, -118.2500),
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(mapCanvas, mapOptions);
	
	var iconBase = 'http://labs.google.com/ridefinder/images/';
	
	restaurant_list.forEach(function(r) {
		var myLatLng = new google.maps.LatLng(r.lat, r.lng);
		
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			icon: iconBase + 'mm_20_red.png',
			title: r.name
		});
		
		var contentString = '<div id="content">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<h1>' + r.name + '</h1>'+
			'<div id="bodyContent">'+
			r.description + 
			'</div>'+
			'</div>';
		  
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	});
	
	
	
	
	
	
	
	 

}




google.maps.event.addDomListener(window, 'load', initialize);
