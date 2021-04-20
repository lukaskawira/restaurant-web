/* Get current active user */
let login = localStorage.getItem("isLogin");
let loginBtn = document.getElementById("login-button");

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

function comingSoon() {
  var deliveryLink = document.querySelector("#delivery_link");
  deliveryLink.href = "./soon.html";
}

function logOut() {
  var u = login;

  try {
    //Posting to local server
    var xh = new XMLHttpRequest();
    var url_query = "http://localhost:8080/v1/cus/logout/" + u;

    xh.open("POST", url_query, true);
    xh.setRequestHeader("Content-type", "application/json");
    xh.send();

    xh.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          window.location.href = "sign-in.html";
          localStorage.clear();
        } else {
          alert(this.responseText);
        }
      }
    };
  } catch (err) {
    console.log(err);
  }
}

comingSoon();
