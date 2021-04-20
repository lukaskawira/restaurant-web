//Load selection option
let opt1 = document.getElementById("restime1");
let opt2 = document.getElementById("restime2");
let opt3 = document.getElementById("restime3");
let opt4 = document.getElementById("restime4");
let opt5 = document.getElementById("restime5");
let opt6 = document.getElementById("restime6");
let opt7 = document.getElementById("restime7");
let opt8 = document.getElementById("restime8");
let opt9 = document.getElementById("restime9");
let opt10 = document.getElementById("restime10");
let opt11 = document.getElementById("restime11");
let opt12 = document.getElementById("restime12");

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
      console.log(timearr[i] == document.querySelector("#restime1").value);
    } else if (timearr[i] == opt2.value) {
      console.log(timearr[i] == document.querySelector("#restime2").value);
    } else if (timearr[i] == opt3.value) {
      console.log(timearr[i] == document.querySelector("#restime3").value);
    } else if (timearr[i] == opt4.value) {
      console.log(timearr[i] == document.querySelector("#restime4").value);
    } else if (timearr[i] == opt5.value) {
      console.log(timearr[i] == document.querySelector("#restime5").value);
    } else if (timearr[i] == opt6.value) {
      console.log(timearr[i] == document.querySelector("#restime6").value);
    } else if (timearr[i] == opt7.value) {
      console.log(opt7.value + " HAS BEEN BOOKED.");
      opt7.style.color = "grey";
      opt7.disabled = true;
    } else if (timearr[i] == opt8.value) {
      console.log(opt8.value + " HAS BEEN BOOKED.");
      opt8.style.color = "grey";
      opt8.disabled = true;
    } else if (timearr[i] == opt9.value) {
      console.log(opt9.value + " HAS BEEN BOOKED.");
      opt9.style.color = "grey";
      opt9.disabled = true;
    } else if (timearr[i] == opt10.value) {
      console.log(opt10.value + " HAS BEEN BOOKED.");
      opt10.style.color = "grey";
      opt10.disabled = true;
    } else if (timearr[i] == opt11.value) {
      console.log(opt11.value + " HAS BEEN BOOKED.");
      opt11.style.color = "grey";
      opt11.disabled = true;
    } else if (timearr[i] == opt12.value) {
      console.log(opt12.value + " HAS BEEN BOOKED.");
      opt12.style.color = "grey";
      opt12.disabled = true;
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
  if (opt5.disabled) {
    opt5.style.color = "black";
    opt5.disabled = false;
  }
  if (opt6.disabled) {
    opt6.style.color = "black";
    opt6.disabled = false;
  }
  if (opt7.disabled) {
    opt7.style.color = "black";
    opt7.disabled = false;
  }
  if (opt8.disabled) {
    opt8.style.color = "black";
    opt8.disabled = false;
  }
  if (opt9.disabled) {
    opt9.style.color = "black";
    opt9.disabled = false;
  }
  if (opt10.disabled) {
    opt10.style.color = "black";
    opt10.disabled = false;
  }
  if (opt11.disabled) {
    opt11.style.color = "black";
    opt11.disabled = false;
  }
  if (opt12.disabled) {
    opt12.style.color = "black";
    opt12.disabled = false;
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
