export default {
    resetUser(context) {
        context.commit('resetUser');
    },
    addUserInFirst(context, user) {
        user.key = Math.floor(Math.random() * 100000);
        context.commit('addUserInFirst', user);
    },
    addUser(context, user) {
        user.key = Math.floor(Math.random() * 100000);
        context.commit('addUser', user);
    },
    deleteUser(context, userId) {
        context.commit('deleteUser', userId);
    },
    setUserShow(context, user) {
        user.key = Math.floor(Math.random() * 100000);
        context.commit('setUserShow', user);
    },
    setIdUserShow(context, idUserShow) {
        context.commit('setIdUserShow', idUserShow);
    },
}