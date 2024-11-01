import {
  queryParamsAlza,
  isValidAlzaURL,
  hasExistingParamsAlza,
  alzaDomains,
} from "./utils";

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.sync.set({ popupEnabled: false });
  }
});

const obrazok = "https://i.imgur.com/yK7ZWhn.png";

chrome.storage.sync.get("popupEnabled", function (data) {
  const currentURL = window.location.href;
  if (isValidAlzaURL(currentURL)) {
    if (data.popupEnabled !== false) {
      const codeToAdd = `
          <div id="alertBox1" style="display: none; position: fixed; top: 50px; right: 10px; color: white; z-index: 9999;">
              <div style="display: flex; align-items: center; justify-content: space-between; background-color: rgb(228, 228, 228); padding: 10px; border-radius: 5px 5px 0 0;">
              <img src="${obrazok}" style="width: 30px; height: 30px;>    
              <p style="color: #3498db">GeekHelper</p>
                  <span id="closeButton" style="font-size: 16px; font-weight: bold; cursor: pointer; color: #3498db;">X</span>
              </div>
              <div style="background-color: white; padding: 20px; border: 1px solid #000; border-top: none; border-radius: 0 0 5px 5px;">
                  <p style="color: #3498db">Tento odkaz podporuje nakúpovanie cez GeekBoya!</p>
                  <button id="redirectButton" style="background-color: #3498db; color: white; border: 2px solid white; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">Presmerovať</button>
              </div>
          </div>
      `;
      var template = document.createElement("template");
      template.innerHTML = codeToAdd;
      var body = document.querySelector("body");
      if (!body) return;
      body.appendChild(template.content.cloneNode(true));
      var alertBox = document.getElementById("alertBox1");
      if (!alertBox) return;
      alertBox.style.display = "block";
      var closeButton = document.getElementById("closeButton");
      if (!closeButton) return;
      closeButton.addEventListener("click", function () {
        if (!alertBox) return;
        alertBox.style.display = "none";
      });
      var redirectButton = document.getElementById("redirectButton");
      if (!redirectButton) return;
      redirectButton.addEventListener("click", function () {
        if (alzaDomains.some((url) => window.location.href.includes(url))) {
          if (!hasExistingParamsAlza && isValidAlzaURL(window.location.href)) {
            const newUrl = window.location.search
              ? window.location.href + "&" + queryParamsAlza.slice(1)
              : window.location.href + queryParamsAlza;
            window.location.href = newUrl;
          }
        }
      });
    }
  }
});
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    chrome.storage.sync.set({ popupEnabled: false });
  }
});
