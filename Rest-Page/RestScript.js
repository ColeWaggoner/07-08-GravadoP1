// Variables
var foodInfo  = document.getElementById("info-form")
var submitbtn = document.getElementById("form-submit")
var lColumn = document.querySelector(".cardLeft")
var rColumn = document.querySelector(".cardRight")
// var body = document.querySelector('.body')
  // body.style.backgroundColor = '#788585'





getLocation = (city) => {
  var URL = 'https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=' + city + '&lang=en_US&units=mi'

  const cityoptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '92892adfc3msh6c3519920a0dd57p1c0fcbjsn891d97cf349d',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  }

  fetch(URL, cityoptions)
    .then(function (response) {
     
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      getRestaurant(data)
      
    })
}

getRestaurant = (cityInfo) => {
  var lat = cityInfo.data.Typeahead_autocomplete.results[3].detailsV2.geocode.latitude
  var long = cityInfo.data.Typeahead_autocomplete.results[3].detailsV2.geocode.longitude
  var cuisine = foodInfo.food.value
  console.log(lat)
  console.log(long)

  fetch('https://api.spoonacular.com/food/restaurants/search?cuisine='+ cuisine +'&lat=' + lat + '&lng=' + long + '&apiKey=965b1b05045a4605a4a66144db0c2500')
  .then(function (response) {
   
    return response.json()
  })
  .then(function (recData) {
    console.log(recData)
    appendResCard(recData)
  })

}




  appendResCard = (restInfo) => {

    for (let i = 4; i < 8; i++) {
      if (i % 2 == 0) {
    var name = restInfo.restaurants[i].name
    var picdata = restInfo.restaurants[i].logo_photos[0]
    var rating = restInfo.restaurants[i].weighted_rating_value

    var mainCard = document.createElement('div')
      //styling element
       mainCard.style.backgroundColor = '#ede9d8'
       mainCard.style.boxShadow = '4px 4px 12px rgba(0, 0, 0, .4)'
       mainCard.style.borderRadius = '20px'
       mainCard.style.margin = '25px'
       mainCard.style.padding = '15px'


    //adding image to the card
    var cardImage = document.createElement('div')
      cardImage.style.padding = '10px'
      
      
    var pic = document.createElement('img')
      pic.style.borderRadius = '20px'
      pic.style.maxHeight = '100%'
      pic.style.maxWidth = '100%'
      

    pic.src = picdata

    cardImage.appendChild(pic)
    mainCard.append(cardImage)

    //adding text and link to the card

    var content = document.createElement('div')
    var recLink = document.createElement('a')
      recLink.style.textDecoration = 'none'
      recLink.style.color = 'black'

    recLink.textContent = name

    content.appendChild(recLink)
    

    mainCard.append(content)

    lColumn.append(mainCard)
      

  }


if (i % 2 !== 0) {
  var name = restInfo.restaurants[i].name
  var picdata = restInfo.restaurants[i].logo_photos[0]
  var rating = restInfo.restaurants[i].weighted_rating_value

  var mainCard = document.createElement('div')
    //styling element
     mainCard.style.backgroundColor = '#ede9d8'
     mainCard.style.boxShadow = '4px 4px 12px rgba(0, 0, 0, .4)'
     mainCard.style.borderRadius = '20px'
     mainCard.style.margin = '25px'
     mainCard.style.padding = '15px'


  //adding image to the card
  var cardImage = document.createElement('div')
    cardImage.style.padding = '10px'
    
    
  var pic = document.createElement('img')
    pic.style.borderRadius = '20px'
    pic.style.maxHeight = '100%'
    pic.style.maxWidth = '100%'
    

  pic.src = picdata

  cardImage.appendChild(pic)
  mainCard.append(cardImage)

  //adding text and link to the card

  var content = document.createElement('div')
  var recLink = document.createElement('a')
    recLink.style.textDecoration = 'none'
    recLink.style.color = 'black'

  recLink.textContent = name

  content.appendChild(recLink)
  

  mainCard.append(content)

  rColumn.append(mainCard)
    

}

}}




    // Search Button

    submitbtn.addEventListener("click", function (event) {
      event.preventDefault()
    
      getLocation(foodInfo.city.value)
      console.log(foodInfo.city.value)
    
    })
