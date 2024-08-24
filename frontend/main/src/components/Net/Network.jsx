import PropTypes from "prop-types";
import "./networkInterfaces.css";

function NetworkInterfaces({ networkInterfaces }) {
  NetworkInterfaces.propTypes = {
    networkInterfaces: PropTypes.object,
  };

  const parseDetail = (detail) => {
    if (detail.startsWith("MAC:")) return { label: "MAC Address", value: detail.replace("MAC:", "").trim() };
    if (detail.startsWith("IPv4:")) return { label: "IPv4 Address", value: detail.replace("IPv4:", "").trim() };
    if (detail.startsWith("IPv6:")) return { label: "IPv6 Address", value: detail.replace("IPv6:", "").trim() };
    return { label: "Detail", value: detail };
  };

  return (
    <section>
      <h2 className="section-title">Network Interfaces</h2>
      {networkInterfaces && typeof networkInterfaces === "object" ? (
        Object.entries(networkInterfaces).map(([interfaceName, info]) => (
          <div key={interfaceName} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{interfaceName}</h3>
            {Array.isArray(info) ? (
              <table className="interface-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {info.map((detail, index) => {
                    const parsedDetail = parseDetail(detail);
                    return (
                      <tr key={index}>
                        <td>{parsedDetail.label}</td>
                        <td>{parsedDetail.value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
