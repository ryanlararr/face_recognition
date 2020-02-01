const imageUpload = document.getElementById('imageUpload')

//Complete opperations asynchronously
Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'), //build and recognize faces; uses library in /models
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'), //detect where faces are; uses library in /models
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models') //determines what are faces; uses library in /models
]).then(start)

function start(){
    document.body.append('Loaded')
    imageUpload.addEventListener('change', async () => {
        const image = await faceapi.bufferToImage(imageUpload.files[0]) //await for asycnhronous operation; image will be a buffered image by faceapi from the first uploaded imagefile (only one at a time)
        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors() //detections will hold all facves detected in the image; detected faces willbe found and descriptors will be added
        document.body.append(detections.length) //show amount of detections found
    })
}


