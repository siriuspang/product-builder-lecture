document.addEventListener('DOMContentLoaded', () => {
    const lottoContainer = document.getElementById('lotto-container');
    const generateBtn = document.getElementById('generate-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Theme Logic
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateToggleText(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleText(newTheme);
    });

    function updateToggleText(theme) {
        themeToggle.textContent = theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
    }

    // Lotto Logic
    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function displayNumbers(numbers) {
        lottoContainer.innerHTML = '';
        numbers.forEach(number => {
            const numberElement = document.createElement('div');
            numberElement.classList.add('lotto-number');
            numberElement.textContent = number;
            lottoContainer.appendChild(numberElement);
        });
    }

    generateBtn.addEventListener('click', () => {
        const lottoNumbers = generateLottoNumbers();
        displayNumbers(lottoNumbers);
    });

    // Initial generation
    const initialNumbers = generateLottoNumbers();
    displayNumbers(initialNumbers);

    // Partnership Form Logic
    const partnershipForm = document.getElementById('partnership-form');
    if (partnershipForm) {
        partnershipForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = '보내는 중...';

            const formData = new FormData(partnershipForm);
            
            try {
                const response = await fetch(partnershipForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('제휴 문의가 성공적으로 접수되었습니다. 감사합니다!');
                    partnershipForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('Oops! 제출 중 문제가 발생했습니다.');
                    }
                }
            } catch (error) {
                alert('Oops! 제출 중 문제가 발생했습니다.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
});
