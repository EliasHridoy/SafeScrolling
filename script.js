async function loadAndPredict() {
    // Load the BodyPix model
    const net = await bodyPix.load();

    // Get the image element
    const imgElement = document.getElementById('sourceImage');

    // Perform body segmentation
    const segmentation = await net.segmentPerson(imgElement);

    // Draw the segmentation result on a canvas
    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match the image
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;

    // Create an ImageData object to draw the segmentation
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Iterate over each pixel in the segmentation result
    for (let i = 0; i < segmentation.data.length; i++) {
        if (segmentation.data[i] === 1) { // If the pixel belongs to a person
            data[i * 4 + 0] = 0; // Red
            data[i * 4 + 1] = 0; // Green
            data[i * 4 + 2] = 0; // Blue
            data[i * 4 + 3] = 255; // Alpha (fully opaque)
        } else {
            data[i * 4 + 3] = 0; // Fully transparent
        }
    }

    // Put the modified ImageData back into the canvas
    ctx.putImageData(imageData, 0, 0);
}

// Call the function to load the model and perform segmentation
loadAndPredict();