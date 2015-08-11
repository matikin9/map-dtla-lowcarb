function Restaurant(obj) {
    this.name = obj.name;
    this.description = obj.description;
    this.address = obj.address;
    this.lat = obj.coordinates[0];
    this.lng = obj.coordinates[1];
};

var restaurant_list = [];

var obj = $.getJSON("data/low-carb-data.json", function(data) {
    var items = [];
    $.each(data, function(key, val) {
        var item = "key: " + key + ", val: " + val;
       items.push(item + "<br />"); 
    });
});

restaurant_data.forEach(function(item) {
    if (item.coordinates[0] != null && item.coordinates[1] != null) {
        var entry = new Restaurant(item);
        restaurant_list.push(entry);
    }
});
