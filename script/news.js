const API = "pub_28833ead25450dcd6a63f5f8ac39b859b0bb2";
const LOCALNEWS_STORAGE_KEY = "localnewsData";
const GLOBALNEWS_STORAGE_KEY = "globalnewsData";
const STORAGE_EXPIRATION_HOURS = 3;

function fetchNews(countryCode, isGlobal) {
  const storageKey = isGlobal ? GLOBALNEWS_STORAGE_KEY : LOCALNEWS_STORAGE_KEY;
  const existingNewsData = getNewsFromStorage(storageKey);
  const currentTime = new Date().getTime();

  if (
    existingNewsData &&
    currentTime - existingNewsData.timestamp <
      STORAGE_EXPIRATION_HOURS * 60 * 60 * 1000
  ) {
    renderNewsFromStorage(existingNewsData.data, isGlobal);
  } else {
    const newsUrl = isGlobal
      ? `https://newsdata.io/api/1/news?apikey=${API}&language=en,pl&category=top`
      : `https://newsdata.io/api/1/news?apikey=${API}&country=${countryCode}&category=top`;

    fetch(newsUrl)
      .then((response) => response.json())
      .then((data) => {
        const articles = data.results;
        const newsData = {
          data: articles,
          timestamp: currentTime,
        };
        saveNewsToStorage(newsData, storageKey);
        renderNews(articles, isGlobal);
      });
  }
}

function saveNewsToStorage(data, storageKey) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function getNewsFromStorage(storageKey) {
  const storedData = localStorage.getItem(storageKey);
  return storedData ? JSON.parse(storedData) : null;
}

function renderNewsFromStorage(data, isGlobal) {
  const newsdiv = isGlobal
    ? document.getElementById("worldnewsdiv")
    : document.getElementById("newsdiv");

  newsdiv.innerHTML = "";
  data.forEach((result) => {
    const title = result.title;
    const imageUrl = result.image_url;
    const publishedtime = result.pubDate;
    const formattedDate = new Date(publishedtime).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const articleUrl = result.link;
    let newstile = document.createElement("div");
    newstile.innerHTML = `
      <a href="${articleUrl}" target="_blank">
        <div class="newstile-content">
          <img src="${imageUrl}" class="articleImg" onerror="this.style.display='none'" />
          <h2>${title}</h2>
          <p>${formattedDate}</p>
        </div>
      </a><hr>`;
    newstile.className = "newstile";
    newsdiv.appendChild(newstile);
  });
}

function renderNews(articles, isGlobal) {
  const newsdiv = isGlobal
    ? document.getElementById("worldnewsdiv")
    : document.getElementById("newsdiv");

  newsdiv.innerHTML = "";
  articles.forEach((result) => {
    const title = result.title;
    const imageUrl = result.image_url;
    const publishedtime = result.pubDate;
    const formattedDate = new Date(publishedtime).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const articleUrl = result.link;
    let newstile = document.createElement("div");
    newstile.innerHTML = `
      <a href="${articleUrl}" target="_blank">
        <div class="newstile-content">
          <img src="${imageUrl}" class="articleImg" onerror="this.style.display='none'" />
          <h2>${title}</h2>
          <p>${formattedDate}</p>
        </div>
      </a><hr>`;
    newstile.className = "newstile";
    newsdiv.appendChild(newstile);
  });
}

const [lat, lng] = geolocationCookie.split(",");

const reverseGeocodeUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;

fetch(reverseGeocodeUrl)
  .then((response) => response.json())
  .then((data) => {
    const countryCode = data.countryCode;
    fetchNews(countryCode, false); // Fetch local news
    fetchNews(null, true); // Fetch global news
  });
