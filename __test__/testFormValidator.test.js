import {validateForm} from "../src/client/js/formValidator"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the validate form functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the validateForm() function", () => {
        expect(() => validateForm(null, null)).toThrow();
        expect(() => validateForm(null, "author")).toThrow();
        expect(() => validateForm("quote", null)).toThrow();
        expect(validateForm("quote", "author")).toBeUndefined();
    })
});