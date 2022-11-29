const url = 'http://localhost:3000/api/v1/auth';
let user = null;
let socket = null;

const inputUid = document.querySelector('#input-uid');
const inputMessage = document.querySelector('#input-message');
const userList = document.querySelector('#user-list');
const messageList = document.querySelector('#message-list');
const btnExist = document.querySelector('#btn-exit');


inputMessage.addEventListener('keyup', ({ keyCode }) => {
    if ( keyCode !== 13 ) return;

    const message = inputMessage.value.trim();
    const uid = inputUid.value;
    if ( message.length === 0 ) return;

    socket.emit('send-message', { message, uid });
    inputMessage.value = '';
});

async function main() {
    await validateJWT();
}

main();


async function validateJWT() {
    const token = localStorage.getItem('token') || '';
    if ( !token.length ) window.location = 'index.html';

    const response = await fetch(`${ url }`, {
        headers: {
            Authorization: token
        }
    });

    const { user: userDB, token: tokenDB } = await response.json();
    localStorage.setItem('token', tokenDB);
    user = userDB;
    document.title = user.name;
    connectSocket();
}

async function connectSocket() {
    socket = io({
        'extraHeaders': {
            Authorization: localStorage.getItem('token'),
        }
    });

    socket.on('connect', () => {
        console.log('Socket Online');
    });

    socket.on('disconnect', () => {
        console.log('Socket Ofline');
    });

    socket.on('receive-messages', drawMessages);
    socket.on('active-users', drawUsers);
    
    socket.on('private-message', (payload) => {
        console.log('Mensaje privado: ', payload);
    });
}

function drawUsers(users) {
    console.log(users);
    let HTMLUser = '';

    users.forEach(({ uid, name }) => {
        HTMLUser+= `
        <li>
            <p>
                <h5 class="text-success">${ name }</h5>
                <span class="fs-6 text-muted">${ uid }</span>
            </p>
        </li>
        `;
    });

    userList.innerHTML = HTMLUser;
}

function drawMessages(messages) {
    console.log(messages);
    let HTMLMessages = '';

    messages.forEach(({ name, message }) => {
        HTMLMessages+= `
        <li>
            <p>
                <span class="text-primary">${ name }</span>
                <span>${ message }</span>
            </p>
        </li>
        `;
    });

    messageList.innerHTML = HTMLMessages;
}