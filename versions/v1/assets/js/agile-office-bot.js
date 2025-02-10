(() => {
    const imgSrc = "http://localhost:3000/v1/images/bots/default.webp";
    const openChatFrame = (e) => {
        e.currentTarget.style.display = "none";
        document.getElementById("agileoffice-chatbot-window").style.display = "block";
    }

    const closeChatFrame = (e) => {
        document.getElementById("agileoffice-chatbot-btn").style.display = "block";
        document.getElementById("agileoffice-chatbot-window").style.display = "none";
    }

    const chatBotIcon = () => {
        const botIcon = document.createElement('div');
        const botImg = document.createElement('img');
        botImg.src = imgSrc;
        botIcon.id="agileoffice-chatbot-btn";
        botIcon.appendChild(botImg);
        document.body.appendChild(botIcon);
        botIcon.style.width = `50px`;
        botIcon.style.height = `50px`;
        botIcon.style.border = `#eee 1px solid`;
        botIcon.style.backgroundColor = `#fff`;
        botIcon.style.borderRadius = `100%`;
        botIcon.style.overflow = `hidden`;
        botIcon.style.boxShadow = `1px 1px 5px rgba(0, 0, 0, 0.2)`;
        botIcon.style.padding = `10px`;
        botIcon.style.position = `fixed`;
        botIcon.style.bottom = `50px`;
        botIcon.style.right = `50px`;
        botIcon.style.zIndex = `99999999999999999`;
        botImg.style.width="100%";
        botIcon.addEventListener('click', openChatFrame);
    }
    const appendChatfrmae = () => {
        const wrapper = document.createElement('div');
        const iframe = document.createElement('iframe');
        iframe.src="http://localhost:3000/v1/";
        wrapper.id = "agileoffice-chatbot-window";
        wrapper.style.display = "none";
        wrapper.appendChild(iframe);
        document.body.appendChild(wrapper);
        wrapper.style.width = `420px`;
        wrapper.style.height = `calc(100vh - 100px)`;
        wrapper.style.border = `#eee 1px solid`;
        wrapper.style.backgroundColor = `#fff`;
        wrapper.style.borderTopLeftRadius = `2px`;
        wrapper.style.borderTopRightRadius = `2px`;
        wrapper.style.overflow = `hidden`;
        wrapper.style.boxShadow = `1px 1px 5px rgba(0, 0, 0, 0.2)`;
        wrapper.style.padding = `0px`;
        wrapper.style.position = `fixed`;
        wrapper.style.bottom = `0px`;
        wrapper.style.right = `50px`;
        wrapper.style.zIndex = `99999999999999999`;
        iframe.style.width="100%";
        iframe.style.height="100%";
        iframe.style.border="0px";
        // botIcon.addEventListener('click', openChatFrame);
    }
    chatBotIcon();
    appendChatfrmae();
    window.addEventListener('message', (ev) => {
        const obj = JSON.parse(ev.data);
        if (obj.action == "close") {
            closeChatFrame();
        }
    }, false);

})();