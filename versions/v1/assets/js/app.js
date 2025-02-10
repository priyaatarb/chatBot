(() => {
  const form = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const bodyMessageWrapper = document.getElementById("chat-body-messages");
  const chatIcon = document.getElementById("chat-icon");
  const chatWrapper = document.getElementById("wrapper");
  const closeIcon = document.getElementById("close-icon");
 
 
  chatWrapper.style.display = "none";
 
 
  chatIcon.addEventListener("click", () => {
    chatWrapper.style.display = "block";
    chatIcon.style.display = "block";
  });
 
 
  closeIcon.addEventListener("click", () => {
    chatWrapper.style.display = "none";
    chatIcon.style.display = "block";
  });
 
 
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message !== "") {
      appendToMessageBody("user", message);
      chatInput.value = "";
      await sendMessageToServer(message);
    }
  });
 
 
  const appendToMessageBody = (role, txt) => {
    const row = document.createElement("div");
    const col = document.createElement("div");
    row.className = "row";
    col.classList = `col-12 chat-row ${role}-chat`;
 
    if (role === "bot") {
      col.innerHTML = `
                <div class="chat-avatar"></div>
                <div class="chat-text">${txt}</div>
            `;
    } else {
      col.innerHTML = `<div class="chat-text">${txt}</div>`;
    }
 
    row.appendChild(col);
    bodyMessageWrapper.appendChild(row);
    bodyMessageWrapper.scrollTop = bodyMessageWrapper.scrollHeight;
  };
 
 
  const sendMessageToServer = async (message) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
 
      if (response.ok) {
        const data = await response.json();
        appendToMessageBody("bot", data.reply);
      } else {
        appendToMessageBody(
          "bot",
          "Error: Unable to get response from server."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      appendToMessageBody("bot", "Error: Unable to connect to server.");
    }
  };
 
 
  appendToMessageBody("bot", "Hi, I am Thrylox. How can I help you?");
})();
 