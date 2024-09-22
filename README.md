# HariyaliKart Dashboard

HariyaliKart Dashboard is a web-based application designed to monitor and control soil moisture and temperature levels for agricultural purposes. The dashboard allows users to manually control relays and set conditions for automatic triggering based on sensor data.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time Monitoring:** View live sensor data including soil moisture and temperature.
- **Relay Control:** Manually switch relays on and off or set automatic triggers based on sensor thresholds.
- **User Authentication:** Secure login system for authorized access.
- **Responsive Design:** Works on both desktop and mobile devices.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Python](https://www.python.org/) (v3.7 or higher)
- [Flask](https://flask.palletsprojects.com/) (v2.x)
- [SQLite](https://www.sqlite.org/) (or another compatible database)
- [Git](https://git-scm.com/)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/nxtboi/hariyali.git
cd hariyalikart-dashboard
```

### 2. Set Up the Backend

1. **Create and Activate a Virtual Environment**

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

2. **Install Python Dependencies**

    ```bash
    pip install -r requirements.txt
    ```

3. **Set Up the Database**

    ```bash
    flask db init
    flask db migrate -m "Initial migration"
    flask db upgrade
    ```

### 3. Set Up the Frontend

1. **Navigate to the Frontend Directory**

    ```bash
    cd frontend
    ```

2. **Install Node.js Dependencies**

    ```bash
    npm install
    ```

## Running the Application

### 1. Run the Backend

From the `hariyalikart-dashboard` root directory:

```bash
flask run --debug
```

The backend will start on `http://localhost:5000`.

### 2. Run the Frontend

In a new terminal window, navigate to the `frontend` directory and run:

```bash
npm run dev
```

The frontend will start on `http://localhost:3000`.

## Project Structure

```
hariyalikart-dashboard/
│
├── backend/
│   ├── __init__.py
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── routes.py
│   ├── static/
│   └── templates/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── styles/
│
├── migrations/
├── venv/
├── .gitignore
├── requirements.txt
└── README.md
```

## API Endpoints

### User Authentication

- **POST /login:** User login
- **POST /logout:** User logout
- **POST /forgot-password:** Initiate password reset

### Sensor Data

- **GET /sensors:** Retrieve current sensor data
- **POST /set-parameters:** Set temperature and moisture thresholds

### Relay Control

- **POST /relay/on:** Turn relay on
- **POST /relay/off:** Turn relay off

## Usage

1. **Login** using your credentials.
2. **Monitor** real-time sensor data on the dashboard.
3. **Control** the relay manually or set conditions for automatic triggering.
4. **Set Parameters** for temperature and moisture thresholds using the control page.
