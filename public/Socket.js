const socket = io();//connection establish

const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messages = document.getElementById('messages');

// Sending a message
sendBtn.addEventListener('click', () => {
  const message = messageInput.value.trim();//uneccesory space remove
  if (message) {
    const data = { sender: window.location.pathname, message };//sender path and msg
    console.log('Sending message:', data); // console print
    socket.emit('message', data); // Send message to server
    appendMessage(`You: ${message}`);//div me show karega
    messageInput.value = ''; // Clear input field
  } else {
    console.log('Message input is empty');
  }
});

// Receiving a message
socket.on('message', (data) => {//server se msg ko listen karta he aur data me path and msg he
  console.log('Received message:', data); // console print
  appendMessage(`${data.sender}: ${data.message}`);//sender ka name aur msg
});

// Function to display messages
function appendMessage(message) {
  const li = document.createElement('li');
  li.textContent = message;
  messages.appendChild(li);
}
