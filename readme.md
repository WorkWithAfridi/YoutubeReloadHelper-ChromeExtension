YouTube Reload Helper

A simple Chrome extension that automatically reloads YouTube watch pages once after they load.

Why this project exists

This extension was created to solve a specific issue:

When using ad blockers in Chrome, YouTube videos may sometimes fail to load properly on the first attempt. In many cases, the video starts working only after manually refreshing the page.

This extension automates that process by reloading the YouTube video page once after it loads, so you do not have to refresh it manually every time.

It is especially useful if:

you use ad blockers in Chrome
YouTube videos occasionally open to a blank player or fail to start
reloading the page usually fixes the problem
you want a lightweight automated workaround
What it does

The extension:

runs on YouTube watch pages
detects when a video page is opened
reloads the page once after a short delay
supports YouTube single-page navigation
reloads again when you move to another video
reloads again if you return to a previously visited video later

This means it works not only on a fresh page load, but also while navigating between videos inside YouTube.

Features
automatic one-time reload for YouTube videos
works with YouTube SPA navigation
popup UI for configuration
enable/disable toggle
configurable reload delay
settings saved locally in Chrome
Project structure
ReloadYoutubeExtension/
├── manifest.json
├── content.js
├── popup.html
└── popup.js
How it works

The extension uses a Chrome content script that runs on YouTube watch pages.

When a video page is opened:

it checks whether the extension is enabled
it reads the configured reload delay
it determines whether the current video visit has already been reloaded
if not, it reloads the page once
it avoids entering an infinite reload loop

Because YouTube behaves like a single-page application, the script also watches for navigation changes so the reload logic still works when you move between videos without a full browser refresh.

Setup instructions

1. Create the project folder

Create a folder such as:

~/Developer/ChromeExtensions/ReloadYoutubeExtension 2. Add the project files

Place these files inside the folder:

manifest.json
content.js
popup.html
popup.js 3. Open Chrome extensions page

In Chrome, open:

chrome://extensions 4. Enable Developer mode

Turn on Developer mode using the toggle in the top-right corner.

5. Load the extension

Click Load unpacked and select your project folder:

ReloadYoutubeExtension 6. Start using it

Open any YouTube video page.
The extension will reload the page once based on your configured settings.

How to use
Click the extension icon in Chrome
Open the popup
Enable or disable the extension
Set the reload delay in milliseconds
Save your settings

Example:

1000 = reload after 1 second
2000 = reload after 2 seconds
Example use case

You open a YouTube video while using an ad blocker.

Without this extension:

the video may fail to load
you manually press refresh
the video then works

With this extension:

the page opens
the extension automatically reloads it once
the video loads without requiring manual refresh
Notes
This extension is intended as a practical workaround for YouTube loading issues related to ad blocker usage.
It is a lightweight personal utility project.
It is loaded as an unpacked Chrome extension during development.
If you change the source files, go to chrome://extensions and click Reload for the extension.
Future improvements

Possible future additions:

reload only on specific channels
reload only if the player fails to start
manual reload button in popup
whitelist or blacklist support
retry count controls
better detection for player failure states
