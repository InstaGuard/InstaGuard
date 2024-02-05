require("dotenv").config();
const { ApifyClient } = require("apify-client");
const apifyToken = process.env.Token;
// Initialize the ApifyClient with API token
const client = new ApifyClient({
  token: apifyToken,
});

const getScrapedData = async (username) => {
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

    // Convert the results to JSON string
    const resultsJSON = JSON.stringify(items, null, 2); // The '2' parameter is for indentation
    return resultsJSON;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export default getScrapedData;
