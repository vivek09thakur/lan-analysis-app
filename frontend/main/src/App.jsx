import { useState, useEffect } from "react";
import axios from "axios";
import ConnectedDevices from "./components/Dash/ConnectedDevices/Devices";
import Bandwidth from "./components/Band/BandWidth";
import IPAddresses from "./components/Dash/IPs/IP";
import DNSServers from "./components/DNS/DNS";
import NetworkInterfaces from "./components/Net/Network";
import Usage from "./components/DataUsage/Usage";
import "./App.css";

function App() {
  const [networkInfo, setNetworkInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/network_info"
        );
        setNetworkInfo(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching network information");
        setLoading(false);
        console.error(error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 50000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading...This might take few seconds</div>;
  if (error) return <div>{error}</div>;
  if (!networkInfo) return <div>No data available</div>;

  return (
    <>
      <h1 className="app-name">LAN Analysis</h1>
      <div className="container">
        <ConnectedDevices
          devices={networkInfo.devices}
          pingResults={networkInfo.ping_results}
        />
        <Usage dataUsage={networkInfo.total_data_usage} />
        <Bandwidth bandwidth={networkInfo.bandwidth} />
        <NetworkInterfaces networkInterfaces={networkInfo.network_interfaces} />
        <IPAddresses
          localIp={networkInfo.local_ip}
          publicIp={networkInfo.public_ip}
        />
        <DNSServers dnsServers={networkInfo.dns_servers} />
      </div>
    </>
  );
}

export default App;
