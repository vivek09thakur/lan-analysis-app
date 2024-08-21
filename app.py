from Analyze.analyzer import get_connected_devices, ping_device, get_bandwidth, get_local_ip, get_public_ip, get_dns_servers, get_network_interfaces
from time import sleep
import os

def app():
    print('''
██╗░░░░░░█████╗░███╗░░██╗  ░█████╗░███╗░░██╗░█████╗░██╗░░░░░██╗░░░██╗░██████╗██╗░██████╗
██║░░░░░██╔══██╗████╗░██║  ██╔══██╗████╗░██║██╔══██╗██║░░░░░╚██╗░██╔╝██╔════╝██║██╔════╝
██║░░░░░███████║██╔██╗██║  ███████║██╔██╗██║███████║██║░░░░░░╚████╔╝░╚█████╗░██║╚█████╗░
██║░░░░░██╔══██║██║╚████║  ██╔══██║██║╚████║██╔══██║██║░░░░░░░╚██╔╝░░░╚═══██╗██║░╚═══██╗
███████╗██║░░██║██║░╚███║  ██║░░██║██║░╚███║██║░░██║███████╗░░░██║░░░██████╔╝██║██████╔╝
╚══════╝╚═╝░░╚═╝╚═╝░░╚══╝  ╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝╚══════╝░░░╚═╝░░░╚═════╝░╚═╝╚═════╝░\n\n''')
    while True:
        try:
            # GET CONNECTED DEVICES
            devices = get_connected_devices()
            print(f"\n\\____ Connected Devices \n{'\n'.join(device for device in devices)}")

            # GET BANDWIDTH
            print('\n\\____ Bandwidth')
            bandwidth = get_bandwidth()
            print(f'-- Bandwidth -- {bandwidth}')

            # PING DEVICE
            print('\n\\____ Pinging Devices')
            for device in devices:
                ping = ping_device(device)
                print(f'-- ping device -- {device} -- {ping}')

            # GET LOCAL IP
            print('\n\\____ Local IP')
            local_ip = get_local_ip()
            print(f'-- Local IP -- {local_ip}')

            # GET PUBLIC IP
            print('\n\\____ Public IP')
            public_ip = get_public_ip()
            print(f'-- Public IP -- {public_ip}')

            # GET DNS SERVERS
            print('\n\\____ DNS Servers')
            dns_servers = get_dns_servers()
            print(f'-- DNS Servers -- {dns_servers}')

            # GET NETWORK INTERFACES
            print('\n\\____ Network Interfaces')
            network_interfaces = get_network_interfaces()
            for interface, info in network_interfaces.items():
                print(f'-- Interface: {interface}')
                for detail in info:
                    print(f'   {detail}')

            sleep(10)
        except KeyboardInterrupt:
            print('CLOSING CONSOLE')
            break

if __name__ == '__main__':
    os.system('cls')
    os.system('color a')
    app()
