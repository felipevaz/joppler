browser.browserAction.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  browser.tabs.executeScript(tab.id, { file: "turndown-gfm.js" })
    .then(() => browser.tabs.executeScript(tab.id, { file: "contentScript.js" }))
    .catch(() => {});
});

browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    browser.storage.sync.set({
      includeUrl: true,
      includeAuthor: true,
      includeDate: true,
      autoCopy: true,
      removeImages: false
    });
  }
});

browser.runtime.onMessage.addListener((message, sender) => {
  if (message.type !== "markdownResult" || !message.text) {
    return;
  }

  browser.storage.sync.get({ autoCopy: true }, (settings) => {
    const url = browser.runtime.getURL("output.html");
    const params = new URLSearchParams();
    params.append("viewType", "single");
    params.append("text1", message.text);
    params.append("autocopy", settings.autoCopy ? "1" : "0");

    const target = `${url}?${params.toString()}`;
    browser.tabs.create({
      url: target,
      index: sender.tab ? sender.tab.index + 1 : undefined
    });
  });
});
