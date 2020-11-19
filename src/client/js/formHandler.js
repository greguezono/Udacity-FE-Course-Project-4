function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formQuote = document.getElementById('quote').value
    let formAuthor = document.getElementById('author').value
    try{
        Client.validateForm(formQuote, formAuthor)
    } catch (error) {
        alert("Please fill in the forms below")
        return
    }
    

    console.log("::: Form Submitted :::")
    postData(formQuote).then( function (userData) {
        updateUi(userData)
    })
}

async function postData(data) {
    try {
        let res = await fetch('/reqApi', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'data': escape(data)})
        });
        let resData = res.json()
        return resData
    } catch (error) {
        console.log(error)
    }
}

async function updateUi(userData) {
    let author = document.getElementById('author').value
    userData['author'] = author
    let text = getAnalysis(userData)
    document.getElementById('results').innerHTML = text
}

function getAnalysis(data) {
    let confidence
    if (data == null) {
        return 
    }
    if (parseInt(data.confidence, 10) > 50) {
        confidence = 'confident'
    } else {
        confidence = 'unsure'
    }
    var text = `Interesting quote by ${data.author}! <br>
    This quote is a ${data.irony} and ${data.subjectivity} quote. <br>
    Overall, the author seems ${confidence} about what he is conveying.`
    return text
}

export { handleSubmit }
export { getAnalysis }