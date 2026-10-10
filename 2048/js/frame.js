(function () {
  var shell = document.querySelector(".container");
  var controls = document.querySelector(".controls");
  var scores = document.querySelector(".scores-container");
  function fit() {
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    var landscape = width > height;
    var sidebar = Math.min(240, Math.max(100, width * 0.22));
    shell.classList.toggle("landscape", landscape);
    controls.style.width = (landscape ? sidebar : width - 16) + "px";
    if (landscape) {
      sidebar = Math.max(sidebar, Math.ceil(Math.max(
        scores.children[0].getBoundingClientRect().width,
        scores.children[1].getBoundingClientRect().width)));
      controls.style.width = sidebar + "px";
    }
    var size = landscape ? Math.min(height - 24, width - sidebar - 40) :
      Math.min(width - 16, height - controls.offsetHeight - 32);
    shell.style.setProperty("--board-size", size + "px");
    shell.style.setProperty("--board-scale", size / 500);
  }
  new MutationObserver(fit).observe(scores, { childList: true, characterData: true, subtree: true });
  window.addEventListener("resize", fit);
  fit();
  document.fonts.ready.then(fit);
}());
