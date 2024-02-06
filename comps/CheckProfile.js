import { useState } from "react";
import styles from "../styles/Home.module.css";

const CheckProfile = ({loading, handleClick, errorInJson}) => {
  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    
    setUsername(event.target.value);
  };
  

  return ( 
    <div>
        <h1 className={styles.title}>Welcome to InstaGuard!</h1>
        <p className={styles.text1}>
          Did you know that approximately one in ten Instagram accounts is fake?
          That's around 200 million fake Instagram accounts! InstaGuard can help
          you determine whether an account is fake or not based on different
          criteria
        </p>
        <p className={styles.boldtext}>
          Unveil the percentage revealing the authenticity. 🕵️‍♀️✨
        </p>
        <div className="form-control">
          <input
            className="input input-alt"
            placeholder="Enter Instagram Username"
            required=""
            type="text"
            value={username}
            onChange={handleChange}
          />
          <span className="input-border input-border-alt"></span>
          <button onClick={()=>handleClick(username)}>Verify Profile</button>
        </div>
        {!errorInJson && loading && <div className="loader">
            <div className="loader-inner">
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
            </div>
          </div>}
          {errorInJson && (
          <div className="errorText">
            <h6>{errorText}</h6>
          </div>
        )}
        <h6 className={styles.safetytext}>Your safety online is our priority 🔒 </h6>
      </div>
  );
}
 
export default CheckProfile;