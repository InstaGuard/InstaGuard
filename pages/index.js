import Head from "next/head";
import Link from "next/link";
import getScrapedData from "./algorithm/apify.js";
import calculateFakeUserScore from "./algorithm/calculator.js";;
import { useState } from "react";
import Result from "../comps/Result.js";
import CheckProfile from "../comps/CheckProfile.js";

export default function Home() {
  const [hasResult, setHasResult] = useState(false);
  const [ansCalculator,setAnsCalculator ] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorInJson, setErrorInJson] = useState(false);
  const [errorText, setErrorText] = useState("");
  

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

const handleClick = async (username) => {
  console.log("in handlee click")
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
      <CheckProfile loading={loading} 
       handleClick={handleClick} 
       errorInJson={errorInJson}

       />
    </>
  );
}

