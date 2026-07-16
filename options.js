const browserApi = typeof chrome !== "undefined" ? chrome : window.browser;

function saveSettings() {
  const settings = {
    includeUrl: document.getElementById("include-url").checked,
    includeAuthor: document.getElementById("include-author").checked,
    includeDate: document.getElementById("include-date").checked,
    autoCopy: document.getElementById("auto-copy").checked,
    removeImages: document.getElementById("remove-images").checked
  };

  browserApi.storage.sync.set(settings, () => {
    const status = document.getElementById("status");
    status.classList.add("visible");
    window.clearTimeout(status._hideTimer);
    status._hideTimer = window.setTimeout(() => {
      status.classList.remove("visible");
    }, 1200);
  });
}

function bindSave(id) {
  const input = document.getElementById(id);
  input.addEventListener("change", saveSettings);
}

document.addEventListener("DOMContentLoaded", () => {
  browserApi.storage.sync.get(
    {
      includeUrl: true,
      includeAuthor: true,
      includeDate: true,
      autoCopy: true,
      removeImages: false
    },
    (settings) => {
      document.getElementById("include-url").checked = settings.includeUrl;
      document.getElementById("include-author").checked = settings.includeAuthor;
      document.getElementById("include-date").checked = settings.includeDate;
      document.getElementById("auto-copy").checked = settings.autoCopy;
      document.getElementById("remove-images").checked = settings.removeImages;
    }
  );

  ["include-url", "include-author", "include-date", "auto-copy", "remove-images"].forEach(bindSave);
});
