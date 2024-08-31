import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import "chart.js/auto";

const Usage = ({ dataUsage }) => {
  Usage.propTypes = {
    dataUsage: PropTypes.string,
  };

  const [chartData, setChartData] = useState({
    labels: ['Sent', 'Received'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
      borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    if (dataUsage) {
      const usageInMB = parseFloat(dataUsage);
      const sent = usageInMB / 2;
      const received = usageInMB / 2;

      setChartData({
        labels: ['Sent', 'Received'],
        datasets: [{
          data: [sent, received],
          backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)'],
          borderColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, .8)'],
          borderWidth: 1,
        }],
      });
    }
  }, [dataUsage]);

  const options = {
    cutout: '70%',
  };

  return (
    <div style={{maxWidth: '300px', margin: 'auto'}}>
      <h2>DATA USAGE</h2>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default Usage;