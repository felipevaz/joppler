function extractTitle(markdown) {
  const firstLine = (markdown || "").split("\n", 1)[0].trim();
  const match = firstLine.match(/^#\s+(.+)$/);
  return match ? match[1].trim() : firstLine;
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const markdown = params.get("text1") || "";
  const autoCopy = params.get("autocopy") === "1" || params.get("autocopy") === "true";

  const container = document.getElementById("main-container");
  if (!container) return;

  const safeMarkdown = markdown
    ? markdown.replace(/[<>&"'`]/g, (ch) => ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&#39;",
        "`": "&#96;"
      }[ch] || ch))
    : "";

  container.innerHTML = `
    <section class="clip-shell">
      <h2 class="title">Ready to share</h2>
      <div class="actions">
        <button class="action-btn primary" id="shareBtn" type="button">Share to Joplin</button>
        <button class="action-btn secondary" id="copyBtn" type="button">Copy to clipboard</button>
      </div>
      <pre class="preview" id="preview">${safeMarkdown}</pre>
    </section>
  `;

  const shareBtn = document.getElementById("shareBtn");
  const copyBtn = document.getElementById("copyBtn");
  const preview = document.getElementById("preview");

  async function doCopy() {
    await copyText(preview.textContent);
    flashButtonState(copyBtn, "Copied");
  }

  async function doShare() {
    const text = preview.textContent.trim();
    const title = extractTitle(text);

    if (navigator.share) {
      await navigator.share({ title, text });
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
