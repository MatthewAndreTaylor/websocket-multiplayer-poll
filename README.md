# Socket multiplayer polling in Python

This Python server uses Flask and WebSocket to handle real-time communication for a multiplayer polling. Players can send updates, and the server broadcasts them to all connected clients.

I have also included a NodeJS version of the app

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/MatthewAndreTaylor/websocket-multiplayer-poll.git
    cd websocket-multiplayer-poll/Flask
    ```

2. Create a virtual environment (optional but recommended):

    ```bash
    python -m venv venv
    source venv/bin/activate   # On Windows, use "venv\Scripts\activate"
    ```

3. Install the required packages:

    ```bash
    pip install -r requirements.txt
    ```

## Running the Server

Make sure your virtual environment is activated.

```bash
python app.py
