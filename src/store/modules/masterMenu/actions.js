export default {
    resetListMenus(context) {
        context.commit('resetListMenus');
    },
    addMenu(context, menu) {
        menu.key = Math.floor(Math.random() * 100000);
        context.commit('addMenu', menu);
    },
    deleteMenu(context, menuId) {
        context.commit('deleteMenu', menuId);
    },
    setIdMenuShow(context, menuId) {
        context.commit('setIdMenuShow', menuId);
    },

    resetMenusForForm(context) {
        context.commit('resetMenusForForm');
    },
    addMenusForForm(context, menu) {
        menu.key = Math.floor(Math.random() * 100000);
        context.commit('addMenusForForm', menu);
    },
}