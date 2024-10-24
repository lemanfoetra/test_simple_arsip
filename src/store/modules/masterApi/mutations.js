export default {
    resetApis(state) {
        state.apis = [];
    },
    addApiInFirst(state, payload) {
        state.apis.unshift(payload);
    },
    addApi(state, payload) {
        state.apis.push(payload);
    },
    deleteApi(state, payload) {
        const id = payload;
        const index = state.apis.findIndex(ex => ex.id === id);
        state.apis.splice(index, 1);
    },
    setApiShow(state, payload) {
        state.apiShow = payload;
    },
    setIdApiShow(state, payload) {
        state.idApishow = payload;
    },
    resetListMenu(state) {
        state.listMenus = [];
    },
    addListMenu(state, payload) {
        state.listMenus.push(payload);
    },
}