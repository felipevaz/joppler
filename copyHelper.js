async function copyText(text) {
  const value = (text || "").trim();
  if (!value) {
    throw new Error("No content to copy.");
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (error) {
      // Try the fallback path below.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);
  if (!copied) {
    throw new Error("Failed to copy to clipboard.");
  }

  return true;
}

function flashButtonState(button, text, ms = 1600) {
  const originalText = button.textContent;
  button.textContent = text;
  button.setAttribute("aria-live", "polite");
  window.setTimeout(() => {
    button.textContent = originalText;
    button.removeAttribute("aria-live");
  }, ms);
}
