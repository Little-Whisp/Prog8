const video = document.getElementById("webcam");
const label = document.getElementById("label");

const labelOneBtn = document.querySelector("#Duck");
const labelTwoBtn = document.querySelector("#Hamster");
const labelThreeBtn = document.querySelector("#labelThree");
const trainbtn = document.querySelector("#train");
const savebtn = document.querySelector("#save");


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

label.innerText = "Ready when you are!";

//Extractor
// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
    labelOneBtn.addEventListener("click", () => addDuck());
    labelTwoBtn.addEventListener("click", () => addHamster());
    labelThreeBtn.addEventListener("click", () => classify());
    savebtn.addEventListener("click", () => save());
    trainbtn.addEventListener("click", () => train());
}


// // Triggers when the video is ready
function videoReady() {
    console.log('The video is ready!');
}

// Add a new image with a label
function addDuck() {
    classifier.addImage (video, 'duck');
    console.log('Duck');
}

// Add a new image with a label
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

function save(){
    featureExtractor.save();
}

function load(){
    featureExtractor.load(filesOrPath = null, callback);
}


// Get a prediction for that image
classifier.classify(document.getElementById('image'), (err, result) => {
    console.log(result); // Should output 'hamster or duck'
});


function classify() {
    classifier.classify(document.getElementById('webcam'), (err, result) => {
        console.log(result); // Should output 'Hamster'
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




