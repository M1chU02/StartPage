const instagramBtn = document.getElementById("card1");
const twitterBtn = document.getElementById("card2");
const githubBtn = document.getElementById("card3");
const youtubeBtn = document.getElementById("card4");

instagramBtn.addEventListener("click", () => {
  window.location = "http://www.instagram.com";
});

twitterBtn.addEventListener("click", () => {
  window.location = "http://www.twitter.com";
});

githubBtn.addEventListener("click", () => {
  window.location = "http://www.github.com";
});

youtubeBtn.addEventListener("click", () => {
  window.location = "http://www.youtube.com";
});
