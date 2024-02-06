import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import getScrapedData from "./algorithm/apify.js";
import calculateFakeUserScore from "./algorithm/calculator.js";;
import { useState } from "react";
import Result from "../comps/Result.js";
import Footer from "../comps/Footer.js";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [ansCalculator,setAnsCalculator ] = useState({});
  const [username, setUsername] = useState("");
  const [errorInJson, setErrorInJson] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
    setErrorInJson(false);
  };

  const checkIfUserExist = (scrapedData) => {
    const resultData = JSON.parse(scrapedData);
    const firstObject = resultData[0];
    console.log(firstObject);
    if (firstObject.hasOwnProperty("error")) {
        setErrorInJson(true);
        setErrorText("It seems that the Instagram username you provided does not exist :( Please check the username");
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
      checkIfUserExist(result);
      if (!errorInJson) {
        const resultData = JSON.parse(result);
        console.log(resultData);
        const ansCalculator=calculateFakeUserScore(resultData[0]);
        setAnsCalculator(ansCalculator);
        setHasResult(true);
      }

    } else {
      console.error('API request error:', error);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
    //setUsername('');
  }
};

  return hasResult ? <Result data={ansCalculator}/>: (
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
        <Footer />
      </div>
    </>
  );
}

