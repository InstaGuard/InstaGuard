const ResultHeader = () => {
  const fakeness_score = 82;

    return ( 
      <div>
        <h1>This profile is {fakeness_score}% fake!</h1>
        <p>Check out the details below to see why we gave this score, or verify another profile.</p>
      </div>
    );
}
 
export default ResultHeader;