chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        config: initConfigDefine
    });
});