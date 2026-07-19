const header = document.querySelector("h1");
const text = header.textContent;

const chars = Array(text.length).fill(32);
let letter = 0;

header.textContent = chars.map(c => String.fromCharCode(c)).join("");

const timer = setInterval(() => {
    const target = text.charCodeAt(letter);

    if (chars[letter] < target) {
        chars[letter]++;
    } else {
        letter++;

        if (letter >= text.length) {
            clearInterval(timer);
        }
    }

    header.textContent = chars.map(c => String.fromCharCode(c)).join("");
}, 2);