export class Chat {

    get last10Messages() {
        return this.messages.slice(0, 10);
    }

    get usersArray() {
        return Object.values(this.users);
    }

    constructor() {
        this.messages = [];
        this.users = {};
    }


    sendMessage({ uid, name, message }) {
        this.messages.unshift({ uid, name, message });
    }

    connectUser(user) {
        this.users[user.id] = user;
    }

    disconnectUser(id) {
        delete this.users[id];
    }
}