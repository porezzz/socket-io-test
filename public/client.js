const socket = io();

let text;
const sendMessage = () => {
  text = document.querySelector("input").value;
  if (!text) {
    alert("nie mozna wyslac pustej wiadomosci");
  } else {
    socket.emit("message", text);
    document.querySelector("input").value = "";
  }
};
document.querySelector("button").addEventListener("click", () => {
  sendMessage();
});
window.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    sendMessage();
  }
});
const messages = document.querySelector("div");

socket.on("userMessage", (message) => {
  const item = document.createElement("p");
  item.textContent = `${message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
