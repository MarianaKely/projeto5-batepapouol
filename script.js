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


