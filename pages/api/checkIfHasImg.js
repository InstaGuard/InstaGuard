import axios from 'axios';
import { createHash } from 'crypto';
import { readFileSync } from 'fs';

// Function to calculate the hash of an image
function calculateImageHash(imageBuffer) {
  return createHash('sha256').update(imageBuffer).digest('hex');
}

// Function to compare two image hashes
function compareImageHashes(hash1, hash2, threshold = 5) {
  let distance = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] !== hash2[i]) {
      distance++;
    }
  }
  return distance <= threshold;
}

// Modified function to return a promise
export async function checkIfNoImg(externalImageUrl) {
  const localImagePath = 'noImg2.jpg';

  try {
    // Read local image file as a buffer
    const localImageBuffer = readFileSync(localImagePath);

    // Fetch external image
    const response = await axios.get(externalImageUrl, { responseType: 'arraybuffer' });

    // Process the external image buffer (response.data) here
    const externalImageBuffer = Buffer.from(response.data);

    // Compare local and external image buffers or perform other actions
    const localImageHash = calculateImageHash(localImageBuffer);
    const externalImageHash = calculateImageHash(externalImageBuffer);

    console.log('Local Image Hash:', localImageHash);
    console.log('External Image Hash:', externalImageHash);

    const similarity = compareImageHashes(localImageHash, externalImageHash);
    console.log('Image Similarity:', similarity);

    // Return the result
    return similarity;
  } catch (error) {
    // Handle the error...
    console.error('Error fetching or processing images:', error.message);
    throw error; // Re-throw the error for the caller to handle
  }
}


export default async function handler(req, res) {
 
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }
  const { url } = req.body;
  console.log(url);

  try {
    const result = await checkIfNoImg(url);
    console.log("result in check",result);
    return res.status(200).json({ success: true, result:result });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}