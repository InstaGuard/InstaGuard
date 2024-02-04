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
      <div>
        <ResultHeader />
        <Gauge />
        <ProfileDetails />
        <button>Verify Another Profile</button>
      </div>
    </>
  )
}
