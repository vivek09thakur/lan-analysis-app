import re
import subprocess
import speedtest
import psutil

def get_connected_devices():
    # Get connected devices
    output = subprocess.check_output(
        "arp -a", 
        shell=True
    ).decode("utf-8")
    decode = re.findall(
        r'\b(?:\d{1,3}\.){3}\d{1,3}\b', 
    output)
    
    return decode

def ping_device(ip):
    try:
        output = subprocess.check_output(
            f"ping -n 4 {ip}", shell=True
        ).decode()
        packet_loss = re.search(r'(\d+)% loss', output)
        return 100 - int(packet_loss.group(1)) if packet_loss else 0
    except:
        return 0
    
def get_bandwidth():
    net_io = psutil.net_io_counters()
    return f"{net_io.bytes_sent / (1024 * 1024):.2f} MB sent, {net_io.bytes_recv / (1024 * 1024):.2f} MB received"


def get_network_speed():
    st = speedtest.Speedtest()
    download_speed = st.download() / 1_000_000  # Convert to Mbps
    upload_speed = st.upload() / 1_000_000  # Convert to Mbps
    return f"Download: {download_speed:.2f} Mbps, Upload: {upload_speed:.2f} Mbps"
