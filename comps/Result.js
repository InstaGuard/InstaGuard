import Head from "next/head";
import ResultHeader from "./ResultHeader";
import Gauge from "./Gauge";
import ProfileDetails from "./ProfileDetails";
import { useRouter } from "next/router";

const Result = (props) => {
  const { username, result_data } = props;
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
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
  );
}
 
export default Result;