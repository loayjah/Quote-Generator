const mainContainer = document.querySelector("#main-container");
const quoteHoverContainer = document.querySelector(".quote-hover-container");
const quoteHoverText = document.querySelector("#quote-hover-text");
var defaultQuoteHoverText = quoteHoverText.innerText;
const generateQuoteBtn = document.querySelector("#generate-quote-btn");
const quoteText = document.querySelector("#quote-text");
const quoteAuthor = document.querySelector("#quote-author");
const quoteWrapper = document.querySelector("#quote-wrapper");

// generate and set the random primary color of the page
var primaryColor = "#21a0a0";
var secondaryColor = "#197878";

var apiQuotes = [];

var isTouchScreen = "ontouchstart" in document.documentElement;
//window.matchMedia("(min-width: 767px)");
/* Here the application start */
getQuotes();

async function getQuotes() {
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    completedFetching();
  } catch (error) {
    alert(error);
  }
}

function completedFetching() {
  getNewQuote();
  document.querySelector("#loadingSpinner").remove();
  quoteWrapper.style.display = "block";
  generateQuoteBtn.style.visibility = "visible";

  // if it is on touch screen there is no need for listenToHoverOver and Out of the quote
  if (!isTouchScreen) {
    mainContainer.addEventListener("mouseenter", listenToHoverOverQuote);
    mainContainer.addEventListener("mouseleave", listenToHoverOutQuote);
  }

  mainContainer.addEventListener("click", listenToClickOnQuote, {
    capture: true,
  });

  generateQuoteBtn.addEventListener("mouseenter", listenToHoverOverButton);

  generateQuoteBtn.addEventListener("mouseleave", listenToHoverOutButton);

  generateQuoteBtn.addEventListener("click", () => {
    changePrimaryColor();
    changeSecondaryColor();
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
  generateQuoteBtn.style.backgroundColor = secondaryColor;
  generateQuoteBtn.style.color = "white";
  if (isTouchScreen) setTimeout(listenToHoverOutButton, 200);
}

function listenToHoverOutButton() {
  generateQuoteBtn.style.backgroundColor = "white";
  generateQuoteBtn.style.color = primaryColor;
}

function getDarkerPrimaryColor(mPrimaryColor) {
  var colors = mPrimaryColor.slice(4, -1);
  colors = colors.split(", ");
  let darkerColors = colors.map(function (color) {
    color *= 0.75;
    return color;
  });

  return convertToRGBColor(darkerColors[0], darkerColors[1], darkerColors[2]);
}

function changeSecondaryColor() {
  secondaryColor = getDarkerPrimaryColor(primaryColor);
  document.querySelector("#page-footer").style.backgroundColor = secondaryColor;
  return secondaryColor;
}

// a function to set the primary color on elements
function changePrimaryColor() {
  primaryColor = generateRandomColor();
  generateQuoteBtn.style.color = primaryColor;
  document.querySelector("#wrapper").style.backgroundColor = primaryColor;
  document.body.style.backgroundColor = primaryColor;
  document.querySelectorAll(".fa-color").forEach((element) => {
    element.style.color = primaryColor;
  });
  return primaryColor;
}

function listenToClickOnQuote() {
  listenToHoverOverQuote(); // benificail in touch screen to show a message when copy
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
    (red >= 200 && green >= 200 && blue >= 200)
  ) {
    return generateRandomColor();
  }

  return convertToRGBColor(red, green, blue);
}

function convertToRGBColor(red, green, blue) {
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

/* TODO:
         - want to learn more about animatian such as ease in and ease out
*/

/*
What I did today:
- working with javascript to add interactivity and functionality with js to enhance user experience
- learned how to use the position: relative and absulote
- grasping the concepts of phazes of events (bubbling and capturing)
- enriching the knowledge on events and learnig about different events such: mouseenter and mouseleave, mouseover and mouseout
- make the use of set attribute function

*/
