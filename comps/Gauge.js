import dynamic from "next/dynamic";
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

const Gauge = (props) => {
  const { score } = props;

    return ( 
      <div className="gauge">
        <h2>Fake-O-Meter</h2>
        <GaugeComponent
          arc={{
            subArcs: [
              {
                limit: 40,
                color: '#5BE12C',
                showTick: true
              },
              {
                limit: 60,
                color: '#FCAF45',
                showTick: true
              },
              {
                limit: 100,
                color: '#FD1D1D',
                showTick: true
              },
            ]
          }}
          value={score}
        />
      </div>
     );
}
 
export default Gauge;