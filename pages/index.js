import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import getScrapedData from "./algorithm/apify.js";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
  };
  const analyzeData = (scrapedData) => {
    if (!scrapedData || typeof scrapedData !== "object") {
      throw new Error("Invalid scraped data format");
    }
    if (scrapedData.hasOwnProperty("error")) {
      //throw new Error(scrapedData.error);
      setError(true);
      setErrorText(scrapedData.error);
    }
  };

  const checkIfIsError = (scrapedData) => {
    if (Array.isArray(scrapedData) && scrapedData.length > 0) {
      const firstObject = scrapedData[0];
      console.log(firstObject);
      if (firstObject.hasOwnProperty("error")) {
        //throw new Error(firstObject.error);
        setErrorInJson(true);
        setErrorText(firstObject.error);
      }
    }
  };

const handleClick = async () => {
  setLoading(true);
  try {
    const response = await fetch('/api/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      console.error('API request failed:', response.statusText);
      return;
    }

    const { success, result, error } = await response.json();

    if (success) {
      console.log(result); // Handle the result as needed
      checkIfIsError(result);
    } else {
      console.error('API request error:', error);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
    setUsername('');
  }
};
  return (
    <>
      <Head>
        <title>InstaGuard</title>
        <meta name="keywords" content="ninjas" />
      </Head>
      <div>
        <h1 className={styles.title}>Welcome to InstaGuard!</h1>
        <p className={styles.text1}>
          Did you know that approximately one in ten Instagram accounts is fake?
          That's around 200 million fake Instagram accounts! InstaGuard can help
          you determine whether an account is fake or not based on different
          criteria
        </p>
        <p className={styles.boldtext}>
          Unveil the percentage revealing the authenticity. 🕵️‍♀️✨
        </p>
        <div className="form-control">
          <input
            className="input input-alt"
            placeholder="Enter Instagram Username"
            required=""
            type="text"
            value={username}
            onChange={handleChange}
          />
          <span className="input-border input-border-alt"></span>
          <button onClick={handleClick}>Verify Profile</button>
        </div>
        {!errorInJson && loading && <div className="loader">
            <div className="loader-inner">
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
            </div>
          </div>}
          {errorInJson && (
          <div className="errorText">
            <h6>{errorText}</h6>
          </div>
        )}
        <h6 className={styles.safetytext}>Your safety online is our priority 🔒 </h6>
      </div>
    </>
  );
}
