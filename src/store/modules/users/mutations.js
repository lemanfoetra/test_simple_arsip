export default {
    resetUser(state) {
        state.users = [];
    },
    addUserInFirst(state, payload) {
        state.users.unshift(payload);
    },
    addUser(state, payload) {
        state.users.push(payload);
    },
    deleteUser(state, payload) {
        const id = payload;
        const index = state.users.findIndex(ex => ex.id === id);
        state.users.splice(index, 1);
    },
    setUserShow(state, payload) {
        state.userShow = payload;
    },
    setIdUserShow(state, payload) {
        state.idUserShow = payload;
    },
}