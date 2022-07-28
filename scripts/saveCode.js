// render popup modal
window.onload = renderPopup();

function renderPopup() {
    const modal = document.createElement("dialog");
    modal.className = 'popup-dialog'
    modal.innerHTML = `<iframe class="popup-iframe" id="popup-content"></iframe>
    <button class="close-btn"><img src=`+chrome.runtime.getURL("/images/icons/close.png")+`></button>`;
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
