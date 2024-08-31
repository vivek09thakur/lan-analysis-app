import { useState } from "react";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import PropTypes from "prop-types";
import "./networkInterfaces.css";

function NetworkInterfaces({ networkInterfaces }) {
  NetworkInterfaces.propTypes = {
    networkInterfaces: PropTypes.object,
  };

  const parseDetail = (detail) => {
    if (detail.startsWith("MAC:"))
      return { label: "MAC Address", value: detail.replace("MAC:", "").trim() };
    if (detail.startsWith("IPv4:"))
      return {
        label: "IPv4 Address",
        value: detail.replace("IPv4:", "").trim(),
      };
    if (detail.startsWith("IPv6:"))
      return {
        label: "IPv6 Address",
        value: detail.replace("IPv6:", "").trim(),
      };
    return { label: "Detail", value: detail };
  };

  const [expandedInterface, setExpandedInterface] = useState(null);

  return (
    <section>
      <h2 className="section-title">NETWORK INTERFACES</h2>
      <div className="interface-table">
        {networkInterfaces && typeof networkInterfaces === "object" ? (
          Object.entries(networkInterfaces).map(([interfaceName, info]) => (
            <div key={interfaceName} className="interface-box">
              <h3
                onClick={() =>
                  setExpandedInterface(
                    expandedInterface === interfaceName ? null : interfaceName
                  )
                }
              >
                {interfaceName}
                <span className="toggle-icon">
                  {expandedInterface === interfaceName ? (
                    <MdArrowDownward
                      style={{
                        fontSize: "1.3rem",
                        marginBottom: "-5px",
                        marginLeft: "5px",
                      }}
                    />
                  ) : (
                    <MdArrowUpward
                      style={{
                        fontSize: "1.3rem",
                        marginBottom: "-5px",
                        marginLeft: "5px",
                      }}
                    />
                  )}
                </span>
              </h3>
              {expandedInterface === interfaceName && Array.isArray(info) && (
                <div className="interface-details">
                  {info.map((detail, index) => {
                    const parsedDetail = parseDetail(detail);
                    return (
                      <p key={index}>
                        <strong>{parsedDetail.label}:</strong>{" "}
                        {parsedDetail.value}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No network interfaces information available</p>
        )}
      </div>
    </section>
  );
}

export default NetworkInterfaces;
