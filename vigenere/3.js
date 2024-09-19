function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}

function loadFile(event, targetId) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById(targetId).value = e.target.result;
    };

    if (file) {
        reader.readAsText(file);
    }
}

function encrypt() {
    const text = document.getElementById('inputTextEncrypt').value;
    const key = document.getElementById('keyEncrypt').value.split(' ').map(Number);
    let result = '';
    let keyIndex = 0;

    for (let char of text) {
        if (char >= 'a' && char <= 'z') {
            const shift = key[keyIndex % key.length];
            const encryptedChar = String.fromCharCode(((char.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % 26) + 'a'.charCodeAt(0));
            result += encryptedChar;
            keyIndex++;
        } else if (char >= 'A' && char <= 'Z') {
            const shift = key[keyIndex % key.length];
            const encryptedChar = String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % 26) + 'A'.charCodeAt(0));
            result += encryptedChar;
            keyIndex++;
        } else {
            result += char; // Giữ nguyên ký tự không phải chữ cái
        }
    }

    document.getElementById('resultEncrypt').value = result;
}

function decrypt() {
    const text = document.getElementById('inputTextDecrypt').value;
    const key = document.getElementById('keyDecrypt').value.split(' ').map(Number);
    let result = '';
    let keyIndex = 0;

    for (let char of text) {
        if (char >= 'a' && char <= 'z') {
            const shift = key[keyIndex % key.length];
            const decryptedChar = String.fromCharCode(((char.charCodeAt(0) - 'a'.charCodeAt(0) - shift + 26) % 26) + 'a'.charCodeAt(0));
            result += decryptedChar;
            keyIndex++;
        } else if (char >= 'A' && char <= 'Z') {
            const shift = key[keyIndex % key.length];
            const decryptedChar = String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) - shift + 26) % 26) + 'A'.charCodeAt(0));
            result += decryptedChar;
            keyIndex++;
        } else {
            result += char; // Giữ nguyên ký tự không phải chữ cái
        }
    }

    document.getElementById('resultDecrypt').value = result;
}

function decryptFromResult() {
    const text = document.getElementById('resultEncrypt').value;
    const key = document.getElementById('keyEncrypt').value.split(' ').map(Number);
    let result = '';
    let keyIndex = 0;

    for (let char of text) {
        if (char >= 'a' && char <= 'z') {
            const shift = key[keyIndex % key.length];
            const decryptedChar = String.fromCharCode(((char.charCodeAt(0) - 'a'.charCodeAt(0) - shift + 26) % 26) + 'a'.charCodeAt(0));
            result += decryptedChar;
            keyIndex++;
        } else if (char >= 'A' && char <= 'Z') {
            const shift = key[keyIndex % key.length];
            const decryptedChar = String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) - shift + 26) % 26) + 'A'.charCodeAt(0));
            result += decryptedChar;
            keyIndex++;
        } else {
            result += char; // Giữ nguyên ký tự không phải chữ cái
        }
    }

    document.getElementById('resultDecryptFromEncrypt').value = result;
}

function encryptFromDecryptResult() {
    const text = document.getElementById('resultDecrypt').value;
    const key = document.getElementById('keyDecrypt').value.split(' ').map(Number);
    let result = '';
    let keyIndex = 0;

    for (let char of text) {
        if (char >= 'a' && char <= 'z') {
            const shift = key[keyIndex % key.length];
            const encryptedChar = String.fromCharCode(((char.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % 26) + 'a'.charCodeAt(0));
            result += encryptedChar;
            keyIndex++;
        } else if (char >= 'A' && char <= 'Z') {
            const shift = key[keyIndex % key.length];
            const encryptedChar = String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % 26) + 'A'.charCodeAt(0));
            result += encryptedChar;
            keyIndex++;
        } else {
            result += char; // Giữ nguyên ký tự không phải chữ cái
        }
    }

    document.getElementById('resultEncryptFromDecrypt').value = result;
}

function download(filename, text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}