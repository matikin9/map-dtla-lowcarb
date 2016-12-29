

/*
 * Initialize Map
 */
L.mapbox.accessToken = 'pk.eyJ1IjoibWF0aWtpbjkiLCJhIjoiYjMyMjBjZTE4NWUxMDkxOWZjZjFjZWEzZTcxNDUxOTkifQ._ldFl3e17jCs7aWm6zMZ3Q';
var mymap = L.map('map-display').setView([34.0522, -118.2437], 13);
L.mapbox.styleLayer('mapbox://styles/matikin9/cim5bt1q100iy9jkpl7ff9d1h').addTo(mymap);

/*
 * Retrieve data and add to map
 */
firebase.database().ref('restaurants').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        
        var $restaurantInfo = $("<div>", { 
        	"id": key,
        	"class": "restaurant-data"
        });
        
        // Create element with restaurant info.
        $restaurantInfo.append("<h1>" + childData.name + "</h1>");
        $restaurantInfo.append("<p>" + childData.address + "</p>");
        $restaurantInfo.append("<ul><li>" + childData.food.join('</li><li>') + "</li></ul>");
        
        // Create marker and add to map.
        L.marker([childData.lat, childData.lng])
        	.bindPopup($restaurantInfo[0])
        	.addTo(mymap);
    });
});

/*
 * Retrieve Dash Route A route and stops, and add to map.
 */
drawDash("Route A", "#a52c2c", "#6d1d1d", "https://data.lacity.org/resource/5icv-hrai.json", "https://data.lacity.org/resource/4wd4-uzr6.json");
drawDash("Route B", "#23a1c4", "#1b6f87", "https://data.lacity.org/resource/5icv-hrai.json", "https://data.lacity.org/resource/4wd4-uzr6.json");
drawDash("Route D", "#46b721", "#2d6d18", "https://data.lacity.org/resource/5icv-hrai.json", "https://data.lacity.org/resource/4wd4-uzr6.json");

/*
 * Helper Functions
 */

// Draw Dash routes and stops
function drawDash(routeName, lineColor, stopColor, lineUrl, stopUrl) {
    var limit = 100;
    var apptoken = "TWgawPUBMfk08SOFiwkeGY9pk";
    
    $.ajax({
        url: lineUrl + '?routename=' + routeName,
        type: "GET",
        dataType: "json",
        data: {
            "$limit" : limit,
            "$$app_token" : apptoken
        }
    }).done(function(data) {
        var coords = data[0].the_geom.coordinates[0];
        var pointList = [];
        
        $.each(coords, function(key, value) {
           var point = new L.LatLng(value[1], value[0]);
           pointList.push(point);
        });
        
        var line = new L.polyline(pointList, {
            color: lineColor,
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1
        });
        
        line.addTo(mymap);
    });
    
    $.ajax({
        url: stopUrl + '?routename=' + routeName,
        type: "GET",
        dataType: "json",
        data: {
            "$limit" : limit,
            "$$app_token" : apptoken
        }
    }).done(function(data) {
        $.each(data, function(key, value) {
            var lat = value.the_geom.coordinates[1];
            var lng = value.the_geom.coordinates[0];
            
            L.circleMarker(new L.LatLng(lat, lng), {
               color: stopColor,
               weight: 1,
               opacity: 0.8
           }).setRadius(3).addTo(mymap);
        });
    });
}