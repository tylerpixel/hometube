const ws = new WebSocket('ws://localhost:8080');

ws.addEventListener('message', function(event) {
  if (event.data === 'updateUI') {
    // Code to update your UI here
  }
});