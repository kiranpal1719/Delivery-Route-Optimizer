const logoutBtn = document.querySelector("#logoutBtn");
const historyContainer = document.querySelector("#history");
const deliveryLocation = document.querySelector("#deliveryLocation");
const addBtn = document.querySelector("#addBtn");
const locationList = document.querySelector("#locationList");
const generateBtn = document.querySelector("#generateBtn");
const routeResult = document.querySelector("#routeResult");
const distance = document.querySelector("#distance");
const time = document.querySelector("#time");
const warehouseInput = document.querySelector("#warehouse");

let locations = [];

// Predefined Coordinates

const coordinates = {
  "Noida Sector 62": { lat: 28.6289, lon: 77.3649 },
  "Sector 18 Noida": { lat: 28.5708, lon: 77.3272 },
  "Alpha 1": { lat: 28.4744, lon: 77.503 },
  "Pari Chowk": { lat: 28.4675, lon: 77.503 },
  "New Delhi": { lat: 28.6139, lon: 77.209 },
  "Connaught Place": { lat: 28.6315, lon: 77.2167 },
  "Greater Noida": { lat: 28.4744, lon: 77.504 },
};

// Get Coordinates

function getCoordinates(place) {
  if (coordinates[place]) {
    return coordinates[place];
  }

  alert(place + " not available.");
  return null;
}

// Haversine Formula

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;

  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Nearest Neighbor Algorithm

function nearestNeighbor(warehouse, locations) {
  let currentLocation = warehouse;

  let remaining = [...locations];

  let optimizedRoute = [];

  while (remaining.length > 0) {
    const currentCoord = getCoordinates(currentLocation);

    let nearestIndex = 0;

    let shortestDistance = Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const nextCoord = getCoordinates(remaining[i]);

      if (!nextCoord) continue;

      const d = calculateDistance(
        currentCoord.lat,
        currentCoord.lon,
        nextCoord.lat,
        nextCoord.lon,
      );

      if (d < shortestDistance) {
        shortestDistance = d;
        nearestIndex = i;
      }
    }

    optimizedRoute.push(remaining[nearestIndex]);

    currentLocation = remaining[nearestIndex];

    remaining.splice(nearestIndex, 1);
  }

  return optimizedRoute;
}

// Add Location

addBtn.addEventListener("click", () => {
  const location = deliveryLocation.value.trim();

  if (location === "") {
    alert("Please Enter Location");
    return;
  }

  locations.push(location);

  const li = document.createElement("li");

  li.textContent = location;

  locationList.appendChild(li);

  deliveryLocation.value = "";
});

// Generate Route

generateBtn.addEventListener("click", () => {
  if (locations.length === 0) {
    alert("Add Delivery Locations");
    return;
  }

  const warehouse = warehouseInput.value.trim();

  if (warehouse === "") {
    alert("Enter Warehouse Location");
    return;
  }

  const optimizedRoute = nearestNeighbor(warehouse, locations);

  let totalDistance = 0;

  let currentLocation = warehouse;

  for (let location of optimizedRoute) {
    const currentCoord = getCoordinates(currentLocation);

    const nextCoord = getCoordinates(location);

    if (!currentCoord || !nextCoord) continue;

    totalDistance += calculateDistance(
      currentCoord.lat,
      currentCoord.lon,
      nextCoord.lat,
      nextCoord.lon,
    );

    currentLocation = location;
  }

  const estimatedTime = Math.round(totalDistance * 2);

  routeResult.innerHTML =
    warehouse + "<br> ↓ <br>" + optimizedRoute.join("<br> ↓ <br>");

  distance.textContent = totalDistance.toFixed(2) + " km";

  time.textContent = estimatedTime + " min";

  const routeData = {
    route: warehouse + " → " + optimizedRoute.join(" → "),
    distance: totalDistance.toFixed(2) + " km",
    time: estimatedTime + " min",
  };

  let routeHistory = JSON.parse(localStorage.getItem("history")) || [];

  routeHistory.push(routeData);

  localStorage.setItem("history", JSON.stringify(routeHistory));

  displayHistory();
});

// Display History

function displayHistory() {
  historyContainer.innerHTML = "";

  let routeHistory = JSON.parse(localStorage.getItem("history")) || [];

  routeHistory.forEach((item) => {
    const div = document.createElement("div");

    div.classList.add("history-item");

    div.innerHTML = `
            <p><strong>Route:</strong> ${item.route}</p>
            <p>Distance: ${item.distance}</p>
            <p>Time: ${item.time}</p>
        `;

    historyContainer.appendChild(div);
  });
}

// Logout

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");

  window.location.href = "Login.html";
});

displayHistory();
