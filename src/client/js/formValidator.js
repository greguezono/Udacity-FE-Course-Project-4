function validateForm(quote, author) {
    if(!quote || !author) {
        throw "No form specified"
    }
}

export { validateForm }
