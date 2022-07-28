(() => {

    // store DOM values in constants
    const preTagsArray = []
    const saveButtonsArray = []
    const preTags = document.querySelectorAll('pre')
    const pageTitle = document.title

    preTags.forEach((item, index) => {
        renderSaveButtons(item, index)
    })

    // display save buttons after every pre tag
    function renderSaveButtons(item, index) {
        const saveButton = document.createElement('button')
        saveButton.innerText = 'Save Code'
        saveButton.className = 'openModal'
        saveButton.id = index
        item.appendChild(saveButton)
        // add tags and buttons to their respective array
        preTagsArray.push(item)
        saveButtonsArray.push(saveButton)
    }

    // add event listener to every save button
    saveButtonsArray.forEach((saveButton, index) => {
        let code = preTagsArray[index].innerText
        saveButton.addEventListener("click", async () => {
            // send code info to background.js
            chrome.runtime.sendMessage({
                saveButtonIsClicked: true,
                code,
                pageTitle
            },
                (response) => {
                    console.log(response.status);
                }
            )
        })
    })

})();

