var guest = document.getElementById("guest_login");
guest.onclick = guestLogin;

function guestLogin() {
  document.getElementById("guest_login").href = "./index.html";
  localStorage.setItem("isLogin", "guest");
}

function validateEmail(mail) {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      // regex from https://www.w3resource.com/javascript/form/email-validation.php
      mail
    )
  ) {
    return true;
  }
  var errEmail = document.getElementById("email-error-message");
  errEmail.style.display = "initial";
  return false;
}

var loginBtn = document.querySelector(".sign-in-btn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  try {
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;

    if (validateEmail(email)) {
      var obj = {
        CustomerID: email,
        Password: password,
      };

      //Make JSON data
      var data = JSON.stringify(obj, null, 2);
      console.log(data);

      //Posting to local server
      var xh = new XMLHttpRequest();
      var url_query = "http://localhost:8080/v1/cus/login";

      xh.open("POST", url_query, true);
      xh.setRequestHeader("Content-type", "application/json");
      xh.send(data);

      xh.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            window.location.href = "index.html";
            localStorage.setItem("isLogin", email);
            alert("Login Successful!");
          } else {
            if (this.responseTest != "") {
              alert("Invalid password/email");
            } else {
              alert(this.responseText);
            }
          }
        }
      };
    }
  } catch (err) {
    console.error(err);
  }
});
