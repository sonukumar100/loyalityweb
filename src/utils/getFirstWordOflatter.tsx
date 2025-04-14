/// GET FIRST WORD /////
export function getFirstLettersOfEachWord(str) {
    if (str?.length > 0) {
        let words = str.split(' ');

        // Initialize an empty string to store the first letters
        let firstLetters = '';

        // Iterate over each word and append its first letter to the result
        words.forEach(word => {
            if (word.length > 0) { // Ensure the word is not empty
                firstLetters += word.charAt(0); // Append the first letter of the word
            }
        });

        return firstLetters;
    }
    // Split the string into words

}