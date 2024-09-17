function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}

function gcd(a, b) {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

function modInverse(a, m) {
    a = a % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return null; // Không tìm thấy
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

function validateAB(a, b) {
    return (a >= 0 && a <= 25) && (b >= 0 && b <= 25);
}

function encrypt() {
    const text = document.getElementById('inputTextEncrypt').value; // Keep original case
    const a = parseInt(document.getElementById('aEncrypt').value);
    const b = parseInt(document.getElementById('bEncrypt').value);
    const m = 26;

    if (!validateAB(a, b)) {
        alert('Giá trị a và b phải nằm trong khoảng từ 0 đến 25 (bao gồm 0 và 25).');
        return;
    }

    if (gcd(a, m) !== 1) {
        document.getElementById('resultEncrypt').value = text;
        document.getElementById('checkDecryptEncrypt').value = '';
        alert(`Giá trị a = ${a} không phải là số nguyên tố cùng nhau với 26. Văn bản không được mã hóa.`);
        return;
    }

    let result = '';

    for (let char of text) {
        if (char >= 'a' && char <= 'z') {
            const encryptedChar = String.fromCharCode(((a * (char.charCodeAt(0) - 'a'.charCodeAt(0)) + b) % m) + 'a'.charCodeAt(0));
            result += encryptedChar;
        } else if (char >= 'A' && char <= 'Z') {
            const encryptedChar = String.fromCharCode(((a * (char.charCodeAt(0) - 'A'.charCodeAt(0)) + b) % m) + 'A'.charCodeAt(0));
            result += encryptedChar;
        } else {
            result += char; // Giữ nguyên ký tự không phải chữ cái
        }
    }
    
    document.getElementById('resultEncrypt').value = result;
}

function decryptResult() {
    const result = document.getElementById('resultEncrypt').value;
    const a = parseInt(document.getElementById('aEncrypt').value);
    const b = parseInt(document.getElementById('bEncrypt').value);

    if (!validateAB(a, b)) {
        alert('Giá trị a và b phải nằm trong khoảng từ 0 đến 25 (bao gồm 0 và 25).');
        return;
    }

    if (gcd(a, 26) !== 1) {
        alert(`Không thể giải mã vì giá trị a = ${a} không phải là số nguyên tố cùng nhau với 26.`);
        return;
    }

    const m = 26;
    const a_inv = modInverse(a, m);
    let decryptedResult = '';

    for (let char of result) {
        if (char >= 'a' && char <= 'z') {
            const decryptedChar = String.fromCharCode(((a_inv * (char.charCodeAt(0) - 'a'.charCodeAt(0) - b + m)) % m + m) % m + 'a'.charCodeAt(0));
            decryptedResult += decryptedChar;
        } else if (char >= 'A' && char <= 'Z') {
            const decryptedChar = String.fromCharCode(((a_inv * (char.charCodeAt(0) - 'A'.charCodeAt(0) - b + m)) % m + m) % m + 'A'.charCodeAt(0));
            decryptedResult += decryptedChar;
        } else {
            decryptedResult += char; // Giữ nguyên ký tự không phải chữ cái
        }
    }

    document.getElementById('checkDecryptEncrypt').value = decryptedResult;
}

function encryptResult() {
    const text = document.getElementById('resultDecrypt').value; // Keep original case
    const a = parseInt(document.getElementById('aDecrypt').value);
    const b = parseInt(document.getElementById('bDecrypt').value);
    
    if (!validateAB(a, b)) {
        alert(`Giá trị a và b phải nằm trong khoảng từ 0 đến 25 (bao gồm 0 và 25).`);
        return;
    }

    if (gcd(a, 26) !== 1) {
        alert(`Không thể mã hóa lại vì giá trị a (${a}) không phải là số nguyên tố cùng nhau với 26.`);
        return;
    }

    let result = '';

    for (let char of text) {
        if (char >= 'a' && char <= 'z') {
            const encryptedChar = String.fromCharCode(((a * (char.charCodeAt(0) - 'a'.charCodeAt(0)) + b) % 26) + 'a'.charCodeAt(0));
            result += encryptedChar;
        } else if (char >= 'A' && char <= 'Z') {
            const encryptedChar = String.fromCharCode(((a * (char.charCodeAt(0) - 'A'.charCodeAt(0)) + b) % 26) + 'A'.charCodeAt(0));
            result += encryptedChar;
        } else {
            result += char; // Giữ nguyên ký tự không phải chữ cái
        }
    }

    document.getElementById('reEncryptResult').value = result; // Hiển thị kết quả mã hóa lại
}

function decrypt() {
    const text = document.getElementById('inputTextDecrypt').value; // Keep original case
    const a = parseInt(document.getElementById('aDecrypt').value);
    const b = parseInt(document.getElementById('bDecrypt').value);
    const m = 26;

    if (!validateAB(a, b)) {
        alert(`Giá trị a và b phải nằm trong khoảng từ 0 đến 25 (bao gồm 0 và 25).`);
        return;
    }

    if (gcd(a, m) !== 1) {
        document.getElementById('resultDecrypt').value = text; // Không giải mã, giữ nguyên văn bản
        alert(`Giá trị a (${a}) không phải là số nguyên tố cùng nhau với 26. Văn bản không được giải mã.`);
        return;
    }

    const a_inv = modInverse(a, m);
    let result = '';

    for (let char of text) {
        if (char >= 'a' && char <= 'z') {
            const decryptedChar = String.fromCharCode(((a_inv * (char.charCodeAt(0) - 'a'.charCodeAt(0) - b + m)) % m + m) % m + 'a'.charCodeAt(0));
            result += decryptedChar;
        } else if (char >= 'A' && char <= 'Z') {
            const decryptedChar = String.fromCharCode(((a_inv * (char.charCodeAt(0) - 'A'.charCodeAt(0) - b + m)) % m + m) % m + 'A'.charCodeAt(0));
            result += decryptedChar;
        } else {
            result += char; // Giữ nguyên ký tự không phải chữ cái
        }
    }
    document.getElementById('resultDecrypt').value = result;
}

function download(filename, text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}