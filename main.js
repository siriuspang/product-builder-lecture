const URL = "https://teachablemachine.withgoogle.com/models/57_063iBZ/";

let model, webcam, labelContainer, maxPredictions;
let isWebcamRunning = false;

// Theme Logic
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        // load the model and metadata
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Remove loading overlay
        document.getElementById('loading-overlay').style.display = 'none';

        // Setup label container
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
            const barContainer = document.createElement("div");
            barContainer.className = "prediction-bar-container";
            barContainer.innerHTML = `
                <div class="label-text">
                    <span class="class-name"></span>
                    <span class="class-percentage">0%</span>
                </div>
                <div class="bar-outer">
                    <div class="bar-inner" style="width: 0%"></div>
                </div>
            `;
            labelContainer.appendChild(barContainer);
        }
    } catch (error) {
        console.error("Error loading model:", error);
        alert("Failed to load the model. Please check the URL or your internet connection.");
    }
}

async function startWebcam() {
    if (isWebcamRunning) {
        stopWebcam();
        return;
    }

    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(400, 300, flip); 
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    isWebcamRunning = true;
    
    document.getElementById("start-webcam").textContent = "Stop Camera";
    document.getElementById("image-preview").style.display = 'none';
    document.getElementById("webcam-container").style.display = 'flex';
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    
    window.requestAnimationFrame(loop);
}

function stopWebcam() {
    if (webcam) {
        webcam.stop();
        document.getElementById("webcam-container").innerHTML = '';
        isWebcamRunning = false;
        document.getElementById("start-webcam").textContent = "Start Camera";
    }
}

async function loop() {
    if (!isWebcamRunning) return;
    webcam.update(); // update the webcam frame
    await predict(webcam.canvas);
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict(imageElement) {
    const prediction = await model.predict(imageElement);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className;
        const probability = (prediction[i].probability * 100).toFixed(0);
        
        const barContainer = labelContainer.childNodes[i];
        barContainer.querySelector('.class-name').textContent = classPrediction;
        barContainer.querySelector('.class-percentage').textContent = probability + "%";
        barContainer.querySelector('.bar-inner').style.width = probability + "%";
    }
}

// Image Upload Handling
const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');

imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        stopWebcam();
        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';
            document.getElementById("webcam-container").style.display = 'none';
            
            // Wait for image to load before predicting
            imagePreview.onload = () => predict(imagePreview);
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('start-webcam').addEventListener('click', startWebcam);

// Partnership Form Logic (Keep from previous version but adapted)
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
                alert('Oops! 제출 중 문제가 발생했습니다.');
            }
        } catch (error) {
            alert('Oops! 제출 중 문제가 발생했습니다.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// Initialize the app
init();
