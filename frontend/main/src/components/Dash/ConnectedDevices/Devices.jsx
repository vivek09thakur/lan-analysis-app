import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import "./devices.css";

function ConnectedDevices({ devices, pingResults }) {
  const [availabilityData, setAvailabilityData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [borderColors, setBorderColors] = useState([]);

  const getColorByAvailability = (availability, opacity) =>
    availability === 100
      ? `rgba(75, 192, 192, ${opacity})`
      : `rgba(255, 99, 132, ${opacity})`;

  useEffect(() => {
    if (devices && Array.isArray(devices) && pingResults) {
      const getAvailability = (device) => {
        const pingResult = pingResults[device];
        return pingResult ? (pingResult.packets_received / 4) * 100 : 0;
      };

      const availability = devices.map(getAvailability);
      const backgroundColors = availability.map((avail) => getColorByAvailability(avail, 0.6));
      const borderColors = availability.map((avail) => getColorByAvailability(avail, 1));

      setAvailabilityData(availability);
      setBackgroundColors(backgroundColors);
      setBorderColors(borderColors);
      setLabels(devices);
    }
  }, [devices, pingResults]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Availability (%)",
        data: availabilityData,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="connected-devices">
      <h2 className="connected-devices__title">
        Connected Devices Availability
      </h2>
      <div className="connected-devices__chart">
        {devices && devices.length > 0 ? (
          <Bar data={data} />
        ) : (
          <p>No devices information available</p>
        )}
      </div>
    </section>
  );
}

ConnectedDevices.propTypes = {
  devices: PropTypes.array.isRequired,
  pingResults: PropTypes.object.isRequired,
};

export default ConnectedDevices;
