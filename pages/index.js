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
        <h1 className={styles.title}>Welcome To InstaGuard</h1>
        <p className={styles.text}>
          Get started by entering an Instagram username below, and let us guide
          you through the journey of profile authenticity assessment. Discover
          the truth behind the username, and embark on a safer online adventure
          with InstaGuard.
        </p>
        <h6 className={styles.text}>Your safety online is our priority 🔒 </h6>
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
      </div>
    </>
  );
}
