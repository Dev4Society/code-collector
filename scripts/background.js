
// listen for messages sended from content scripts
chrome.runtime.onMessage.addListener( async (message, sender, response) => {
  await chrome.storage.sync.set({ code: message.code });
  await chrome.storage.sync.set({ title: message.pageTitle });
  if (message.saveButtonIsClicked === true) {
    openModal()
    response({ status: "ok" })
  }
});

// function to render popup with a form to save code
function renderPopup() {

  const modal = document.createElement("dialog");
  modal.className = 'popup-dialog'
  modal.innerHTML = `<iframe class="popup-iframe" id="popup-content"></iframe>
  <button class="close-btn"><img src=`+ chrome.runtime.getURL("/images/icons/close.png") +` alt="close window"></button>`;
  document.body.appendChild(modal);
  const dialog = document.querySelector("dialog");
  dialog.showModal();

  const iframe = document.getElementById("popup-content");
  iframe.src = chrome.runtime.getURL("/pages/saveCode.html");
  iframe.frameBorder = 0;

  dialog.querySelector(".close-btn").addEventListener("click", () => {
  dialog.close();
  })
}

//function to open iframe
function openModal() {
  chrome.tabs.query({ //ask for tab infos
    currentWindow: true,
    active: true
  })
    .then(([tab]) => { //callback function to inject script into current tab
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: renderPopup,
      });
    });
};
