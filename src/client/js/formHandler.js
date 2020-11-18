function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('quote').value
    Client.validateForm(formText)

    console.log("::: Form Submitted :::")
    postData(formText).then(updateUi())
}

export { handleSubmit }

async function postData(data) {
    let res = await fetch('/reqApi', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'data': data})
    });
}

async function updateUi() {
    let res = await fetch('/getUserData', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    try {
        let data = await res.json()
        console.log("Data: " + JSON.stringify(data))
    } catch (error) {
        console.log(error);
    }
}