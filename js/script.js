// Code by Cameron Samuels

// Resize box
(function() {
  function updateBox() {
    var box = document.querySelector("#js-box");
    var w = box.offsetWidth;
    box.style.height = w + "px";
  }
  window.addEventListener("resize", updateBox);
  updateBox();
})();

// Default text for box
document.querySelector("#js-large").addEventListener("focusout", function() {
  if (!document.querySelector("#js-large").textContent)
    document.querySelector("#js-large").textContent = "Register to Vote";
});
document.querySelector("#js-small").addEventListener("focusout", function() {
  if (!document.querySelector("#js-small").textContent)
    document.querySelector("#js-small").innerText = " ";
});

// Font color
function updateFontColor() {
  document.querySelector("#js-large").style.color = this.toRGBAString();
  document.querySelector("#js-small").style.color = this.toRGBAString();
}

// Text align
(function() {
  var flex = ["flex-start", "center", "flex-end"];
  var text = ["left", "center",  "right"];
  var align = 0;
  document.querySelector("#js-textalign").addEventListener("click", function() {
    if (align == flex.length) align = 0;
    document.querySelector("#js-box").style.justifyContent = flex[align];
    document.querySelector("#js-large").style.textAlign = text[align++];
  });
})();

// Font size
(function() {
  document.querySelector("#js-fontsize-container").addEventListener("click", function() {
    document.querySelector("#js-fontsize-container div").style.display = "block";
  });
  document.body.addEventListener("click", function(e) {
    var container = document.querySelector("#js-fontsize-container");
    if (e.target != container && e.target.parent != container && e.target != document.querySelector("#js-fontsize"))
      document.querySelector("#js-fontsize-container div").style.display = "";
  });
  document.querySelector("#js-fontsize").addEventListener("input", function() {
    document.querySelector("#js-large").style.fontSize = (document.querySelector("#js-fontsize").value / 5) + "em";
  });
})();

// Generate graphic & download
document.querySelector("#js-download").addEventListener("click", function() {
  var el = document.querySelector("#js-box");
  html2canvas(el, {
    y: el.offsetTop,
    backgroundColor: document.querySelector("#js-bgcolor").value
  }).then(function(canvas) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      document.body.innerHTML = "<img width='100%' src='" + canvas.toDataURL() + "'>";
      document.body.appendChild(document.createElement("footer"));
    }
    else {
      document.querySelector("#js-downloadlink").href = canvas.toDataURL();
      document.querySelector("#js-downloadlink").style.display = "block";
    }
  });
  ga("send", "event", {
    "eventCategory": "gerry",
    "eventAction": "generateGraphic"
  });
});
