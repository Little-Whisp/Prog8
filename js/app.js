const video = document.getElementById("webcam");
const label = document.getElementById("label");

const labelOneBtn = document.querySelector("#Duck");
const labelTwoBtn = document.querySelector("#Hamster");
const labelThreeBtn = document.querySelector("#labelThree");
const trainbtn = document.querySelector("#train");

// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);


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

label.innerText = "Ready when you are!";


//Extractor
// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
    labelOneBtn.addEventListener("click", () => addDuck());
    labelTwoBtn.addEventListener("click", () => addHamster());
    labelThreeBtn.addEventListener("click", () => classify());
    trainbtn.addEventListener("click", () => train());
}


// Create a new classifier using those features and with a video element
const classifier = featureExtractor.classification(video, videoReady);

// // Triggers when the video is ready
function videoReady() {
    console.log('The video is ready!');
}

function addDuck() {
    classifier.addImage (video, 'duck');
    console.log('Duck');
}

function addHamster() {
    classifier.addImage (video, 'hamster');
    console.log('Hamster');
}

// // Retrain the network
function train() {
    classifier.train((lossValue) => {
        console.log('Loss is', lossValue)
    });
}

function classify() {
    classifier.classify(document.getElementById('webcam'), (err, result) => {
        console.log(result); // Should output 'dog'
        label.innerText = result[0].label + result[0].confidence ;
    });
}


const image = document.getElementById('output')
const fileButton = document.querySelector("#file")

fileButton.addEventListener("change", (event)=>{
    image.src = URL.createObjectURL(event.target.files[0])
})

image.addEventListener('load', () => userImageUploaded())

function userImageUploaded(){
    console.log("The image is now visible in the DOM")
}


