# YouTube Reload Helper

A simple Chrome extension that automatically reloads YouTube watch pages once after they load.

## Why This Project Exists

This extension was created to solve a specific issue:

When using ad blockers in Chrome, YouTube videos may sometimes fail to load properly on the first attempt. In many cases, the video starts working only after manually refreshing the page.

This extension automates that process by reloading the YouTube video page once after it loads, so you do not have to refresh it manually every time.

It is especially useful if:

- You use ad blockers in Chrome
- YouTube videos occasionally open to a blank player or fail to start
- Reloading the page usually fixes the problem
- You want a lightweight automated workaround

## What It Does

The extension:

- Runs on YouTube watch pages
- Detects when a video page is opened
- Reloads the page once after a short delay
- Supports YouTube single-page navigation
- Reloads again when you move to another video
- Reloads again if you return to a previously visited video later

This means it works not only on a fresh page load, but also while navigating between videos inside YouTube.

## Features

- Automatic one-time reload for YouTube videos
- Works with YouTube SPA navigation
- Popup UI for configuration
- Enable/disable toggle
- Configurable reload delay
- Settings saved locally in Chrome

## Project Structure

```text
ReloadYoutubeExtension/
├── manifest.json
├── content.js
├── popup.html
└── popup.js
```

## How It Works

The extension uses a Chrome content script that runs on YouTube watch pages.

When a video page is opened:

- It checks whether the extension is enabled
- It reads the configured reload delay
- It determines whether the current video visit has already been reloaded
- If not, it reloads the page once
- It avoids entering an infinite reload loop

Because YouTube behaves like a single-page application, the script also watches for navigation changes so the reload logic still works when you move between videos without a full browser refresh.

## Setup Instructions

1. Create the project folder.

   Create a folder such as:

   ```text
   ~/Developer/ChromeExtensions/ReloadYoutubeExtension
   ```

2. Add the project files.

   Place these files inside the folder:

   - `manifest.json`
   - `content.js`
   - `popup.html`
   - `popup.js`

3. Open the Chrome extensions page.

   In Chrome, open:

   ```text
   chrome://extensions
   ```

4. Enable Developer mode.

   Turn on Developer mode using the toggle in the top-right corner.

5. Load the extension.

   Click **Load unpacked** and select your project folder:

   ```text
   ReloadYoutubeExtension
   ```

6. Start using it.

   Open any YouTube video page. The extension will reload the page once based on your configured settings.

## How to Use

- Click the extension icon in Chrome
- Open the popup
- Enable or disable the extension
- Set the reload delay in milliseconds
- Save your settings

Example:

- `1000` = reload after 1 second
- `2000` = reload after 2 seconds

## Example Use Case

You open a YouTube video while using an ad blocker.

Without this extension:

- The video may fail to load
- You manually press refresh
- The video then works

With this extension:

- The page opens
- The extension automatically reloads it once
- The video loads without requiring manual refresh

## Notes

- This extension is intended as a practical workaround for YouTube loading issues related to ad blocker usage.
- It is a lightweight personal utility project.
- It is loaded as an unpacked Chrome extension during development.
- If you change the source files, go to `chrome://extensions` and click **Reload** for the extension.

## Future Improvements

Possible future additions:

- Reload only on specific channels
- Reload only if the player fails to start
- Manual reload button in the popup
- Whitelist or blacklist support
- Retry count controls
- Better detection for player failure states
