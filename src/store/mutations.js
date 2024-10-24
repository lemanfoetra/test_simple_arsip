export default {
    setToken(state, payload) {
        state.token = payload;
    },
    setUserId(state, payload) {
        state.user_id = payload;
    },
    setUserRole(state, payload) {
        state.user_role = payload;
    },
    setUserName(state, payload) {
        state.user_name = payload;
    },
    setUserEmail(state, payload) {
        state.user_email = payload;
    },


    resetMenu(state) {
        state.indexMenus = [];
    },
    addMenu(state, payload) {
        state.indexMenus.push(payload);
    },

    logout(state) {
        state.token = '';
        state.user_id = '';
        state.user_role = '';
        state.user_name = '';
        state.user_email = '';
        state.indexMenus = [];
    }
}