/* api implementation - init */

const apilogin = "https://mock-api.driven.com.br/api/v6/uol/participants";
const apimessage = "https://mock-api.driven.com.br/api/v6/uol/messages";
const apistatus = "https://mock-api.driven.com.br/api/v6/uol/status";
const apimembers = "https://mock-api.driven.com.br/api/v6/uol/participants";

/* api implementation - end*/


/*room registration and entry - init*/

let userid = null;
const fetchmessages = 3;
const showstatus = 5;

function connectedinrealtime() {
  axios.post(apistatus, { name: userid });
}

function signinwithanaccount() {
  userid = prompt("Digite seu nome...");
  axios.post(apilogin, { name: userid }).then(function incomingmessage(returnmessage) {
      setInterval(connectedinrealtime, 1000 * showstatus);
      setInterval(chatpassthrough, 1000 * fetchmessages);
      return;
    })
    .catch(function (error) {
      alert("Nome indisponível");
      signinwithanaccount();
    });
}

signinwithanaccount();

/*room registration and entry - end*/

/*load messages from server - init*/

function chatpassthrough() {
  axios.get(apimessage).then(function captureincomingmessage(incomingmessage) {
    const conversation = document.querySelector(".conversation");
    const messageexchange = incomingmessage.data;
    conversation.innerHTML = messageexchange.map((textmessage) =>
      textmessage.type === "status"
          ? `<div class="conversationspace onlinespace" data-test="message" >
        <span class="clockspace">(${textmessage.time})</span>
        <span class="namespace">${textmessage.from} </span>${textmessage.text}
        </div>
        `
          : textmessage.type === "private_message" &&
            (textmessage.to === "Todos" || textmessage.to === userid || textmessage.from === userid)
          ? `<div class="conversationspace particularspace" data-test="message" >
          <span class="clockspace">(${textmessage.time}) </span>
          <span class="namespace">${textmessage.from} </span>
          reservadamente fala para <span class="namespace">${textmessage.to} </span>
          ${textmessage.text}
          </div>`
          : textmessage.type === "message"
          ? `<div class="conversationspace" data-test="message" >
          <span class="clockspace">(${textmessage.time})</span>
          <span class="namespace">${textmessage.from} </span>
          fala para <span class="namespace">${textmessage.to} </span>
          ${textmessage.text}
          </div>`
          : ""
      )
      .join("");
    const chatcontent = document.querySelectorAll(".conversationspace");
    chatcontent[chatcontent.length - 1].scrollIntoView();
  });
}

/*load messages from server - end*/

/* coordinate sending messages - init*/


let othermemberid = "Todos";
let privateconversation = false;

function tosendmessage(member, particular) {
  const chatmessage = document.querySelector(".textcamp input");
  const newmessage = chatmessage.value;
  if (newmessage && newmessage.length > 0) {
    const themessage = {
      from: userid,
      to: member,
      text: newmessage,
      type: particular ? "private_message" : "message",
    };
    axios.post(apimessage, themessage).then(function () {
        chatmessage.value = "";
        chatpassthrough();
      })
      .catch(function (error) {
        alert("Erro ao enviar a mensagem. Tente novamente mais tarde");
        window.location.reload();
      });
  }
}

function tosend() {
  tosendmessage(othermemberid, privateconversation);
}


/* coordinate sending messages - end*/
