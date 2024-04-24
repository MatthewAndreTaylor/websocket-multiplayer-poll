from flask import Flask, render_template
from flask_sock import Sock
from simple_websocket import ConnectionClosed
import json

app = Flask(__name__)
sock = Sock(app)

votes = {'red': 0, 'blue': 0, 'purple': 0, 'green': 0}
clients = set()


voted_clients = set()

@app.route('/', methods=['GET',"POST"])
def home():
    return render_template("index.html")

@sock.route('/color_vote')
def echo(connection):
    if connection not in clients:
        clients.add(connection)
        connection.send(json.dumps({'votes': votes}))
        print(f"Added connection {connection}")

    while True:
        try:
            event = connection.receive()
            data = json.loads(event)

            if connection not in voted_clients:
                color = data.get('color')

                if color in votes:
                    votes[color] += 1
                    voted_clients.add(connection)
                    send_to_all_clients({'votes': votes})
                    print(f"Vote for {color}: {votes[color]}")

        except (ConnectionError, ConnectionClosed):
            clients.remove(connection)
            print(f"Remove connection {connection}")
            break

def send_to_all_clients(message):
    for client in clients:
        client.send(json.dumps(message))

if __name__ == "__main__":
    app.run()
