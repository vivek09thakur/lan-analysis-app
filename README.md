# LAN Analysis

## Introduction

A python based command line script that enables the user to analyze the devices connected to the local network.The script tested on Windows Machine with Python 3.12.3 version were the Windows machine is used as a host and the other devices are connected to the same network.

## Getting Started

- Fork the repository and clone it to your local machine.

```bash
   git clone <forked-repo-url>
```

- Change the directory to the cloned repository.

```bash
   cd lan-analysis-backend
```

### Run Backend

- Change to backend directory.

```bash
   cd backend
```

- Create virtual environment.

```bash
   python -m venv venv
```

- Activate the virtual environment.

```bash
   .\venv\Scripts\activate
```

- Install the dependencies.

```bash
   pip install -r requirements.txt
```

- Run Flask server.

```bash
   python app.py
```

- Or Run command line script.

```bash
   python cli.py
```

### Run Frontend

- Now open another terminal and change the directory to frontend.

```bash
   cd frontend
```

- Navigate to `frontend\main` directory.

```bash
   cd main
```

- Install the dependencies.

```bash
   npm install
```

- Run the React server.

```bash
   npm run dev
```
