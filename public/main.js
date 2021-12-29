const socket = io();

const totalUser = document.querySelector(".total-users");
const messagesContainer = document.querySelector(".messages-container");
const sendForm = document.querySelector(".send-form");
const nameForm = document.querySelector(".name-form");
const nameInput = document.querySelector(".name-input");
const messageInput = document.querySelector(".message-input");

socket.on("totalUsers",(data)=>{
  totalUser.innerText = `Users Connected: ${data}`;
})
sendForm.addEventListener('submit', (event)=>{
  event.preventDefault();
  const messageData={
    name:nameInput.value,
    message:messageInput.value,
    time: new Date().getHours() + ":" + new Date().getMinutes()
  }
  socket.emit("messageData",messageData);
  pushMessage(true,messageData);
  messageInput.value="";

  scrollToBottom(messagesContainer)
})
socket.on("othersMessage",(data)=>{
pushMessage(false,data);
})
function pushMessage(isOwn,data){
  const addHtml=`
  <div class="message ${isOwn?"right":"left"}">
    <p class="user-name">${data.name}</p>
    <p class="user-message">${data.message}</p>
    <p class="message-time">${data.time}</p>
  </div>
  `
  messagesContainer.innerHTML += addHtml;
}

const scrollToBottom = (element) => {
	element.scrollTop = element.scrollHeight;
}
