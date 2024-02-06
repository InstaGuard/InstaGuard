import ResultHeader from "./ResultHeader";
import Gauge from "./Gauge";
import ProfileDetails from "./ProfileDetails";
import { useRouter } from "next/router";

const Result = (props) => {
  const { score,
          reasons,
          photo,
          followers,
          follows,
          username
        } = props;
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="center">
        <ResultHeader score={score} />
        <div className="flex-result">
          <Gauge score={score} />
          <ProfileDetails
            photo={photo}
            username={username}
            followers={followers}
            follows={follows}
          />
        </div>
        <button className="fullwidth" onClick={handleBackToHome}>
          Verify Another Profile
        </button>
      </div>
  );
}
 
export default Result;