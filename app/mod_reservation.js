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

if (current != "guest") {
  //Posting to local server
  var url_query = "http://localhost:8080/v1/res";

  xh.open("GET", url_query, true);
  xh.setRequestHeader("Content-type", "application/json");
  xh.send();

  xh.onreadystatechange = function () {};
}
