const video = document.getElementById("webcam");
const label = document.getElementById("label");

const labelThreeBtn = document.querySelector("#labelThree");

labelThreeBtn.addEventListener("click", () => classify());



// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);
// // Create a new classifier using those features and with a video element
const classifier = featureExtractor.classification(video, videoReady);


if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

//Extractor
// When the model is loaded
function modelLoaded() {
    featureExtractor.load("model/model.json");
}

// // Triggers when the video is ready
function videoReady() {
    console.log('The video is ready!');
}

// Get a prediction for that image
classifier.classify(document.getElementById('image'), (err, result) => {
    console.log(result); // Should output 'hamster or duck'
});


function classify() {
    classifier.classify(document.getElementById('webcam'), (err, result) => {
        console.log(result); // Should output 'Hamster'
        label.innerText = result[0].label + result[0].confidence ;
        speak (result[0].label);
    });
}

let synth = window.speechSynthesis

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}

speak("Welcome to hamster or duck in disguise, put a picture of a hamster or duck in front of the webcam and click on classifier!")



