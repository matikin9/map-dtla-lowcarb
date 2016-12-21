/*global firebase */
/*global $*/
/*global L*/
/*global mymap*/

// Retrieve data and add markers to map
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
