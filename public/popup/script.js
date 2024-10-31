import { alzaDomains, queryParamsAlza, isValidAlzaURL, hasExistingParamsAlza, getPopupEnabled, setPopupEnabled } from './utils';

document.addEventListener('DOMContentLoaded', () => {
  const SettingsButton = document.getElementById('settings');
  const popupContainer = document.getElementById('popup-container');

  function updateButtonText(enabled) {
    SettingsButton.textContent = enabled ? 'PopUp je zapnutý' : 'PopUp je vypnutý';
  }

  function redirectToNewPopupContainer() {
    popupContainer.innerHTML = `
      <div id="title">GeekHelper</div>
      <div id="description">Práve sa nachádzaš na Webovej stránke, pomocou ktorej môžeš podporiť GeekBoya. Chceš presmerovať?</div>
      <button id="redirect" class="redirect-button">Presmerovať</button>`;

    const RedirectButton = document.getElementById('redirect');

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentURL = tabs[0].url;
      if (!currentURL) return;

      RedirectButton.addEventListener('click', () => {
        if (!hasExistingParamsAlza && isValidAlzaURL(currentURL)) {
          const newURL = currentURL.includes('?') 
            ? `${currentURL}&${queryParamsAlza.slice(1)}`
            : `${currentURL}${queryParamsAlza}`;
          chrome.tabs.update({ url: newURL });
        }
      });
    });
  }

  getPopupEnabled((enabled) => {
    updateButtonText(enabled);
  });

  SettingsButton.addEventListener('click', () => {
    getPopupEnabled((enabled) => {
      const newStatus = !enabled;
      setPopupEnabled(newStatus, () => {
        updateButtonText(newStatus);
      });
    });
  });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentURL = tabs[0].url;
    if (currentURL && isValidAlzaURL(currentURL)) {
      redirectToNewPopupContainer();
    }
  });
});
