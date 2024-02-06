import Head from 'next/head';
import getScrapedData from './algorithm/apify';
import calculateFakeUserScore from './algorithm/calculator';

const fetchData = async (address, useJson) => {
  try {
    if (useJson) {
      return require(`../pages/algorithm/mock-data/${address}.json`);
    } else {
      
      const result = await getScrapedData(address);
      return JSON.parse(result);
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};

const About = ({ data, data2 }) => {
  const { fakeUserScore, trueConditions } = data.length > 0
    ? calculateFakeUserScore(data[0])
    : { fakeUserScore: 100, trueConditions: {} };
  const { fakeUserScore: fakeUserScore2, trueConditions: trueConditions2 } = data2.length > 0
    ? calculateFakeUserScore(data2[0])
    : { fakeUserScore: 100, trueConditions: {} };

  return (
    <>
      <Head>
        <title>Ninja List | About</title>
        <meta name="keywords" content="ninjas" />
      </Head>
      <div>
        {fakeUserScore}
      </div>

      <pre>
        {JSON.stringify(trueConditions, null, 2)}
      </pre>

      <div>
        {fakeUserScore2}
      </div>

      <pre>
        {JSON.stringify(trueConditions2, null, 2)}
      </pre>
    </>
  );
};
//examples of how to use with json and without json
About.getInitialProps = async () => {
  const [data, data2] = await Promise.all([
    fetchData('result1', true),
    fetchData('benjamin_netanyahu.il', false),
  ]);
  return { data, data2 };
};

export default About;