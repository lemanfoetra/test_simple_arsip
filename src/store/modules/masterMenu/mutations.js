export default {
    resetListMenus(state) {
        state.menus = [];
    },
    addMenu(state, payload) {
        state.menus.push(payload);
    },
    deleteMenu(state, payload) {
        const id = payload;
        const index = state.menus.findIndex(ex => ex.id === id);
        state.menus.splice(index, 1);
    },
    setIdMenuShow(state, payload) {
        state.idMenusShow = payload;
    },

    resetMenusForForm(state) {
        state.menusForForm = [];
    },
    addMenusForForm(state, payload) {
        state.menusForForm.push(payload);
    },
}