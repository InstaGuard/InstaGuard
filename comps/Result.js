import ResultHeader from "./ResultHeader";
import Gauge from "./Gauge";
import ProfileDetails from "./ProfileDetails";
import { useRouter } from "next/router";

const Result = ({ data }) => { // Destructuring directly in the function parameter
    const { 
      fakeUserScore: score, // Renaming fakeUserScore to score
      trueConditions: reasons, // Renaming trueConditions to reasons
      profilePicUrl: photo, // Renaming profilePicUrl to photo
      followersCount: followers, // Renaming followersCount to followers
      followsCount: follows, // Renaming followsCount to follows
      username // Keeping the username as is
    } = data;
  const router = useRouter();

  const handleBackToHome = () => {
    router.reload();
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