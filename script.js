const imageUpload = document.getElementById('imageUpload')

//Complete opperations asynchronously
Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'), //build and recognize faces
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'), //detect where faces are
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models') //determines what are faces
]).then(start)

function start(){
    document.body.append('Loaded')
}


