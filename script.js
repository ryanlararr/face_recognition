const imageUpload = document.getElementById('imageUpload')

//Complete opperations asynchronously
Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'), //build and recognize faces; uses library in /models
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'), //detect where faces are; uses library in /models
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models') //determines what are faces; uses library in /models
]).then(start)

function start(){

    //creating a position relative element for a canvas to overlay over the image
    const container = document.createElement('div')
    container.style.position = 'relative'
    document.body.append(container)
    document.body.append('Loaded')

    imageUpload.addEventListener('change', async () => {
        const image = await faceapi.bufferToImage(imageUpload.files[0]) //await for asycnhronous operation; image will be a buffered image by faceapi from the first uploaded imagefile (only one at a time)
        container.append(image)
        const canvas = faceapi.createCanvasFromMedia(image) //creates an image from the image passed to it 
        container.append(canvas)
        const displaySize = { width: image.width, height: image.height}
        faceapi.matchDimensions(canvas, displaySize) //resize canvas to same size as the image
        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors() //detections will hold all faces detected in the image; detected faces willbe found and descriptors will be added
        
        document.body.append(detections.length) //show amount of detections found
        const resizedDetections = faceapi.resizeResults(detections, displaySize) //resize the boxes for detection to be the correct size based on size passed in -- scaled to image for canvas

        resizedDetections.forEach(detection => {
            const box = detection.detection.box
            const drawBox = new faceapi.draw.DrawBox(box, { label: 'Face' })
            drawBox.draw(canvas)
        });

    })
}


