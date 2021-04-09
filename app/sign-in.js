var guest = document.getElementById("guest_login");
guest.onclick = guestLogin;

function guestLogin() {
  document.getElementById("guest_login").href = "./index.html";
  localStorage.setItem("isLogin", "guest");
}
