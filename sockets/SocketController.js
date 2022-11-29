import { checkJWT } from "../middlewares/index.js";
import { Chat } from "../models/Chat.js";


const chat = new Chat();

export async function socketController(socket, io) {
    const token = socket.handshake.headers.authorization;
    const user = await checkJWT(token);
    
    if ( !user )  return socket.disconnect();

    /** Agregar al usuario */
    chat.connectUser(user);

    /** Emitir a todo el mundo el evento de active-users */
    io.emit('active-users', chat.usersArray);
    socket.emit('receive-messages', chat.last10Messages);

    // Conectar a una sala especial
    socket.join(user.id); // Global, socket.id, user.id

    /** Eliminar los usuarios que se salen */
    socket.on('disconnect', () => chat.disconnectUser(user.id));

    /** Escuchar los mensajes enviados */
    socket.on('send-message', (payload) => {
        const data = {
            uid: user.id,
            name: user.name,
            message: payload.message
        };
         
        if ( payload.uid ) {
            // Mensaje privado
            socket.to(payload.uid).emit('private-message', {from: user.name, message: payload.message});
        } else {  
            // Mensaje para todo el mundo

            chat.sendMessage(data);
            io.emit('receive-messages', chat.last10Messages);
        }
    });
}