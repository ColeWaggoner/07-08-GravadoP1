// Variables
var searchbtn = document.getElementById("search")
var city = document.querySelector("#cityName")

  

 



/*link for finding geoID by city (geoid found at data/typehead/results/3/detailsV2/locationId)    
(lat and long found at data/typehead/results/3/detailsV2/geocode/lat, long)*/

getLocation = (city) => {
  var URL = 'https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=' + city + '&lang=en_US&units=mi'

  const cityoptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '92892adfc3msh6c3519920a0dd57p1c0fcbjsn891d97cf349d',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };

  fetch(URL, cityoptions)
    .then(function (response) {
     
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      getprice(data)
      
      
    })
}
  


// link for filter options (price is found at object/data/appPres/0/filters/availablefiltergroups/0/filters/3/values)

getprice = (id) => {
  var geoID = id.data.Typeahead_autocomplete.results[3].detailsV2.locationId
  console.log(geoID)

  const priceoptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '92892adfc3msh6c3519920a0dd57p1c0fcbjsn891d97cf349d',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    },
    body: '{"geoId":'+ geoID +',\
    "sort":"POPULARITY","sortOrder":"desc","filters":[{"id":"establishment","value":["10591"]}],"updateToken":""}'
  };
  fetch('https://travel-advisor.p.rapidapi.com/restaurants/v2/list?currency=USD&lang=en_US', priceoptions)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err))

}



//link for finding resaurants 
  getRecipies = (foodType) => {

  fetch('https://api.spoonacular.com/recipes/complexSearch?query='+ foodType +'&number=10&apiKey=965b1b05045a4605a4a66144db0c2500')
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err))

  }


    // Search Button

    searchbtn.addEventListener("click", function (event) {
      event.preventDefault()
    
      getRecipies(city.value)

      // getLocation(city.value)
    
      console.log(city.value)
    })