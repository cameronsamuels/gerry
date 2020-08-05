document.querySelector("#js-download").addEventListener("click", function() {
  html2canvas(document.querySelector("#js-box")).then(function(canvas) {
    window.open(canvas.toDataURL("image/png"));
  });
});

document.querySelector("#js-large").addEventListener("focusout", function() {
  if (!document.querySelector("#js-large").textContent)
    document.querySelector("#js-large").textContent = "Vote";
});

document.querySelector("#js-small").addEventListener("focusout", function() {
  if (!document.querySelector("#js-small").textContent)
    document.querySelector("#js-small").innerText = "Made with GerryCreator";
});

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

(function() {
  function updateBox() {
    var box = document.querySelector("#js-box");
    var w = box.offsetWidth;
    box.style.height = w + "px";
  }
  window.addEventListener("resize", updateBox);
  updateBox();
})();

function updateFontColor() {
  document.querySelector("#js-large").style.color = this.toRGBAString();
  document.querySelector("#js-small").style.color = this.toRGBAString();
}
