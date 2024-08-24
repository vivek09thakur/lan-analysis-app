import PropTypes from "prop-types";

function NetworkInterfaces({ networkInterfaces }) {
  NetworkInterfaces.propTypes = {
    networkInterfaces: PropTypes.object,
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-2">Network Interfaces</h2>
      {networkInterfaces && typeof networkInterfaces === "object" ? (
        Object.entries(networkInterfaces).map(([interfaceName, info]) => (
          <div key={interfaceName} className="mb-4">
            <h3 className="text-xl font-semibold">{interfaceName}</h3>
            {Array.isArray(info) ? (
              <ul>
                {info.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            ) : (
              <p>No details available for this interface</p>
            )}
          </div>
        ))
      ) : (
        <p>No network interfaces information available</p>
      )}
    </section>
  );
}

export default NetworkInterfaces;
