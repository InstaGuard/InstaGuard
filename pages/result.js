import Head from "next/head";
import ResultHeader from "../comps/ResultHeader";
import Gauge from "../comps/Gauge";
import ProfileDetails from "../comps/ProfileDetails";

export default function Result() {
  const score = 82;
  const username = "mock user";
  const followers = 1000;
  const follows = 400;
  const posts = 123;

  return (
    <>
      <Head>
        <title>InstaGuard Result</title>
      </Head>
      <div className="center">
        <ResultHeader 
          score={score}
        />
        <div className="flex-result">
          <Gauge 
            score={score}
          />
          <ProfileDetails 
            username={username}
            followers={followers}
            follows={follows}
            posts={posts}
          />
        </div>
        <button className="fullwidth">Verify Another Profile</button>
      </div>
    </>
  )
}
