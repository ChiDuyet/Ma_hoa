const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@_.";
let inputTextEncrypt = '';
let inputTextDecrypt = '';
let fileNameEncrypt = '';
let fileNameDecrypt = '';

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}

function loadFile(event) {
    const file = event.target.files[0];
    fileNameEncrypt = file.name; // Lưu tên file
    const reader = new FileReader();
    reader.onload = function(e) {
        inputTextEncrypt = e.target.result; // Lưu nội dung file
        document.getElementById('inputTextEncrypt').value = inputTextEncrypt; // Hiện nội dung lên ô nhập
    };
    reader.readAsText(file);
}

function loadFileDecrypt(event) {
    const file = event.target.files[0];
    fileNameDecrypt = file.name; // Lưu tên file
    const reader = new FileReader();
    reader.onload = function(e) {
        inputTextDecrypt = e.target.result; // Lưu nội dung file
        document.getElementById('inputTextDecrypt').value = inputTextDecrypt; // Hiện nội dung lên ô nhập
    };
    reader.readAsText(file);
}

function encrypt() {
    const key = parseInt(document.getElementById('keyEncrypt').value) || 0; // Lấy giá trị key
    const text = document.getElementById('inputTextEncrypt').value || inputTextEncrypt; // Lấy văn bản nhập vào
    let result = '';
    for (let char of text) {
        const index = characters.indexOf(char);
        if (index !== -1) {
            result += characters[(index + key) % characters.length]; // Mã hóa với key
        } else {
            result += char; // Giữ nguyên ký tự không có trong bảng
        }
    }
    document.getElementById('resultEncrypt').value = result;

    // Hiển thị nút "Giải mã lại"
    document.getElementById('decryptFromEncrypt').style.display = 'block';
    document.getElementById('resultDecryptFromEncrypt').style.display = 'block';

    // Xóa file gốc nếu checkbox được chọn
    if (document.getElementById('deleteOriginalEncrypt').checked) {
        deleteFile(fileNameEncrypt);
    }
}

function decrypt() {
    const key = parseInt(document.getElementById('keyDecrypt').value) || 0; // Lấy giá trị key
    const text = document.getElementById('inputTextDecrypt').value || inputTextDecrypt; // Lấy văn bản nhập vào
    let result = '';
    for (let char of text) {
        const index = characters.indexOf(char);
        if (index !== -1) {
            result += characters[(index - key + characters.length) % characters.length]; // Giải mã với key
        } else {
            result += char; // Giữ nguyên ký tự không có trong bảng
        }
    }
    document.getElementById('resultDecrypt').value = result;

    // Hiển thị nút "Mã hóa lại"
    document.getElementById('encryptFromDecrypt').style.display = 'block';
    document.getElementById('resultEncryptFromDecrypt').style.display = 'block';

    // Xóa file gốc nếu checkbox được chọn
    if (document.getElementById('deleteOriginalDecrypt').checked) {
        deleteFile(fileNameDecrypt);
    }
}

function decryptFromEncrypt() {
    const key = parseInt(document.getElementById('keyEncrypt').value) || 0;
    const text = document.getElementById('resultEncrypt').value;
    let result = '';
    for (let char of text) {
        const index = characters.indexOf(char);
        if (index !== -1) {
            result += characters[(index - key + characters.length) % characters.length];
        } else {
            result += char;
        }
    }
    document.getElementById('resultDecryptFromEncrypt').value = result;
}

function encryptFromDecrypt() {
    const key = parseInt(document.getElementById('keyDecrypt').value) || 0;
    const text = document.getElementById('resultDecrypt').value;
    let result = '';
    for (let char of text) {
        const index = characters.indexOf(char);
        if (index !== -1) {
            result += characters[(index + key) % characters.length];
        } else {
            result += char;
        }
    }
    document.getElementById('resultEncryptFromDecrypt').value = result;
}

function deleteFile(fileName) {
    console.log('Đã xóa file: ${fileName}');
}

function download(filename, text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}