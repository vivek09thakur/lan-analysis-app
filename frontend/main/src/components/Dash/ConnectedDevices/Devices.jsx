import PropTypes from "prop-types";
import "./devices.css";

function ConnectedDevices({ devices, pingResults }) {
  ConnectedDevices.propTypes = {
    devices: PropTypes.array,
    pingResults: PropTypes.object,
  };
  return (
    <section className="devices">
      <h2 className="title">Connected Devices</h2>
      <div className="device-list">
        {devices && Array.isArray(devices) ? (
          <ul>
            {devices.map((device, index) => (
              <li key={index} className="mb-2">
                {device} - Ping: {pingResults && pingResults[device]}
              </li>
            ))}
          </ul>
        ) : (
          <p>No devices information available</p>
        )}
      </div>
    </section>
  );
}

export default ConnectedDevices;
