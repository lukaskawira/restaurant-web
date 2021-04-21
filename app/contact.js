let current = localStorage.getItem("isLogin");
let sendBtn = document.getElementById("submit_btn");

function numberonly(event) {
  var num = event.which ? event.which : event.keyCode;
  if (num > 31 && (num < 48 || num > 57)) return false;
  return true;
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

function checklogin() {
  if (current != "") {
    var xh = new XMLHttpRequest();
    var url_query = "http://localhost:8080/v1/cus/" + current;

    xh.open("GET", url_query, true);
    xh.setRequestHeader("Content-type", "application/json");
    xh.send();

    xh.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          var holder = JSON.parse(this.response);
          if (holder != "") {
            //Assign customer data to contact form
            document.querySelector("#first_name").value = holder.Firstname;
            document.querySelector("#last_name").value = holder.Lastname;
            document.querySelector("#input_email").value = holder.Email;
            document.querySelector("#contact_number_input").value =
              holder.Phonenumber;
          } else {
            console.error("Oops, something went wrong. [GET CUSTOMER DATA]");
          }
        }
      }
    };
  }
}

checklogin();

sendBtn.addEventListener("click", (e) => {
  try {
    var firstname = document.getElementById("first_name").value;
    var lastname = document.getElementById("last_name").value;
    var email = document.getElementById("input_email").value;
    var phonenumber = document.getElementById("contact_number_input").value;
    var msg = document.getElementById("message_box_input").value;

    if (
      firstname != "" &&
      lastname != "" &&
      email != "" &&
      phonenumber != "" &&
      msg != ""
    ) {
      if (validateEmail(email)) {
        var obj = {
          Firstname: firstname,
          Lastname: lastname,
          Email: email,
          Phonenumber: phonenumber,
          Message: msg,
        };

        // Make JSON
        var data = JSON.stringify(obj, null, 2);
        var xh = new XMLHttpRequest();
        var url_query = "http://localhost:8080/v1/con/";

        xh.open("POST", url_query, true);
        xh.setRequestHeader("Content-type", "application/json");
        xh.send(data);

        xh.onreadystatechange = function () {
          if (this.readyState === 4) {
            if (this.status === 200) {
              //Success alert
              Swal.fire({
                icon: "success",
                title: "Thank you!",
                text: "Your response has been recorded",
              }).then((e) => {
                location.reload();
              });
            } else {
              //Error alert
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: this.response,
                showConfirmButton: false,
              }).then((e) => {
                location.reload();
              });
            }
          }
        };
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Some important details are missing...",
        showConfirmButton: false,
      });
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: err,
      showConfirmButton: false,
    });
  }
});
