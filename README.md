# Toggle JS
Toggles whether JavaScript is enabled or disabled by clicking the extension icon.

## Features:
* Toggles JavaScript off or on for the website it was toggled on
* Updates the extension icon to indicate current state 
* Automatically reloads page so changes apply
* Checks JavaScript state on startup and on reload

## Installation & Setup:
1. Clone or download this repository
   ```bash
   git clone https://github.com/min-minimum/ToggleJS.git
   ```
3. Open <chrome://extensions> in Chrome
4. Enable Developer Mode (top right)
5. Click Load unpacked and select the downloaded repository
6. Optionally pin the extension for easy access and click the extension icon to toggle

## Usage:
1. Click the Toggle JS icon in the toolbar.
2. The icon and badge will update to show if JS is ON or OFF.
3. All tabs will automatically reload to apply the new JS setting.

## Notes:
* Does not work on ``chrome://`` debug sites/internal pages or on "New Tab" as they cannot have JavaScript toggled or the page reloaded
* Requires the following Chrome permissions: ``tabs``, ``contentSettings``, ``activeTab``

## Development
Licensed with MIT
