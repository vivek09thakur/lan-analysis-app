import PropTypes from "prop-types";

function IPAddresses({ localIp, publicIp }) {
  IPAddresses.propTypes = {
    localIp: PropTypes.string,
    publicIp: PropTypes.string,
  };
  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">IP Addresses</h2>
      <p>Local IP: {localIp || "Not available"}</p>
      <p>Public IP: {publicIp || "Not available"}</p>
    </section>
  );
}

export default IPAddresses;
