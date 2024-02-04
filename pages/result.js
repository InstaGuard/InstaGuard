import Head from "next/head";
import ResultHeader from "../comps/ResultHeader";
import Gauge from "../comps/Gauge";
import ProfileDetails from "../comps/ProfileDetails";

export default function Result() {
  return (
    <>
      <Head>
        <title>InstaGuard Result</title>
      </Head>
      <div className="center">
        <ResultHeader />
        <div className="flex-result">
          <Gauge />
          <ProfileDetails />
        </div>
        <button className="fullwidth">Verify Another Profile</button>
      </div>
    </>
  )
}
