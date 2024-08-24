from flask import Flask, jsonify
from flask_cors import CORS
from Analyze.analyzer import get_connected_devices, ping_device, get_bandwidth, get_local_ip, get_public_ip, get_dns_servers, get_network_interfaces

app = Flask(__name__)
CORS(app)

@app.route('/api/network_info', methods=['GET'])
def get_network_info():
    try:
        devices = get_connected_devices()
        bandwidth = get_bandwidth()
        local_ip = get_local_ip()
        public_ip = get_public_ip()
        dns_servers = get_dns_servers()
        network_interfaces = get_network_interfaces()

        ping_results = {device: ping_device(device) for device in devices}

        return jsonify({
            'devices': devices,
            'bandwidth': bandwidth,
            'ping_results': ping_results,
            'local_ip': local_ip,
            'public_ip': public_ip,
            'dns_servers': dns_servers,
            'network_interfaces': network_interfaces
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == '__main__':
    app.run(debug=True)