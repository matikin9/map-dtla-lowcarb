# map-dtla-lowcarb

For those of us looking for low carb lunch options in DTLA.

## Usage

**index.html** - Displays a map with markers of restaurants.

**data/low-carb-data.json** - JSON output from Google Spreadsheet of data

To add to the spreadsheet of food options, fill in this Google Form: http://goo.gl/forms/wUc5rzGmFl

## Contributing

1. Fork it!
2. Make your changes!
3. Commit your changes: `git commit -am '<description-here>'`
4. Open a pull request!

## Restaurant Info for JSON file

Structure for additional restaurants in the JSON file:
```
,
    "" : {
      "address" : 
      "food" : [ "" ],
      "lat" : 
      "lng" : 
      "name" : 
      "type" : 
    }
```

## Restaurants to potentially add:

* Seoul Sausage - veggie bowl/side options?
* Manuela - vegetables, salad
* Comfort LA - wings, greens
* Yuko Kitchen - salads
* Ledlow - salads
* Spread Mediterranean - salad bowl
* Birdies - fried chicken
* Wurstkuche - sausages, no bun
* Bar Ama - vegetables
* Baco Mercat - vegetables

## Enhancements:

* Layer for DASH routes on map.
* Layer for Metro bike stations.
* Layer for Metro rail stations.
* Map toggling for: restaurants near DASH/Metro bike/Metro rail, food type, open now.
* More restaurant details: website, hours