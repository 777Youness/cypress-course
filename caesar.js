document.addEventListener('DOMContentLoaded', function() {
    const cipherKeyInput = document.getElementById('cipherKey');
    const inputText = document.getElementById('inputText');
    const cipherButton = document.getElementById('cipherButton');
    const outputText = document.getElementById('outputText');

    function caesarCipher(text, shift) {
        let result = '';
        shift = (shift % 26 + 26) % 26; // Normalize shift value

        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            if (char.match(/[a-z]/i)) {
                const code = text.charCodeAt(i);
                let shiftedCode;

                if ((code >= 65) && (code <= 90)) { // Uppercase letters
                    shiftedCode = ((code - 65 + shift) % 26 + 65);
                } else if ((code >= 97) && (code <= 122)) { // Lowercase letters
                    shiftedCode = ((code - 97 + shift) % 26 + 97);
                }
                char = String.fromCharCode(shiftedCode);
            }
            result += char;
        }
        return result;
    }

    cipherButton.addEventListener('click', function() {
        const key = parseInt(cipherKeyInput.value);
        const text = inputText.value;
        const cipheredText = caesarCipher(text, key);
        outputText.value = cipheredText;
    });
});