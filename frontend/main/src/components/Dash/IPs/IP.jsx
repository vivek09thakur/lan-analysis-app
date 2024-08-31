import PropTypes from "prop-types";

function IPAddresses({ localIp, publicIp }) {
  IPAddresses.propTypes = {
    localIp: PropTypes.string,
    publicIp: PropTypes.string,
  };

  return (
    <section
    >
      <h2 >IP Addresses</h2>
      <p style={{opacity:'.7'}}>Local IP: {localIp || "Not available"} \ Public IP: {publicIp || "Not available"}</p>
    </section>
  );
}

export default IPAddresses;
