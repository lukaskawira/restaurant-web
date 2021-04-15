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

var data = "";

//Initialize http connection
var xh = new XMLHttpRequest();

reserveBtn.addEventListener("click", (e) => {
  e.preventDefault();

  try {
    let gname = document.getElementById("name_guest").value;
    let pax = document.getElementById("number_pax").value;
    let phone = document.getElementById("phone_guest").value;
    let email = document.getElementById("email_guest").value;
    let resDate = document.getElementById("date_guest").value;
    let resTime = document.getElementById("time_guest").value;

    let cusid = login;

    if (
      gname != "" &&
      pax != "" &&
      phone != "" &&
      email != "" &&
      resDate != "" &&
      resTime != ""
    ) {
      var obj = {
        CustomerID: cusid,
        GuestName: gname,
        NumberOfPeople: pax,
        PhoneNumber: phone,
        Email: email,
        ReservationDate: resDate,
        ReservationTime: resTime,
        TableNumber: tableNumber,
      };

      // Make JSON
      data = JSON.stringify(obj, null, 2);
      console.log(data);

      //Posting to local server
      var url_query = "http://localhost:8080/v1/res";

      xh.open("POST", url_query, true);
      xh.setRequestHeader("Content-type", "application/json");
      xh.send(data);

      xh.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            alert("Reservation Successfully Added!");
            window.location.href = "reservation-details.html";
          } else {
            alert(this.responseText);
          }
        }
      };
    }
  } catch (err) {
    console.error(err);
  }
});

//Get current customer reservation, if customer already have a
//reservation, the customer must cancel the current reservation
//and proceed with the new reservation
var current = localStorage.getItem("isLogin");

//Get reservation id if any
let currentReservationID = localStorage.setItem("currentReservationID", null);
let temp = "";

if (current != "") {
  var url_query = "http://localhost:8080/v1/res/gcust/" + current;
  xh.open("GET", url_query, true);
  xh.setRequestHeader("Content-type", "application/json");
  xh.send();

  xh.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        temp = JSON.parse(this.response);
        if (temp.CustomerID == current) {
          console.log(temp);
          window.location.href = "reservation-details.html";
        } else {
          console.log("Data Mismatch");
        }
      }
    }
  };
} else {
  alert("Please log in first!");
  window.location.href = "index.html";
}
