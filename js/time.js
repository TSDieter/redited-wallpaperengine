function showLocale(objD) {
  var str, colorhead, colorfoot;
  var hh = objD.getHours();
  if (hh < 10) hh = "0" + hh;
  var mm = objD.getMinutes();
  if (mm < 10) mm = "0" + mm;
  var ss = objD.getSeconds();
  if (ss < 10) ss = "0" + ss;
  var ww = objD.getDay();
  colorhead = '<font style="color:' + getRGBAConfig("clock.color", 1) + ';">';
  if (ww == 0) ww = config.week.text.sunday;
  if (ww == 1) ww = config.week.text.monday;
  if (ww == 2) ww = config.week.text.tuesday;
  if (ww == 3) ww = config.week.text.wednesday;
  if (ww == 4) ww = config.week.text.thursday;
  if (ww == 5) ww = config.week.text.friday;
  if (ww == 6) ww = config.week.text.saturday;
  colorfoot = "</font>";
  str = colorhead;
  if (config.clock.enable) {
    str += "<span>";
    if (!config.clock.is24) {
      hh = hh > 12 ? hh - 12 : hh;
      str += hh > 12 ? "PM" : "AM";
      str += "</span><br>";
    }
    str += '<span class="thin">' + hh + ":" + mm + ":" + ss + "</span>";
  }
  if (config.week.enable) {
    str += "<br>" + ww;
  }

  str += colorfoot;
  return str;
}
tick();

function tick() {
  var today = new Date();
  document.getElementById("localtime").innerHTML = showLocale(today);
  window.setTimeout("tick()", 1000);
}
