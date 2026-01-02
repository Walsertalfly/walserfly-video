(function () {
  const script = document.currentScript;

  const container = document.createElement("div");
  container.style.padding = "10px";
  container.style.background = "#1e3a8a";
  container.style.color = "white";
  container.style.fontFamily = "system-ui, sans-serif";
  container.style.borderRadius = "8px";

  container.innerHTML = "❄️ Snow Ticker – Widget läuft";

  script.parentNode.insertBefore(container, script.nextSibling);
})();
