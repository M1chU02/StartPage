const API = "19731e62a7634ad0be42514b57afdf25";

function fetchNews(countryCode) {
  const newsUrl = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${API}`;
  fetch(newsUrl)
    .then((response) => response.json())
    .then((data) => {
      const articles = data.articles;
      const newsdiv = document.getElementById("newsdiv");
      newsdiv.innerHTML = "";
      articles.forEach((article) => {
        console.log("dsaasd");
        const title = article.title;
        const publishedtime = article.publishedAt;
        const formattedDate = new Date(publishedtime).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        const articleUrl = article.url;
        let newstile = document.createElement("div");
        newstile.innerHTML = `
          <a href="${articleUrl}" target="_blank">
            <div class="newstile-content">
              <h2>${title}</h2>
              <p>${formattedDate}</p>
            </div>
          </a>`;
        newstile.className = "newstile";
        newsdiv.appendChild(newstile);
      });
    });
}

navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const reverseGeocodeUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
  fetch(reverseGeocodeUrl)
    .then((response) => response.json())
    .then((data) => {
      const countryCode = data.countryCode;
      fetchNews(countryCode);
    });
});
