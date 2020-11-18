function validateForm(quote, author) {
    if(!quote || !author) {
        alert("Please fill in the forms below")
        throw "No form specified"
    }
}

export { validateForm }
