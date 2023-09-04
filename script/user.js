const storedName = localStorage.getItem("userName");

if (storedName) {
  document.getElementById("nameheader").innerHTML = "Hey " + storedName + ", ";
} else {
  const userName = prompt("Please enter your name:");

  if (userName) {
    localStorage.setItem("userName", userName);
    alert(`Hello, ${userName}! Your name has been stored.`);
  } else {
    alert("You didn't enter a name.");
  }
}

const greetingsheader = document.getElementById("greetingsheader");
function getGreeting() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good Morning!";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Good Afternoon!";
  } else {
    return "Good Evening!";
  }
}

const greeting = getGreeting();
greetingsheader.innerHTML = greeting;
