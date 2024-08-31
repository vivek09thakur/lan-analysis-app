import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import "chart.js/auto";

function Bandwidth({ bandwidth }) {
  Bandwidth.propTypes = {
    bandwidth: PropTypes.object,
  };

  const [dataPoints, setDataPoints] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (
      bandwidth &&
      bandwidth.sent !== undefined &&
      bandwidth.received !== undefined
    ) {
      // Convert bandwidth from MB to KB (optional)
      const sentKB = parseFloat(bandwidth.sent) * 1024;
      const receivedKB = parseFloat(bandwidth.received) * 1024;

      setDataPoints((prevData) => [
        ...prevData,
        { sent: sentKB, received: receivedKB },
      ]);

      const now = new Date().toLocaleTimeString();
      setLabels((prevLabels) => [...prevLabels, now]);
    }
  }, [bandwidth]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Data Sent (KB)",
        data: dataPoints.map((point) => point.sent),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Data Received (KB)",
        data: dataPoints.map((point) => point.received),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">BANDWIDTH</h2>
      {dataPoints.length > 0 ? (
        <Line data={data} />
      ) : (
        <p>No bandwidth information available</p>
      )}
    </section>
  );
}

export default Bandwidth;
