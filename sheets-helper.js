function Restaurant(obj) {
    this.name = obj.name;
    this.description = obj.description;
    this.address = obj.address;
    this.lat = obj.coordinates[0];
    this.lng = obj.coordinates[1];
};

var restaurant_list = [];

$.getJSON("https://raw.githubusercontent.com/matikin9/map-dtla-lowcarb/master/data/low-carb-data.json", function (data) {
    var items = data.restaurants;
    
    $.each(data, function (key, val) {
        if (key == "restaurants") {
            restaurant_list = val;
            /*
            var restaurant_objects = val;

            $.each(val, function (k, v) {
                var item = "key: " + k + ", val: " + v;
                items.push(item + "<br />");
            });
            */
            
            var iconBase = 'http://labs.google.com/ridefinder/images/';
	
        	restaurant_list.forEach(function(r) {
        		var myLatLng = new google.maps.LatLng(r.coordinates.latitude, r.coordinates.longitude);
        		
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
        			r.description + '<br /><br />' + r.address +
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

    });
});

/*
restaurant_data.forEach(function (item) {
    if (item.coordinates[0] != null && item.coordinates[1] != null) {
        var entry = new Restaurant(item);
        restaurant_list.push(entry);
    }
});
*/