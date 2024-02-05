require('dotenv').config();
const { ApifyClient } = require('apify-client');
const apifyToken = process.env.TOKEN;
// Initialize the ApifyClient with API token
const client = new ApifyClient({
  token: apifyToken,
});

const getScrapedData = async (username) => {
  console.log("username" + username);
  const url = `https://www.instagram.com/${username}/`;
  const input = {
    directUrls: [
      url, // Use the dynamically generated URL here
    ],
    resultsType: "details",
    resultsLimit: 200,
    addParentData: false,
    searchType: "hashtag",
    searchLimit: 1,
  };
  try {
    // Run the Actor and wait for it to finish
    const run = await client.actor("shu8hvrXbJbY3Eb9W").call(input);

    // Fetch Actor results from the run's dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    const resultsJSON = JSON.stringify(items, null, 2); // The '2' parameter is for indentation
    return resultsJSON;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }
  const { username } = req.body;

  try {
    const result = await getScrapedData(username);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}