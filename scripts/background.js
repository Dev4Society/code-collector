// listen for messages sended from content scripts
chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.saveButtonIsClicked === true) {
    openModal()
    response({ status: "saving" })
  }
});

//function to open iframe in Modal
function openModal() {
  chrome.tabs.query({ //ask for tab infos
    currentWindow: true,
    active: true
  })
    .then(([tab]) => { //callback function to inject script into current tab
      chrome.scripting.executeScript({
        target: {
          tabId: tab.id
        },
        files: ["/scripts/saveCode.js"]
      });
    });
};