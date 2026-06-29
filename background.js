const modifiedTabs = new Map();

function getPattern(url) {
    try {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.hostname}/*`;
    } catch (e) {
        return null; 
    }
}

function updateExtensionUI(tabId, url) {
    if (!url || url.startsWith('chrome://')) return;
    chrome.contentSettings.javascript.get({ primaryUrl: url }, (details) => {
        const isAllowed = details.setting === 'allow';
        chrome.action.setTitle({ 
            tabId: tabId, 
            title: `JS: ${isAllowed ? 'ON' : 'OFF'}` 
        }).catch(err => console.log(`Tab ${tabId} closed before title updated.`));
        chrome.action.setIcon({
            tabId: tabId, 
            path: isAllowed ? 'icons/1-48.png' : 'icons/2-48.png'
        }).catch(err => console.log(`Tab ${tabId} closed before icon updated.`));
    });
}

chrome.action.onClicked.addListener((tab) => {
    if (!tab.url || tab.url.startsWith('chrome://')) return;
    const pattern = getPattern(tab.url);
    if (!pattern) return;
    chrome.contentSettings.javascript.get({ primaryUrl: tab.url }, (details) => {
        const isCurrentlyAllowed = details.setting === 'allow';
        const newSetting = isCurrentlyAllowed ? 'block' : 'allow';
        chrome.contentSettings.javascript.set({ primaryPattern: pattern, setting: newSetting }, () => {
            console.log(`[JS Toggle]: JavaScript is now ${newSetting.toUpperCase()} for ${pattern}`);
            if (newSetting === 'block') {
                modifiedTabs.set(tab.id, pattern);
            } else {
                modifiedTabs.delete(tab.id);
            }
            chrome.tabs.reload(tab.id);
        });
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        updateExtensionUI(tabId, tab.url);
    }
});

chrome.tabs.onRemoved.addListener((tabId) => {
    if (modifiedTabs.has(tabId)) {
        const pattern = modifiedTabs.get(tabId);
        chrome.contentSettings.javascript.set({ primaryPattern: pattern, setting: 'allow' }, () => {
            console.log(`[JS Toggle]: Tab closed. Reset JavaScript to ALLOW for ${pattern}`);
        });
        modifiedTabs.delete(tabId);
    }
});
