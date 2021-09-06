const mainContainer = document.querySelector("#main-container");
const quoteHoverContainer = document.querySelector(".quote-hover-container");
const quoteHoverText = document.querySelector("#quote-hover-text");
var defaultQuoteHoverText = quoteHoverText.innerHTML;

const quoteText = document.querySelector("#quote-text");
const quoteAuthor = document.querySelector("#quote-author");

mainContainer.addEventListener("click", listenToClick, { capture: true });

mainContainer.addEventListener("mouseenter", listenToHoverOverQuote);

mainContainer.addEventListener("mouseleave", listenToHoverOutQuote);

function listenToClick() {
  var copiedText = '"' + quoteText.innerText + '" ' + quoteAuthor.innerText;
  navigator.clipboard.writeText(copiedText);
  quoteHoverText.innerHTML = "Copied!";
  document.querySelector(".fa-copy").style.color = "#21a0a0";
  setTimeout(function () {
    listenToHoverOutQuote();
    document.querySelector(".fa-copy").style.color = "black";
  }, 700);
}

function listenToHoverOverQuote(e) {
  quoteHoverContainer.setAttribute(
    "style",
    "display: flex; justify-content: center; align-items: center; flex-direction: column; cursor: pointer;"
  );
}

function listenToHoverOutQuote() {
  console.log("mouse leave!");
  quoteHoverContainer.setAttribute("style", "display: none;");
  quoteHoverText.innerHTML = defaultQuoteHoverText;
}
