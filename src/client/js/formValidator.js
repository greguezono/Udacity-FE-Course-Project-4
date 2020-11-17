function validateForm(inputText) {
    console.log("::: Running formValidator :::", inputText);

    if(!inputText) {
        alert("Please enter a quote in the form below.")
    }
}

export { validateForm }
