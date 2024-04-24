const socket = new WebSocket(`ws://${location.host}/color_vote`);
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.votes) {
        updateVotes(data.votes);
    }
};

function vote(color) {
    socket.send(JSON.stringify({ color }));
}
function updateVotes(votes) {
    const votesCountElement = document.getElementById('votesCount');
    votesCountElement.innerHTML = '';

    for (const [color, count] of Object.entries(votes)) {
        const colorElement = document.createElement('div');
        colorElement.innerText = `${color}: ${count}`;
        votesCountElement.appendChild(colorElement);
    }
}
