(() => {
  const SETTINGS_KEY = "settings";
  const DEFAULT_SETTINGS = {
    enabled: true,
    delayMs: 1000,
  };

  let lastHandledUrl = null;

  async function getSettings() {
    const result = await chrome.storage.local.get(SETTINGS_KEY);
    return { ...DEFAULT_SETTINGS, ...(result[SETTINGS_KEY] || {}) };
  }

  function isWatchPage(urlString = window.location.href) {
    const url = new URL(urlString);
    return (
      url.hostname === "www.youtube.com" &&
      url.pathname === "/watch" &&
      !!url.searchParams.get("v")
    );
  }

  function getVisitKey(urlString = window.location.href) {
    // Full URL is enough for a visit key here.
    // Different navigations back to the same video will create a fresh page state,
    // so sessionStorage can be used safely per current document lifecycle.
    return `yt_reload_done_for_${urlString}`;
  }

  async function handleCurrentPage() {
    const currentUrl = window.location.href;

    if (!isWatchPage(currentUrl)) {
      return;
    }

    // Avoid running multiple times for the exact same currently-rendered URL
    if (lastHandledUrl === currentUrl) {
      return;
    }
    lastHandledUrl = currentUrl;

    const settings = await getSettings();
    if (!settings.enabled) {
      return;
    }

    const visitKey = getVisitKey(currentUrl);

    if (sessionStorage.getItem(visitKey) === "true") {
      return;
    }

    sessionStorage.setItem(visitKey, "true");

    setTimeout(
      () => {
        window.location.reload();
      },
      Number(settings.delayMs) || 1000,
    );
  }

  function onUrlMaybeChanged() {
    if (window.location.href !== lastHandledUrl) {
      handleCurrentPage();
    }
  }

  // Initial run
  handleCurrentPage();

  // Handle browser back/forward
  window.addEventListener("popstate", onUrlMaybeChanged);

  // Patch pushState / replaceState because YouTube is an SPA
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    const result = originalPushState.apply(this, args);
    setTimeout(onUrlMaybeChanged, 0);
    return result;
  };

  history.replaceState = function (...args) {
    const result = originalReplaceState.apply(this, args);
    setTimeout(onUrlMaybeChanged, 0);
    return result;
  };

  // Fallback observer because YouTube updates the page dynamically
  const observer = new MutationObserver(() => {
    onUrlMaybeChanged();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
