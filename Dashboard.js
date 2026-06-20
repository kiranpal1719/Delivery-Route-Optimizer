const logoutBtn = document.querySelector("#logoutBtn");
const deliveryLocation = document.querySelector("#deliveryLocation");
const addBtn = document.querySelector("#addBtn");
const locationList = querySelector("#locationList");

let locations = [];
addBtn.addEventListener("click",()=>{
  const location=deliveryLocation.value.trim();
  if(location === ""){
    alert("please Enter the Location");
    return;
  }
  locations.push(location);
  
});

logoutBtn.addEventListener("click",()=>{
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";

});