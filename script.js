// Variables
var foodInfo = document.getElementById("info-form");
var submitbtn = document.getElementById("form-submit");
var cardList = document.querySelector(".recCard");
var resCardList = document.querySelector(".restCard");
// var body = document.querySelector('.body')
// body.style.backgroundColor = '#788585'

//navbar
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
});

// link for filter options (price is found at object/data/appPres/0/filters/availablefiltergroups/0/filters/3/values)

//navbar
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
});

getprice = (id) => {
  var geoID = id.data.Typeahead_autocomplete.results[3].detailsV2.locationId;
  console.log(geoID);

  const priceoptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "92892adfc3msh6c3519920a0dd57p1c0fcbjsn891d97cf349d",
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
    body:
      '{"geoId":' +
      geoID +
      ',\
    "sort":"POPULARITY","sortOrder":"desc","filters":[{"id":"establishment","value":["10591"]}],"updateToken":""}',
  };
  fetch(
    "https://travel-advisor.p.rapidapi.com/restaurants/v2/list?currency=USD&lang=en_US",
    priceoptions
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

//link for finding recipes
getRecID = (foodType) => {
  fetch(
    "https://api.spoonacular.com/recipes/complexSearch?query=" +
      foodType +
      "&number=4&apiKey=572f8f5db10547c1b35149ddc0d3061c"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (recData) {
      console.log(recData);
      getRecipe(recData);
    });
};

getRecipe = (foodData) => {
  for (let i = 0; i < 4; i++) {
    var recID = foodData.results[i].id;
    console.log(recID);

    fetch(
      "https://api.spoonacular.com/recipes/" +
        recID +
        "/information?apiKey=572f8f5db10547c1b35149ddc0d3061c"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (recData) {
        console.log(recData);
        appendLink(recData);
      });

    appendLink = (recInfo) => {
      var title = recInfo.title;
      var picdata = recInfo.image;
      var link = recInfo.sourceUrl;

      var mainCard = document.createElement("div");
      //styling element
      mainCard.style.backgroundColor = "#ede9d8";
      mainCard.style.boxShadow = "4px 4px 12px rgba(0, 0, 0, .4)";
      mainCard.style.borderRadius = "20px";
      mainCard.style.margin = "25px";
      mainCard.style.padding = "15px";

      //adding image to the card
      var cardImage = document.createElement("div");
      cardImage.style.padding = "10px";

      var pic = document.createElement("img");
      pic.style.borderRadius = "20px";
      pic.style.maxHeight = "100%";
      pic.style.maxWidth = "100%";

      pic.src = picdata;
      if (!recInfo.image) {
        pic.src =
          "C:/Users/colew/Documents/Classwork/Projects/Project 1/PPC-P1/assets/NotFound.png";
      }

      cardImage.appendChild(pic);
      mainCard.append(cardImage);

      //adding text and link to the card

      var content = document.createElement("div");
      var recLink = document.createElement("a");
      recLink.style.textDecoration = "none";
      recLink.style.color = "black";

      recLink.textContent = title;
      recLink.setAttribute("href", link);
      content.appendChild(recLink);

      mainCard.append(content);

      cardList.append(mainCard);
    };
  }
};

/*link for finding geoID by city (geoid found at data/typehead/results/3/detailsV2/locationId)    
(lat and long found at data/typeahead/results/3/detailsV2/geocode/lat, long)*/

getLocation = (city) => {
  var URL =
    "https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=" +
    city +
    "&lang=en_US&units=mi";

  const cityoptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "92892adfc3msh6c3519920a0dd57p1c0fcbjsn891d97cf349d",
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };

  fetch(URL, cityoptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getRestaurant(data);
    });
};

getRestaurant = (cityInfo) => {
  var lat =
    cityInfo.data.Typeahead_autocomplete.results[3].detailsV2.geocode.latitude;
  var long =
    cityInfo.data.Typeahead_autocomplete.results[3].detailsV2.geocode.longitude;
  var cuisine = foodInfo.food.value;
  console.log(lat);
  console.log(long);

  fetch(
    "https://api.spoonacular.com/food/restaurants/search?cuisine=" +
      cuisine +
      "&lat=" +
      lat +
      "&lng=" +
      long +
      "&apiKey=572f8f5db10547c1b35149ddc0d3061c"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (recData) {
      console.log(recData);
      appendResCard(recData);
    });

  appendResCard = (restInfo) => {
    for (let i = 0; i < 4; i++) {
      var name = restInfo.restaurants[i].name;
      var picdata = restInfo.restaurants[i].logo_photos[0];
      var rating = restInfo.restaurants[i].weighted_rating_value;

      var mainCard = document.createElement("div");
      //styling element
      mainCard.style.backgroundColor = "#ede9d8";
      mainCard.style.boxShadow = "4px 4px 12px rgba(0, 0, 0, .4)";
      mainCard.style.borderRadius = "20px";
      mainCard.style.margin = "25px";
      mainCard.style.padding = "15px";

      //adding image to the card
      var cardImage = document.createElement("div");
      cardImage.style.padding = "10px";

      var pic = document.createElement("img");
      pic.style.borderRadius = "20px";
      pic.style.maxHeight = "100%";
      pic.style.maxWidth = "100%";

      pic.src = picdata;
      if (!restInfo.restaurants[i].logo_photos[0]) {
        pic.src =
          "C:/Users/colew/Documents/Classwork/Projects/Project 1/PPC-P1/assets/NotFound.png";
      }

      cardImage.appendChild(pic);
      mainCard.append(cardImage);

      //adding text and link to the card

      var content = document.createElement("div");
      var recLink = document.createElement("a");
      recLink.style.textDecoration = "none";
      recLink.style.color = "black";

      recLink.textContent = name;

      content.appendChild(recLink);

      mainCard.append(content);

      resCardList.append(mainCard);
    }
  };
};

// Search Button

submitbtn.addEventListener("click", function (event) {
  event.preventDefault();

  cardList.innerHTML = "";
  resCardList.innerHTML = "";

  getRecID(foodInfo.food.value);

  getLocation(foodInfo.city.value)
});
