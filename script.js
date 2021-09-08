const mainContainer = document.querySelector("#main-container");
const quoteHoverContainer = document.querySelector(".quote-hover-container");
const quoteHoverText = document.querySelector("#quote-hover-text");
var defaultQuoteHoverText = quoteHoverText.innerText;
const generateQuoteBtn = document.querySelector("#generate-quote-btn");
const quoteText = document.querySelector("#quote-text");
const quoteAuthor = document.querySelector("#quote-author");
const quoteWrapper = document.querySelector("#quote-wrapper");

// generate and set the random primary color of the page
var primaryColor = changePrimaryColor();

var apiQuotes = [];

/* Here the application start */
getQuotes();

async function getQuotes() {
  loadFetching();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    completedFetching();
  } catch (error) {
    alert(error);
  }
}

function loadFetching() {
  quoteWrapper.hidden = true;
}

function completedFetching() {
  getNewQuote();
  document.querySelector("#loadingSpinner").remove();
  quoteWrapper.hidden = false;
  generateQuoteBtn.style.visibility = "visible";

  mainContainer.addEventListener("mouseenter", listenToHoverOverQuote);
  mainContainer.addEventListener("mouseleave", listenToHoverOutQuote);

  mainContainer.addEventListener("click", listenToClickOnQuote, {
    capture: true,
  });

  generateQuoteBtn.addEventListener("mouseenter", listenToHoverOverButton);

  generateQuoteBtn.addEventListener("mouseleave", listenToHoverOutButton);

  generateQuoteBtn.addEventListener("click", () => {
    changePrimaryColor();
    listenToHoverOverButton();
    getNewQuote();
  });
}

function getNewQuote() {
  var randomIndex = Math.floor(Math.random() * apiQuotes.length);
  var newQuote = apiQuotes[randomIndex];
  setQuoteContent(newQuote["text"], newQuote["author"]);
}

function setQuoteContent(text, author) {
  quoteText.innerText = text;
  var authorName = author;
  if (authorName === null) {
    authorName = "Unknown";
  }
  quoteAuthor.innerText = "- " + authorName;
}

function listenToHoverOverButton() {
  generateQuoteBtn.style.backgroundColor = getDarkerPrimaryColor(primaryColor);
  generateQuoteBtn.style.color = "white";
}

function listenToHoverOutButton() {
  generateQuoteBtn.style.backgroundColor = "white";
  generateQuoteBtn.style.color = primaryColor;
}

function getDarkerPrimaryColor(primaryColor) {
  var colors = primaryColor.slice(4, -1);
  colors = colors.split(", ");
  darkerColors = colors.map(function (color) {
    color *= 0.75;
    return color;
  });

  return setRGBColor(darkerColors[0], darkerColors[1], darkerColors[2]);
}

// a function to set the primary color on elements
function changePrimaryColor() {
  primaryColor = generateRandomColor();
  generateQuoteBtn.style.color = primaryColor;
  document.body.style.backgroundColor = primaryColor;

  document.querySelectorAll(".fas").forEach((element) => {
    element.style.color = primaryColor;
  });
  document.querySelector(".fa-copy").style.color = "black";
  return primaryColor;
}

function listenToClickOnQuote() {
  var copiedText = '"' + quoteText.innerText + '" ' + quoteAuthor.innerText;
  navigator.clipboard.writeText(copiedText);
  quoteHoverText.innerHTML = "Copied!";
  document.querySelector(".fa-copy").style.color = primaryColor;
  setTimeout(function () {
    listenToHoverOutQuote();
    document.querySelector(".fa-copy").style.color = "black";
  }, 700);
}

function listenToHoverOverQuote() {
  quoteHoverContainer.setAttribute(
    "style",
    "display: flex; justify-content: center; align-items: center; flex-direction: column; cursor: pointer; "
  );
}

function listenToHoverOutQuote() {
  quoteHoverContainer.setAttribute("style", "display: none;");
  quoteHoverText.innerHTML = defaultQuoteHoverText;
}

function generateRandomColor() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);

  if (
    Math.abs(red - green) >= 128 ||
    Math.abs(red - blue) >= 128 ||
    Math.abs(green - blue) >= 128 ||
    Math.abs(red - green) <= 10 ||
    Math.abs(red - blue) <= 10 ||
    Math.abs(green - blue) <= 10 ||
    ((red >= 200) & (green >= 200) && blue >= 200)
  ) {
    return generateRandomColor();
  }

  return setRGBColor(red, green, blue);
}

function setRGBColor(red, green, blue) {
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

/* TODO: 
         - at the end do not forget to add made with love by loay
         - want to learn more about animatian such as ease in and ease out
         - responsivity : media queries + rem
*/

/*
What I did today:
- working with javascript to add interactivity and functionality with js to enhance user experience
- learned how to use the position: relative and absulote
- grasping the concepts of phazes of events (bubbling and capturing)
- enriching the knowledge on events and learnig about different events such: mouseenter and mouseleave, mouseover and mouseout
- make the use of set attribute function

*/
