let UserName = "";
let stompClient = null;

let homepage = document.getElementsByTagName("main")[0];
let messagingpage = document.getElementById("message-page");
messagingpage.style.display = "none";

let message_send_area = document.getElementById("message-send-area");
let message_body = document.getElementById("message-body");
let login_input = document.getElementById("login-input");
let messagingpage_head = document.getElementById("head");
let messagebox = document.getElementById("messagebox");
let chat_message = document.getElementById("chat-message");
let sendbutton = document.getElementById("send-button");


function connect() {
    console.log("Attempting to connect to WebSocket");
    let socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
}

function onConnected() {
    console.log("Connected to WebSocket");
    homepage.classList.add('hidden');
    messagingpage.style.display = "flex";
    messagebox.autofocus = true;

    stompClient.subscribe('/topic/public', onMessageReceived);
    console.log("Subscribed to /topic/public");
    
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({name: UserName, type: 'JOIN'})
    );
    console.log("Sent JOIN message for user:", UserName);
}

function onError(error) {
    console.error('WebSocket connection error:', error);
    alert('Could not connect to WebSocket server. Please refresh this page to try again!');
}

function sendMessage() {
    let messageContent = messagebox.value.trim();
    if(messageContent && stompClient) {
        let chatMessage = {
            name: UserName,
            content: messageContent,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        console.log("Sent message:", chatMessage);
        messagebox.value = '';
    }
}

function onMessageReceived(payload) {
    console.log("Message received. Payload:", payload);

    try {
        let message = JSON.parse(payload.body);
        console.log("Parsed message:", message);

        let messageElement = document.createElement('li');

        if(message.type === 'JOIN') {
            messageElement.classList.add('event-message');
            messageElement.innerHTML = `<p>${message.name} has joined!</p>`;
        } else if (message.type === 'LEAVE') {
            messageElement.classList.add('exit-message');
            messageElement.innerHTML = `<p>${message.name} left!</p>`;
        } else {

            if (message.name === UserName) {
                messageElement.classList.add('my-message'); // Add your custom class
            }
            else{messageElement.classList.add('chat-message');}

            messageElement.innerHTML = `
                <span>${message.name}</span>
                <p>${message.content}</p>
            `;
        }

        message_body.appendChild(messageElement);

        message_body.scrollTop = message_body.scrollHeight;

    } catch (error) {
        console.error("Error processing received message:", error);
    }
}

function submitUsername(){
    let nameInput = document.getElementById("login-input");
    UserName = nameInput.value.trim();

    if (UserName === "") {
        UserName="Nikhil Gorasa";
    }

    messagingpage_head.innerHTML = `LetsChat, ${UserName}! Your conversation starts here.`;
    connect();
}
document.getElementById("enter-button").addEventListener("click", submitUsername);

login_input.addEventListener("keypress",function(event){
    if(event.key === "Enter"){
        submitUsername();
    }
})
sendbutton.addEventListener("click", sendMessage);

messagebox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

document.addEventListener("keydown", () => {
    messagebox.focus();
});