const logoutBtn = document.querySelector("#logoutBtn");
const historyContainer = document.querySelector("#history");
const deliveryLocation = document.querySelector("#deliveryLocation");
const addBtn = document.querySelector("#addBtn");
const locationList = document.querySelector("#locationList");
const generateBtn = document.querySelector("#generateBtn");
const routeResult = document.querySelector("#routeResult");
const distance = document.querySelector("#distance");
const time = document.querySelector("#time");

let locations = [];
addBtn.addEventListener("click",()=>{
  const location=deliveryLocation.value.trim();
  if(location === ""){
    alert("please Enter the Location");
    return;
  }
  locations.push(location);

  const li = document.createElement("li");
  li.textContent = location;

  locationList.appendChild(li);
  deliveryLocation.value = "";
  
});

generateBtn.addEventListener("click",()=>{
  if(locations.length === 0){
    alert("Add Delivery Location");
    return;
  }

  routeResult.innerHTML = locations.join(" ");

  let totalDistance = locations.length*8;
  let estimatetime = locations.length*15;

  distance.textContent = totalDistance + "km";
  time.textContent = estimatetime + "min";
  
  const routeData = {
    route:locations.join(" "),
    distance:totalDistance + "km",
    time:estimatetime + "min"

  };

  let routeHistory = JSON.parse(localStorage.getItem("history")) || [];
  routeHistory.push(routeData);
  localStorage.setItem("history", JSON.stringify(routeHistory));

  displayHistory();
});

function displayHistory(){
  historyContainer.innerHTML="";
  let routeHistory = JSON.parse(localStorage.getItem("history")) || [];
  routeHistory.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("history-item");
    div.innerHTML = `<p> <strong>Route:</strong>${item.route}</p>
    <p>Distance:${item.distance}</p>
    <p>Time:${item.time}</p>`;

    historyContainer.appendChild(div);
  });
}

logoutBtn.addEventListener("click",()=>{
  localStorage.removeItem("loggedIn");
  window.location.href = "Login.html";

});

displayHistory();