import Head from "next/head";
import ResultHeader from "../comps/ResultHeader";
import Gauge from "../comps/Gauge";
import ProfileDetails from "../comps/ProfileDetails";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  // Here we need to implement getting the username from the homepage
  const username = "fakeuser123";

  const res = await fetch("http://localhost:3000/api/calc/" + username);
  const result_data = await res.json();
  return { props: { username, result_data } };
}

export default function Result({ username, result_data }) {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>InstaGuard Result</title>
      </Head>
      <div className="center">
        <ResultHeader score={result_data["score"]} />
        <div className="flex-result">
          <Gauge score={result_data["score"]} />
          <ProfileDetails
            photo={result_data["photo"]}
            username={username}
            followers={result_data["followers"]}
            follows={result_data["follows"]}
            posts={result_data["posts"]}
          />
        </div>
        <button className="fullwidth" onClick={handleBackToHome}>
          Verify Another Profile
        </button>
      </div>
    </>
  );
}
