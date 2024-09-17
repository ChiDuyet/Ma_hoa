const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@_.";
let keyEncrypt = '';
let keyDecrypt = '';

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}

function generateKey(mode) {
    const key = characters.split('').sort(() => Math.random() - 0.5).join(''); // Hoán vị các ký tự
    if (mode === 'encrypt') {
        keyEncrypt = key; // Lưu key cho mã hóa
        document.getElementById('keyEncrypt').value = key; // Hiển thị key cho mã hóa
    } else {
        keyDecrypt = key; // Lưu key cho giải mã
        document.getElementById('keyDecrypt').value = key; // Hiển thị key cho giải mã
    }
}

function encrypt() {
    const text = document.getElementById('inputTextEncrypt').value;
    let result = '';
    for (let char of text) {
        const index = characters.indexOf(char);
        result += (index !== -1) ? keyEncrypt[index] : char; // Sử dụng key để mã hóa
    }
    document.getElementById('resultEncrypt').value = result;
    document.getElementById('checkDecryptEncrypt').value = result; // Hiển thị kết quả để kiểm tra
}

function decrypt() {
    const text = document.getElementById('inputTextDecrypt').value;
    let result = '';
    for (let char of text) {
        const index = keyDecrypt.indexOf(char);
        result += (index !== -1) ? characters[index] : char; // Sử dụng key để giải mã
    }
    document.getElementById('resultDecrypt').value = result;
    document.getElementById('checkEncryptDecrypt').value = result; // Hiển thị kết quả để kiểm tra
}

function decryptResult() {
    const text = document.getElementById('resultEncrypt').value;
    let result = '';
    for (let char of text) {
        const index = keyEncrypt.indexOf(char);
        result += (index !== -1) ? characters[index] : char; // Sử dụng key để giải mã
    }
    document.getElementById('checkDecryptEncrypt').value = result; // Hiển thị kết quả để kiểm tra
}

function encryptResult() {
    const text = document.getElementById('resultDecrypt').value;
    let result = '';
    for (let char of text) {
        const index = characters.indexOf(char); // Sử dụng keyEncrypt để mã hóa
        result += (index !== -1) ? keyDecrypt[index] : char; // Sử dụng key để mã hóa
    }
    document.getElementById('checkEncryptDecrypt').value = result; // Hiển thị kết quả để kiểm tra
}

function download(filename, text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Hàm đọc file từ input
function readFile(inputElement, callback) {
    const file = inputElement.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            callback(e.target.result);
        };
        reader.readAsText(file);
    }
}

// Thêm sự kiện cho input mã hóa
document.getElementById('fileInputEncrypt').addEventListener('change', function() {
    readFile(this, function(text) {
        document.getElementById('inputTextEncrypt').value = text; // Điền văn bản từ tệp vào ô nhập
    });
});

// Thêm sự kiện cho input giải mã
document.getElementById('fileInputDecrypt').addEventListener('change', function() {
    readFile(this, function(text) {
        document.getElementById('inputTextDecrypt').value = text; // Điền văn bản từ tệp vào ô nhập
    });
});