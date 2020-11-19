import { getAnalysis } from "../src/client/js/formHandler"

describe("Testing the analysis functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the getAnalysis() function", () => {
        let data = {"author": "author", "irony": "NONIRONIC", "confidence": "98"};
        let expectedText = `Interesting quote by ${data.author}! <br>
    This quote is a ${data.irony} and ${data.subjectivity} quote. <br>
    Overall, the author seems confident about what he is conveying.`
        expect(getAnalysis(null)).toBeUndefined();
        expect(getAnalysis(data)).toEqual(expectedText);
    })
});
