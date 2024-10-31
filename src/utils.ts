export const alzaDomains = ["https://alza.sk", "https://www.alza.sk", "https://www.alza.cz", "https://alza.cz"];
export const queryParamsAlza = "?idp=8435&banner_id=34308";
export const hasExistingParamsAlza = window.location.search.includes(queryParamsAlza.slice(1));

export function isValidAlzaURL(url: string): boolean {
  const validPatterns = [/^https?:\/\/(?:www\.)?alza\.(?:cz|sk)\/[a-zA-Z0-9-]+-d[0-9]+\.htm$/];
  return validPatterns.some((pattern) => pattern.test(url));
}

export function getPopupEnabled(callback: (enabled: boolean) => void): void {
  chrome.storage.sync.get('popupEnabled', (data) => {
    callback(!!data.popupEnabled);
  });
}

export function setPopupEnabled(enabled: boolean, callback: () => void): void {
  chrome.storage.sync.set({ popupEnabled: enabled }, callback);
}
