const signupForm = document.querySelector("#signupForm");
signupForm.addEventListener("submit",(e)=>{
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const user = {
    name,
    email,
    password
  };

  localStorage.setItem("user", JSON.stringify(user));
  alert("You have create your Account Successfully");
  window.location.href = "Login.html";


});