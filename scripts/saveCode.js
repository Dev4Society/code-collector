// function to fill the form with code information recived
function updateFormInputs(code, title) {
    const inputCode = document.getElementById('codeSnippet')
    inputCode.innerHTML = code
    const inputTitle = document.getElementById('codeTitle')
    inputTitle.value = title
}

chrome.storage.sync.get(['code', 'title'], ({ code, title }) => {
    updateFormInputs(code, title)
});