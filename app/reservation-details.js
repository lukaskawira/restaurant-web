let checkBox = document.querySelector(".toogle");

checkBox.addEventListener("change", function (e) {
  if (this.checked) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

let current = localStorage.getItem("isLogin");

var xh = new XMLHttpRequest();
let cr = "";

if (current != "guest") {
  //Posting to local server
  var url_query = "http://localhost:8080/v1/res/gcust/" + current;

  xh.open("GET", url_query, true);
  xh.setRequestHeader("Content-type", "application/json");
  xh.send();

  xh.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        temp = JSON.parse(this.response);
        document.querySelector(".current-user-holder").innerHTML =
          "Reservation for " + temp.Guestname;
        document.querySelector(".table-number-holder").innerHTML =
          "Your table is number " + temp.Tablenumber + ".";
        document.querySelector(".guest-name-holder").innerHTML =
          "Under " + temp.Guestname + "'s name.";
        document.querySelector(".number-of-people-holder").innerHTML =
          "Reserved for " + temp.Numberofpeople + " person.";
        document.querySelector(".phone-number-holder").innerHTML =
          "Contactable telephone number " + temp.Phonenumber + ".";
        document.querySelector(".reservation-date-holder").innerHTML =
          "Your reservation date is on " + temp.Reservationdate + ".";
        document.querySelector(".reservation-time-holder").innerHTML =
          "With the time at " + temp.Reservationtime + ".";
        cr = temp.ReservationID;
      }
    }
  };
}

let cancelBtn = document.querySelector(".cancel-reservation");

cancelBtn.addEventListener("click", (e) => {
  var url_query = "http://localhost:8080/v1/res/" + cr;

  xh.open("DELETE", url_query, true);
  xh.setRequestHeader("Content-type", "application/json");
  xh.send();

  xh.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        alert("Reservation has been canceled.");
        localStorage.removeItem("currentReservationID");
        window.location.href = "reservation.html";
      } else {
        alert(this.response);
      }
    }
  };
});
