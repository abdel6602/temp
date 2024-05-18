const express = require('express');
const { Storage } = require('@google-cloud/storage');

const app = express();

// Replace with your bucket name and credentials (if not using ADC)
const bucketName = "your-bucket-name";
const credentials = null; // Replace with service account credentials if needed

const storage = new Storage({ projectId: 'your-project-id', credentials }); // Adjust for your setup

async function downloadImage(imageName) {
  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(imageName);

    const [data] = await file.download();
    return data;
  } catch (error) {
    console.error(`Error downloading image: ${error}`);
    return null;
  }
}

app.get('/download/:imageId', async (req, res) => {
    const {imageId} = req.params.imageName;
    const imageName = `${imageId}.jpg`; // Adjust based on image format
    const imageData = await downloadImage(imageName);

  if (!imageData) {
    return res.status(404).send('Image not found');
  }

  res.setHeader('Content-Type', 'image/jpeg'); // Adjust based on image format
  res.send(imageData);
});

app.listen(3000, () => console.log('Server listening on port 3000'));
