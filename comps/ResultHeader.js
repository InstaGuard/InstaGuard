const ResultHeader = (props) => {
  const { score } = props;

    return ( 
      <div>
        <h1>This profile is {score}% fake!</h1>
        <p>Check out the details below to see why we gave this score, or verify another profile.</p>
      </div>
    );
}
 
export default ResultHeader;