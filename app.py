from Analyze.analyzer import get_connected_devices, ping_device, get_bandwidth, get_network_speed
from time import sleep


def app():
    print('---- LAN ANALYZER CONSOLE ----\n\n')
    while True:
        try:
            # GET CONNECTED DEVICES
            devices = get_connected_devices()
            print(f"\n\\____ Connected Devices \n{'\n'.join(device for device in devices)}")
            # GET NETWORK SPEED
            print("\n\\____ Network Speed")
            network_speed = get_network_speed()
            print(f'-- Network Speed -- {network_speed}')
            print('\n\\____ Bandwidth')
            # GET BANDWIDTH
            bandwidth = get_bandwidth()
            print(f'-- Bandwidth -- {bandwidth}')
            # PING DEVICE
            print('\n\\____ Pinging Devices')
            for device in devices:
                ping = ping_device(device)
                print(f'-- ping device -- {device} -- {ping}%')
            sleep(10)
        except KeyboardInterrupt:
            print('CLOSING CONSOLE')
            break
        
        
if __name__ == '__main__':
    app()