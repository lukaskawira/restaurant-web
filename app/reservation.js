let checkBox = document.querySelector(".toogle");
let reserveBtn = document.getElementById("reserve_button");
let tableNumber = null;

//Get reservation id if any
let currentReservationID = localStorage.setItem("currentReservationID", null);

//Get current customer reservation, if customer already have a
//reservation, the customer must cancel the current reservation
//and proceed with the new reservation
var current = localStorage.getItem("isLogin");
var data = "";
var holder = "";

/* Validator functions */
//numberonly function is called by the phonenumber element in from the inner html
function numberonly(event) {
  var num = event.which ? event.which : event.keyCode;
  if (num > 31 && (num < 48 || num > 57)) return false;
  return true;
}

//validateEmail will be called when parsing the user input into JSON object
function validateEmail(i) {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      // regex from https://www.w3resource.com/javascript/form/email-validation.php
      i
    )
  ) {
    return true;
  }
  return false;
}

//return_id function is called to return the table number when clicked by the user,
//this function is called within each grid element in the inner html
function return_id(id) {
  try {
    //This piece of code disabled the overlay that is blocking the reservation form input
    //which forced the user to select a table first before inputting reservation details
    var overlay = document.getElementById("rights_top");
    overlay.style.display = "none";

    document.getElementById("tablenumber_id").innerHTML = `Table ${id}`;
    tableNumber = id;
  } catch (err) {
    console.error(err);
  }
}

//setCalendar set the reservation details calendar with restriction that
//the user cannot select any past date from the date today
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

  today = yyyy + "-" + mm + "-" + dd; //today's format is YYYY-MM-DD
  document.getElementById("date_guest").setAttribute("min", today); //Set minimal date as today
}

//Check current logged in user
function checkLogin() {
  if (current != "") {
    //Initialize http connection
    var xh = new XMLHttpRequest();

    var url_query = "http://localhost:8080/v1/res/gcust/" + current;
    xh.open("POST", url_query, true);
    xh.setRequestHeader("Content-type", "application/json");
    xh.send();

    xh.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          if (this.reponse != "") {
            //This logic below is to get any reservationID that the customer have
            //when the customer already have a reservation and is still on HOLD
            holder = JSON.parse(this.response);
            if (holder.CustomerID == current) {
              window.location.href = "reservation-details.html";
            } else {
              console.error("Oops, something went wrong.");
            }
          }
        } else {
          console.log("Timeout");
        }
      }
    };
    getFormValue();
  } else {
    alert("Please log in first!");
    window.location.href = "index.html";
  }
}

//This function auto fill the first name, phone number, and email
//in the reservation details form
function getFormValue() {
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
          //Get data from server with reference to customer id (current variable) and get customer information
          document.querySelector("#name_guest").value = holder.Firstname;
          document.querySelector("#phone_guest").value = holder.Phonenumber;
          document.querySelector("#email_guest").value = holder.Email;
        } else {
          console.error("Oops, something went wrong. [GET CUSTOMER DATA]");
        }
      }
    }
  };
}

//This function inserts the reservation into the database
function InsertReservation() {
  try {
    let gname = document.getElementById("name_guest").value;
    let pax = document.getElementById("number_pax").value;
    let phone = document.getElementById("phone_guest").value;
    let email = document.getElementById("email_guest").value;
    let resDate = document.getElementById("date_guest").value;
    let resTime = document.getElementById("timepicker").value;

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

      //Initialize http connection
      var xh = new XMLHttpRequest();

      //Posting to local server
      var url_query = "http://localhost:8080/v1/res";

      xh.open("POST", url_query, true);
      xh.setRequestHeader("Content-type", "application/json");
      xh.send(data);

      xh.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Reservation is successful",
              text: "Thank you, we have received your reservation!",
              confirmButtonText: `NEXT`,
            }).then((result) => {
              window.location.href = "reservation-details.html";
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Something Wrong",
              text: "Unfortunately, your reservation cannot be processed",
              confirmButtonText: `OK`,
            });
          }
        }
      };
    } else {
      Swal.fire({
        icon: "warning",
        title: "Reservation not submitted",
        text: "Some of the information regarding the reservation is missing",
        confirmButtonText: `CHECK`,
      });
    }
  } catch (err) {
    console.error(err);
  }
}

checkLogin();

setCalendar();

checkBox.addEventListener("change", function (e) {
  if (this.checked) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

reserveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  InsertReservation();
});
