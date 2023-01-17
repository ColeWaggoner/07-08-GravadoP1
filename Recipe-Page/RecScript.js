// Variables
var foodInfo  = document.getElementById("info-form")
var submitbtn = document.getElementById("form-submit")
var lColumn = document.querySelector(".cardLeft")
var rColumn = document.querySelector(".cardRight")
// var body = document.querySelector('.body')
  // body.style.backgroundColor = '#788585'


//link for finding recipes 
  getRecID = (foodType) => {

  fetch('https://api.spoonacular.com/recipes/complexSearch?query='+ foodType +'&number=4&apiKey=965b1b05045a4605a4a66144db0c2500')
    .then(function (response) {
     
      return response.json()
    })
    .then(function (recData) {
      console.log(recData)
      getRecipe(recData)
        
    })
}


getRecipe = (foodData) => {

  for (let i = 4; i < 8; i++) {
    if (i % 2 == 0) {
  var recID = foodData.results[i-4].id
  console.log(recID)

  fetch('https://api.spoonacular.com/recipes/'+ recID +'/information?apiKey=965b1b05045a4605a4a66144db0c2500')
    .then(function (response) {
     
      return response.json()
    })
    .then(function (recData) {
      console.log(recData)
      appendLink(recData)
    })

    appendLink = (recInfo) => {
      var title = recInfo.title
      var picdata = recInfo.image
      var link = recInfo.sourceUrl

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

      recLink.textContent = title
      recLink.setAttribute("href", link)
      content.appendChild(recLink)
      

      mainCard.append(content)

      lColumn.append(mainCard)
    }
  }
        

  if (i % 2 !== 0) {
        var recID = foodData.results[i-4].id
        console.log(recID)
      
        fetch('https://api.spoonacular.com/recipes/'+ recID +'/information?apiKey=965b1b05045a4605a4a66144db0c2500')
          .then(function (response) {
           
            return response.json()
          })
          .then(function (recData) {
            console.log(recData)
            appendLinkRight(recData)
          })
      
          appendLinkRight = (recInfo) => {
            var title = recInfo.title
            var picdata = recInfo.image
            var link = recInfo.sourceUrl
      
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
      
            recLink.textContent = title
            recLink.setAttribute("href", link)
            content.appendChild(recLink)
            
      
            mainCard.append(content)
      
            rColumn.append(mainCard)
          }
        }
      }
    }


    // Search Button

    submitbtn.addEventListener("click", function (event) {
      event.preventDefault()
    
      getRecID(foodInfo.food.value)

    
    })
