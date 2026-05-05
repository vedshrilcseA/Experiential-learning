function getCurrentLanguage() {
    const title = document.querySelector('h1')?.innerText || '';

    if (title.includes('Korean')) return 'ko';
    if (title.includes('French')) return 'fr';
    if (title.includes('Spanish')) return 'es';
    if (title.includes('Japanese')) return 'ja';

    return 'es';
}

function getSpeechLanguage() {
    const title = document.querySelector('h1')?.innerText || '';

    if (title.includes('Korean')) return 'ko-KR';
    if (title.includes('French')) return 'fr-FR';
    if (title.includes('Spanish')) return 'es-ES';
    if (title.includes('Japanese')) return 'ja-JP';

    return 'es-ES';
}

let translatedWord = "";
let speechLang = "";

function translateText() {
    let text = document.getElementById("inputText").value;
    let output = document.getElementById("output");
    let frontText = document.getElementById("frontText");

    if (frontText) {
        frontText.innerText = text;
    }

    if (!text.trim()) {
        output.innerText = "Please enter a word to translate.";
        return;
    }

    let currentLang = getCurrentLanguage();
    speechLang = getSpeechLanguage();

    let url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${currentLang}`;

    output.innerText = "Translating...";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            translatedWord = data.responseData.translatedText;

            output.innerHTML = `
                <strong>Translation:</strong><br>
                ${translatedWord}
                <br><br>
                <button onclick="speakTranslation()">🔊 Speak</button>
            `;
        })
        .catch(error => {
            output.innerText = "Translation error! Please try again.";
            console.log(error);
        });
}

function speakTranslation() {
    if (translatedWord === "") {
        alert("Please translate a word first.");
        return;
    }

    let speech = new SpeechSynthesisUtterance();

    speech.text = translatedWord;
    speech.lang = speechLang;
    speech.rate = 0.8;
    speech.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}

document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById("inputText");

    if (inputField) {
        inputField.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                translateText();
            }
        });
    }
});