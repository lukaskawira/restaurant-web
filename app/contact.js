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

let sendBtn = document.getElementById("submit_btn");

sendBtn.addEventListener("click", (e) => {
  try {
    var firstname = document.getElementById("first_name").value;
    var lastname = document.getElementById("last_name").value;
    var email = document.getElementById("input_email").value;
    var phonenumber = document.getElementById("contact_number_input").value;
    var msg = document.getElementById("message_box_input").value;

    if (validateEmail(email)) {
      var obj = {
        FirstName: firstname,
        LastName: lastname,
        Email: email,
        PhoneNumber: phonenumber,
        Message: msg,
      };

      // Make JSON
      var objJSON = JSON.stringify(obj, null, 2);
      console.log(objJSON);
    }
  } catch (err) {
    console.error(err);
  }
});
