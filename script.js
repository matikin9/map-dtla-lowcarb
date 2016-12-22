/*
 * Initialize Firebase
 */
var config = {
    apiKey: "AIzaSyC8Gpmbx5n6ql6Bk05anfYpl7S3HEdnGDw",
    authDomain: "map-dtla-lowcarb.firebaseapp.com",
    databaseURL: "https://map-dtla-lowcarb.firebaseio.com",
    storageBucket: "map-dtla-lowcarb.appspot.com",
    messagingSenderId: "423669000304"
};
firebase.initializeApp(config);

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
