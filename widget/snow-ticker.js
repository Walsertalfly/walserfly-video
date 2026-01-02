(function () {
  const container = document.createElement("div");

  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.padding = "12px 16px";
  container.style.background = "#1e3a8a";
  container.style.color = "white";
  container.style.fontFamily = "system-ui, sans-serif";
  container.style.borderRadius = "10px";
  container.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
  container.style.zIndex = "999999";

  container.innerHTML = "❄️ Snow Ticker – Widget läuft";

  document.body.appendChild(container);
})();
