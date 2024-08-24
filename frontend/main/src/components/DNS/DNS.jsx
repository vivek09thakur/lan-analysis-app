import PropTypes from "prop-types";

function DNSServers({ dnsServers }) {
  DNSServers.propTypes = {
    dnsServers: PropTypes.array,
  };
  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">DNS Servers</h2>
      {dnsServers && Array.isArray(dnsServers) ? (
        <ul>
          {dnsServers.map((server, index) => (
            <li key={index}>{server}</li>
          ))}
        </ul>
      ) : (
        <p>No DNS servers information available</p>
      )}
    </section>
  );
}

export default DNSServers;
