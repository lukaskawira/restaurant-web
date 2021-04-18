var rt = document.querySelector("#date_guest");
var tn = document.querySelector(".grid-container");
var container = "";

tn.addEventListener("click", (e) => {
  //console.log(tableNumber);
});

rt.addEventListener("change", (e) => {
  //Initiate connection request to backend and get the current reservation with
  //parameter reservation date, table number. This is triggered when date is selected
  //as when the date are changed. Reservation date is stored as rt_time and
  //variable table number is stored when a table is clicked on the GUI, with the name
  //rt_tnum.
  var xh = new XMLHttpRequest();
  var rt_time = rt.value; // in 2021-04-20 (YYYY-MM-DD) format
  var rt_tnum = tableNumber; // store the current tableNumber
  var url = "http://localhost:8080/v1/res/realt/";

  try {
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
              console.log(container[i].Reservationtime);
              i++;
            }
          } else {
            //console.error("Oops, something went wrong.");
            console.log(this.response);
          }
        }
      };
    }
  } catch (err) {
    console.error(err);
  }
  //console.log(rt.value);
});
