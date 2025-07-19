// Code by Cameron Samuels

// Resize box
(function() {
  var ratio = [1, 5/4, 0.7];
  var i = 0;
  function updateBox() {
    var box = document.querySelector("#js-box");
    var w = box.offsetWidth;
    box.style.height = (w*ratio[i]) + "px";
  }
  window.addEventListener("resize", updateBox);
  document.querySelector("#js-ratiosize").addEventListener("click", function() {
    if (++i == ratio.length) i = 0;
    updateBox();
  });
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
      document.querySelector("#js-result").innerHTML = "<img width='100%' src='" + canvas.toDataURL() + "'>";
      document.body.appendChild(document.createElement("footer"));
    }
    else {
      document.querySelector("#js-downloadlink").href = canvas.toDataURL();
      document.querySelector("#js-downloadlink").style.display = "block";
      document.querySelector("#js-downloadlink").click();
    }
  });
  ga("send", "event", {
    "eventCategory": "gerry",
    "eventAction": "generateGraphic"
  });
});
