import Head from "next/head";
import ResultHeader from "../comps/ResultHeader";
import Gauge from "../comps/Gauge";

export default function Result() {
  return (
    <>
      <Head>
        <title>InstaGuard Result</title>
      </Head>
      <div>
        <ResultHeader />
        <Gauge />
        <button>Verify Another Profile</button>
      </div>
    </>
  )
}
