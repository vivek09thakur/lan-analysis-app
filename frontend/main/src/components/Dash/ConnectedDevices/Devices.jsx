import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import "./devices.css";

function ConnectedDevices({ devices, pingResults }) {
  ConnectedDevices.propTypes = {
    devices: PropTypes.array,
    pingResults: PropTypes.object,
  };

  const [pingData, setPingData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (devices && Array.isArray(devices) && pingResults) {
      const pings = devices.map((device) => {
        const pingResult = pingResults[device];
        const packetLossMatch = pingResult.match(/Packet loss: (\d+)%/);
        const packetLoss = packetLossMatch ? parseInt(packetLossMatch[1]) : 100;

        return packetLoss;
      });

      const backgroundColors = pings.map((loss) =>
        loss === 0 ? "rgba(75, 192, 192, 0.6)" : "rgba(255, 99, 132, 0.6)"
      );
      const borderColors = pings.map((loss) =>
        loss === 0 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)"
      );

      setPingData(pings.map((loss) => (loss === 0 ? 100 : loss)));
      setColors({ backgroundColors, borderColors });
      setLabels(devices);
    }
  }, [devices, pingResults]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Packet Loss/Availability (%)",
        data: pingData,
        backgroundColor: colors.backgroundColors,
        borderColor: colors.borderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="devices">
      <h2 className="title">Connected Devices</h2>
      <div className="device-list">
        {devices && devices.length > 0 ? (
          <Bar data={data} />
        ) : (
          <p>No devices information available</p>
        )}
      </div>
    </section>
  );
}

export default ConnectedDevices;
