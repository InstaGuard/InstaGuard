import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>InstaGuard</title>
        <meta name="keywords" content="ninjas" />
      </Head>
      <div>
        <h1 className={styles.title}>Welcome to InstaGuard!</h1>
        <p className={styles.text1}>
        Did you know that approximately one in ten Instagram accounts is fake? That's around 200 million fake Instagram accounts! InstaGuard can help you determine whether an account is fake or not based on different criteria

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
          />
          <span className="input-border input-border-alt"></span>
          <button>Verify Profile</button>
        </div>
        <h6 className={styles.text}>Your safety online is our priority 🔒 </h6>
      </div>
    </>
  );
}
