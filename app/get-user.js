/* Get current active user */

let login = localStorage.getItem("isLogin");
let loginBtn = document.getElementById("login-button");

function getActiveUser(login) {
  loginBtn.innerHTML = login;
  loginBtn.style.backgroundColor = "rgb(148, 110, 89, 0)";
  loginBtn.style.cursor = "pointer";

  loginBtn.addEventListener("mouseenter", (e) => {
    loginBtn.innerHTML = "Log out?";
    loginBtn.style.backgroundColor = "rgb(148, 110, 89, 1)";
  });

  loginBtn.addEventListener("mouseleave", (e) => {
    loginBtn.innerHTML = login;
    loginBtn.style.backgroundColor = "rgb(148, 110, 89, 0)";
  });
}

function logOut() {
  localStorage.clear();
}

if (login != null) {
  //Change the links inner target
  var reservationLink = document.getElementById("reservation_link");
  reservationLink.href = "./reservation.html";

  //get current active user
  getActiveUser(login);

  loginBtn.addEventListener("click", (e) => {
    logOut();
  });
}
