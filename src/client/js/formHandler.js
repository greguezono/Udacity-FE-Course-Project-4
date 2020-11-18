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
        body: JSON.stringify({'data': escape(data)})
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
        let text = getAnalysis(data)
        document.getElementById('results').innerHTML = text
        console.log("text: " + text)
    } catch (error) {
        console.log(error);
    }
}

function getAnalysis(data) {
    let confidence
    
    if (parseInt(data.confidence, 10) > 50) {
        confidence = 'confident'
    } else {
        confidence = 'unsure'
    }
    return `This quote is a ${data.subjectivity} and ${data.irony} quote. 
    Overall, the author seems ${confidence} about what he is portraying.`
}