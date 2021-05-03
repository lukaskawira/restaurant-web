let checkBox = document.querySelector(".toogle");
let cancelBtn = document.querySelector(".cancel-reservation");
let current = localStorage.getItem("isLogin");
var xh = new XMLHttpRequest();
let tempID = "";

//If current user is not guest, get all user credential based on
//current variable which is a temporary storage for current
//user active
if (current != "guest") {
  //Create new connection url
  var url_query = "http://localhost:8080/v1/res/gcust/" + current;

  //Open connection to database server
  xh.open("POST", url_query, true);
  xh.setRequestHeader("Content-type", "application/json");
  xh.send();

  //If connected
  xh.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        temp = JSON.parse(this.response);

        //Fill the reservation details form
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

        //Store reservation id on tempID variable
        tempID = temp.ReservationID;
      } else {
        console.log(this.response);
      }
    }
  };
}

function cancelReservation() {
  var url_query = "http://localhost:8080/v1/res/" + tempID;

  xh.open("POST", url_query, true);
  xh.setRequestHeader("Content-type", "application/json");
  xh.send();

  xh.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        Swal.fire({
          title: "Canceled!",
          text: "Your reservation has been canceled.",
          icon: "success",
        });
        localStorage.removeItem("currentReservationID");
        window.location.href = "reservation.html";
      } else {
        alert(this.response);
      }
    }
  };
}

cancelBtn.addEventListener("click", (e) => {
  Swal.fire({
    title: "Cancel your reservation?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ff6961",
    cancelButtonColor: "#946e59",
    confirmButtonText: "Cancel My Reservation",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      cancelReservation();
    }
  });
});

checkBox.addEventListener("change", function (e) {
  if (this.checked) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});
