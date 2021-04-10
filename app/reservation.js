let checkBox = document.querySelector(".toogle");

checkBox.addEventListener("change", function (e) {
  if (this.checked) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

function numberonly(event) {
  var num = event.which ? event.which : event.keyCode;
  if (num > 31 && (num < 48 || num > 57)) return false;
  return true;
}
w;
function validateEmail(i) {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      // regex from https://www.w3resource.com/javascript/form/email-validation.php
      i
    )
  ) {
    //errEmail.style.display = "none";
    return true;
  }

  //errEmail.style.display = "initial";
  return false;
}

let tableNumber = null;

function return_id(id) {
  try {
    var overlay = document.getElementById("rights_top");
    overlay.style.display = "none";

    document.getElementById("tablenumber_id").innerHTML = `Table ${id}`;

    tableNumber = id;
  } catch (err) {
    console.error(err);
  }
}

let reserveBtn = document.getElementById("reserve_button");

function setCalendar() {
  var today = new Date();

  let yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  document.getElementById("date_guest").setAttribute("min", today);
}

setCalendar();

reserveBtn.addEventListener("click", (e) => {
  try {
    let gname = document.getElementById("name_guest").value;
    let pax = document.getElementById("number_pax").value;
    let phone = document.getElementById("phone_guest").value;
    let email = document.getElementById("email_guest").value;
    let resDate = document.getElementById("date_guest").value;
    let resTime = document.getElementById("time_guest").value;

    if (
      gname != "" &&
      pax != "" &&
      phone != "" &&
      email != "" &&
      resDate != "" &&
      resTime != ""
    ) {
      var obj = {
        GuestName: gname,
        NumberOfPeople: pax,
        PhoneNumber: phone,
        Email: email,
        ReservationDate: resDate,
        ReservationTime: resTime,
        TableNumber: tableNumber,
      };

      // Make JSON
      var objJSON = JSON.stringify(obj, null, 2);
      console.log(objJSON);
    }
  } catch (err) {
    console.error(err);
  }
});
