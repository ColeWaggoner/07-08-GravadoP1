
/*link for finding geoID by city (geoid found at data/typehead/results/3/detailsV2/locationId)    
(lat and long found at data/typehead/results/3/detailsV2/geocode/lat, long)*/


const cityoptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '92892adfc3msh6c3519920a0dd57p1c0fcbjsn891d97cf349d',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};

fetch('https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=tampa&lang=en_US&units=mi', cityoptions)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


// link for filter options (price is found at object/data/appPres/0/filters/availablefiltergroups/0/filters/3/values)

const priceoptions = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '92892adfc3msh6c3519920a0dd57p1c0fcbjsn891d97cf349d',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  },
  body: '{"geoId":34678,\
  "sort":"POPULARITY","sortOrder":"desc","filters":[{"id":"establishment","value":["10591"]}],"updateToken":""}'
};

fetch('https://travel-advisor.p.rapidapi.com/restaurants/v2/list?currency=USD&lang=en_US', priceoptions)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


//link for finding resaurants 

fetch('https://api.spoonacular.com/food/restaurants/search?apiKey=965b1b05045a4605a4a66144db0c2500')
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


//navbar 
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});