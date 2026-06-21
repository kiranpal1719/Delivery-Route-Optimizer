const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit",(e)=>{
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const user = JSON.parse(localStorage.getItem("user"));


  if(user && email === user.email && password === user.password){
  
    localStorage.setItem("loggedIn", "true");
    alert("Login Successfull");
    window.location.href = "Dashboard.html";
  } else{
    alert("Invalid Email or Password");
  }
});