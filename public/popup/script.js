//
//      GeekHelper
//    Author: IBadTomas
//
// Actually, viem, že je to dosť trash code, ale funguje to.
//

const alzaDomains = ["https://alza.sk", "https://www.alza.sk", "https://www.alza.cz", "https://alza.cz"];

const queryParamsAlza = "?idp=8435&banner_id=34308";

const hasExistingParamsAlza = window.location.search.includes("idp=8435&banner_id=34308");

const isValidAlzaURL = (url) => {
  const validPatterns = [
    /^https?:\/\/(?:www\.)?alza\.(?:cz|sk)\/[a-zA-Z0-9-]+-d[0-9]+\.htm$/,
  ];
  return validPatterns.some((pattern) => pattern.test(url));
};


document.addEventListener('DOMContentLoaded', function () {
  const SettingsButton = document.getElementById('settings');
  const popupContainer = document.getElementById('popup-container');

  function getPopupEnabled(callback) {
    chrome.storage.sync.get('popupEnabled', function (data) {
      callback(!!data.popupEnabled);
    });
  }

  function setPopupEnabled(enabled, callback) {
    chrome.storage.sync.set({ popupEnabled: enabled }, callback);
  }

  function updateButtonText(enabled) {
    SettingsButton.textContent = enabled ? 'PopUp je zapnutý' : 'PopUp je vypnutý';
  }

  const isValidAlzaURL = (url) => {
    const validPatterns = [
      /^https?:\/\/(?:www\.)?alza\.(?:cz|sk)\/[a-zA-Z0-9-]+-d[0-9]+\.htm$/,
    ];
    return validPatterns.some((pattern) => pattern.test(url));
  };


  function redirectToNewPopupContainer() {
    popupContainer.innerHTML = '<div id="title">GeekHelper</div> <div id="description">Práve sa nachádzaš na Webovej stránke, pomocou ktorej môžeš podporiť GeekBoya. Chceš presmerovať?</div> <button id="redirect" class="redirect-button">Presmerovať</button>';
    const RedirectButton = document.getElementById('redirect');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentURL = tabs[0].url;
      var newURL;
  
      RedirectButton.addEventListener('click', function () {
        if (!hasExistingParamsAlza && isValidAlzaURL(currentURL)) {
          newURL = currentURL + queryParamsAlza;
        } 
        console.log(newURL)
        chrome.tabs.update({url: newURL})
        
      });
    });
  }

  getPopupEnabled(function (enabled) {
    updateButtonText(enabled);
  });

  SettingsButton.addEventListener('click', function () {
    getPopupEnabled(function (enabled) {
      const newStatus = !enabled;

      setPopupEnabled(newStatus, function () {
        updateButtonText(newStatus);
      });
    });
  });

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentURL = tabs[0].url;
    console.log(currentURL);
    if (
      isValidAlzaURL(currentURL)
    ) {
      console.log(true);
      redirectToNewPopupContainer();
    } else {
      console.log("false");
    }
  });

});

