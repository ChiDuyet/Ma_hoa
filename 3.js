        function redirectToMethod() {
            const method = document.getElementById('method').value;
            if (method) {
                window.location.href = method;
            } else {
                alert('Vui lòng chọn một phương pháp mã hóa.');
            }
        }