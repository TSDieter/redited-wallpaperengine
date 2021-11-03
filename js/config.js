var config = {
  background: {
    isStatic: true,
    staticImage: {
      value: "img/default.jpg",
      action: (v) => {
        console.log(2);
        v = v !== "" ? "file:///" + v : "img/default.jpg";
        document.getElementById("large-header").style.backgroundImage =
          "url('" + v + "')";
      },
    },
  },
  moveEffect: {
    enable: {
      value: true,
      action: (v) => {
        if (v) {
          ani.addListeners();
        } else {
          ani.removeListeners();
          ani.mouseLeave();
        }
      },
    },
    color: "1 1 1",
  },
  clock: {
    enable: true,
    is24: true,
    color: "1 1 1",
  },
  week: {
    enable: true,
    text: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  ani.init();
  window.wallpaperPropertyListener = {
    applyUserProperties: (props) => {
      console.log(props);
      setConfig("background.staticImage", "staticbackground", props);
      setConfig("moveEffect.enable", "moveeffect", props);
      setConfig("moveEffect.color", "moveeffectcolor", props);
      setConfig("clock.enable", "showclock", props);
      setConfig("clock.is24", "_24", props);
      setConfig("clock.color", "clockcolor", props);
      setConfig("week.enable", "showdayofweek", props);
      setConfig("week.text.monday", "monday", props);
      setConfig("week.text.tuesday", "tuesday", props);
      setConfig("week.text.wednesday", "wednesday", props);
      setConfig("week.text.thursday", "thursday", props);
      setConfig("week.text.friday", "friday", props);
      setConfig("week.text.saturday", "saturday", props);
      setConfig("week.text.sunday", "sunday", props);
    },
  };
});

function getConfig(path) {
  return deepFind(config, path);
}
function setConfig(path, key, props) {
  if (!props[key]) {
    return;
  }
  return deepFind(config, path, props[key].value);
}

function deepFind(obj, path, value) {
  var paths = path.split("."),
    current = obj,
    i;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
    if (i === paths.length - 2 && value !== undefined) {
      let pos = current[paths[i + 1]];
      if (pos["value"] !== undefined && pos["action"]) {
        pos.value = value;
        pos.action(value);
      } else {
        current[paths[i + 1]] = value;
      }
      return value;
    }
  }
  return current;
}

function getRGBAConfig(path, a) {
  path = getConfig(path) || "1 1 1";
  a = a || 0.3;
  const [r, g, b] = path.split(" ");
  return "rgba(" + r * 255 + "," + g * 255 + "," + b * 255 + "," + a + ")";
}
