if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const weather = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;
      fetch(weather)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const temperature = data.current_weather.temperature + "°C, ";
          document.getElementById("temperature").innerHTML = temperature;
        });
      const city = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
      fetch(city)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const city = data.city;
          document.getElementById("city").innerHTML = city;
        });
    },
    (error) => {
      console.error("Error getting user location:", error);
    }
  );
} else {
  console.error("Geolocation is not supported by this browser.");
}
