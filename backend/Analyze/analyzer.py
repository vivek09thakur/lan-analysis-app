import re
import subprocess
import psutil
import socket
import struct
import requests

def get_connected_devices():
    arp = subprocess.check_output("arp -a", shell=True).decode()
    ips = re.findall(r"\d+\.\d+\.\d+\.\d+", arp)

    return [ip for ip in ips if ip.startswith("192.168.")]

def ping_device(ip):
    try:
        output = subprocess.check_output(
            f"ping -n 4 {ip}", shell=True
        ).decode()

        packet_loss_match = re.search(r'(\d+)% loss', output)
        packet_loss = int(packet_loss_match.group(1)) if packet_loss_match else 0
        
        packets_received_match = re.search(r'Received = (\d+)', output)
        packets_received = int(packets_received_match.group(1)) if packets_received_match else 0
        
        return {
            "ip": ip,
            "packet_loss": packet_loss,
            "packets_received": packets_received,
            "status": "reachable" if packet_loss < 100 else "unreachable"
        }

    except subprocess.CalledProcessError:
        return {
            "ip": ip,
            "packet_loss": 100,
            "packets_received": 0,
            "status": "unreachable"
        }


def get_bandwidth():
    net_io = psutil.net_io_counters()
    return {
        "sent": f"{net_io.bytes_sent / (1024 * 1024):.2f} MB",
        "received": f"{net_io.bytes_recv / (1024 * 1024):.2f} MB"
    }

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except Exception as e:
        return f"Error getting local IP: {e}"

def get_public_ip():
    try:
        response = requests.get("https://api.ipify.org?format=json")
        public_ip = response.json()["ip"]
        return public_ip
    except requests.exceptions.RequestException as e:
        return f"Error getting public IP: {e}"

def get_dns_servers():
    try:
        with open("/etc/resolv.conf", "r") as file:
            lines = file.readlines()
        dns_servers = [line.split(" ")[1] for line in lines if line.startswith("nameserver")]
        return dns_servers
    except Exception as e:
        return f"Error getting DNS servers: {e}"

def get_network_interfaces():
    interfaces = psutil.net_if_addrs()
    interface_info = {}
    for interface, addrs in interfaces.items():
        interface_info[interface] = []
        for addr in addrs:
            if addr.family == socket.AF_INET:
                interface_info[interface].append(f"IPv4: {addr.address}")
            elif addr.family == socket.AF_INET6:
                interface_info[interface].append(f"IPv6: {addr.address}")
            elif addr.family == psutil.AF_LINK:
                interface_info[interface].append(f"MAC: {addr.address}")
    return interface_info


def total_internet_consumed():
    try:
        net_io = psutil.net_io_counters()
        return f"{net_io.bytes_sent / (1024 * 1024):.2f} MB"
    except Exception as e:
        return f"Error getting total internet consumed: {e}"
