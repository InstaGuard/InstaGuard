import axios from 'axios';
import fs from 'fs/promises';

const downloadImage = async (imageUrl, username) => {
  console.log("in download img");
  try {
    const localImagePath = './public/' + username + '.jpg';
    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'arraybuffer', // Set responseType to 'arraybuffer' for binary data
    });

    await fs.writeFile(localImagePath, response.data);

    console.log('Image downloaded successfully!');
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
      }
      const { url, username } = req.body;

      try {
        const result = await downloadImage(url, username);
        return res.status(200).json({ success: true, result });
      } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ success: false, error: error.message });
      }
}