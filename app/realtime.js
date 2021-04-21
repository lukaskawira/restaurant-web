//Load selection option
let opt1 = document.getElementById("restime1");
let opt2 = document.getElementById("restime2");
let opt3 = document.getElementById("restime3");
let opt4 = document.getElementById("restime4");

//Create an array to store reservation value that was passed by server
var timearr = [];
var container = "";

var rt = document.querySelector("#date_guest");
var tn = document.querySelector(".grid-container");

function createandpost() {
  //Reset edited options
  normalizereservation();

  //Initiate connection request to backend and get the current reservation with
  //parameter reservation date, table number. This is triggered when date is selected
  //as when the date are changed. Reservation date is stored as rt_time and
  //variable table number is stored when a table is clicked on the GUI, with the name
  //rt_tnum.
  var xh = new XMLHttpRequest();
  var rt_time = rt.value; // in 2021-04-20 (YYYY-MM-DD) format
  var rt_tnum = tableNumber; // store the current tableNumber
  var url = "http://localhost:8080/v1/res/realt/";
  timearr = []; // clear container in every request

  //try to create a json object to be sent to backend with following url
  if (rt_time != "" && rt_tnum != "") {
    var object = {
      Reservationdate: rt_time,
      Tablenumber: rt_tnum,
    };

    var JSONdata = JSON.stringify(object);
    console.log(JSONdata);
    xh.open("POST", url, true);
    xh.setRequestHeader("Content-type", "application/json");
    xh.send(JSONdata);

    xh.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          container = JSON.parse(this.response);
          for (i in container) {
            timearr.push(container[i].Reservationtime);
          }
          updatereservationtime();
        } else {
          //console.error("Oops, something went wrong.");
          console.log(this.response);
        }
      }
    };
  }
}

function updatereservationtime() {
  //Update booked time based on JSON responsed by the server
  for (i in timearr) {
    if (timearr[i] == opt1.value) {
      console.log(opt1.value + " HAS BEEN BOOKED.");
      opt1.style.color = "grey";
      opt1.disabled = true;
    } else if (timearr[i] == opt2.value) {
      console.log(opt2.value + " HAS BEEN BOOKED.");
      opt2.style.color = "grey";
      opt2.disabled = true;
    } else if (timearr[i] == opt3.value) {
      console.log(opt3.value + " HAS BEEN BOOKED.");
      opt3.style.color = "grey";
      opt3.disabled = true;
    } else if (timearr[i] == opt4.value) {
      console.log(opt4.value + " HAS BEEN BOOKED.");
      opt4.style.color = "grey";
      opt4.disabled = true;
    }
  }
}

function normalizereservation() {
  if (opt1.disabled) {
    opt1.style.color = "black";
    opt1.disabled = false;
  }
  if (opt2.disabled) {
    opt2.style.color = "black";
    opt2.disabled = false;
  }
  if (opt3.disabled) {
    opt3.style.color = "black";
    opt3.disabled = false;
  }
  if (opt4.disabled) {
    opt4.style.color = "black";
    opt4.disabled = false;
  }
}

rt.addEventListener("change", (e) => {
  try {
    createandpost();
  } catch (err) {
    console.error(err);
  }
});

tn.addEventListener("click", (e) => {
  try {
    createandpost();
  } catch (err) {
    console.error(err);
  }
});
