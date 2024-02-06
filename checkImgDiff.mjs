import axios from 'axios';
import fs from 'fs/promises';

const imageUrl = "https://scontent-atl3-2.cdninstagram.com/v/t51.2885-19/404918248_2228807410642010_246184158710733074_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-atl3-2.cdninstagram.com&_nc_cat=1&_nc_ohc=ljD7g2_e2iMAX-g9NXJ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBH5NqGl4PpGDjS20uboAX5-yDI_bdG03z-x9b9uIF4Lw&oe=65C65470&_nc_sid=8b3546";
const localImagePath = './noimg.jpg';

const downloadImage = async () => {
  try {
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

// Call the asynchronous function
downloadImage();
