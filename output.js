function extractTitle(markdown) {
  const firstLine = (markdown || "").split("\n", 1)[0].trim();
  const match = firstLine.match(/^#\s+(.+)$/);
  return match ? match[1].trim() : firstLine;
}

function createButton(className, id, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.id = id;
  button.textContent = label;
  return button;
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const markdown = params.get("text1") || "";
  const autoCopy = params.get("autocopy") === "1" || params.get("autocopy") === "true";

  const container = document.getElementById("main-container");
  if (!container) return;

  const shell = document.createElement("section");
  shell.className = "clip-shell";

  const title = document.createElement("h2");
  title.className = "title";
  title.textContent = "Ready to share";
  shell.appendChild(title);

  const actions = document.createElement("div");
  actions.className = "actions";

  const shareBtn = createButton("action-btn primary", "shareBtn", "Share to Joplin");
  const copyBtn = createButton("action-btn secondary", "copyBtn", "Copy to clipboard");
  actions.appendChild(shareBtn);
  actions.appendChild(copyBtn);
  shell.appendChild(actions);

  const preview = document.createElement("pre");
  preview.className = "preview";
  preview.id = "preview";
  preview.textContent = markdown;
  shell.appendChild(preview);

  container.replaceChildren(shell);

  async function doCopy() {
    await copyText(preview.textContent);
    flashButtonState(copyBtn, "Copied");
  }

  async function doShare() {
    const text = preview.textContent.trim();
    const titleText = extractTitle(text);

    if (navigator.share) {
      await navigator.share({ title: titleText, text });
      flashButtonState(shareBtn, "Shared");
      return;
    }

    await doCopy();
  }

  shareBtn.addEventListener("click", async () => {
    try {
      await doShare();
    } catch (error) {
      try {
        await doCopy();
      } catch (copyError) {
        alert("Sharing is not available and copying failed.");
      }
    }
  });

  copyBtn.addEventListener("click", async () => {
    try {
      await doCopy();
    } catch (error) {
      alert("Failed to copy to clipboard.");
    }
  });

  if (autoCopy) {
    doCopy().catch(() => {});
  }
});
