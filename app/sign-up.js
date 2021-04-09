// a function to force that only number
// can be inserted into the phone number field
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

function confirmPassword(x, y) {
  if (x == y) {
    return true;
  } else {
    var errPassword = document.getElementById("password-error-message");
    errPassword.style.display = "initial";
  }
}

let sendBtn = document.getElementById("create-acc-btn");

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();

  try {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var cpassword = document.getElementById("confirm-password").value;
    var phonenumber = document.getElementById("input-phone-number").value;

    const timestamp = new Date(Date.now());

    if (validateEmail(email)) {
      if (confirmPassword(password, cpassword)) {
        var obj = {
          FirstName: firstname,
          LastName: lastname,
          Password: password,
          Email: email,
          PhoneNumber: phonenumber,
          DateCreated: timestamp.toUTCString(),
        };

        // Make JSON
        var objJSON = JSON.stringify(obj, null, 2);
        console.log(objJSON);
      }
    }
  } catch (err) {
    console.error(err);
  }
});
