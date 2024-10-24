export default {
    getRoles(state) {
        return state.roles;
    },

    getRoleIdForCRUD(state) {
        return state.roleIdForCRUD;
    },

    getContextModalFormRole(state) {
        return state.contextModalFormRole;
    },

    getRoleIdSelected(state) {
        return state.roleIdSelected;
    },

    // Jika role dipilih maka list roles dan list api akan me reload karena me (watch) func ini
    getRoleIdClickShow(state) {
        return state.roleIdClickShow;
    },

    // PENGELOLAAN ROLE MENU
    getRoleMenus(state) {
        return state.roleMenus;
    },
    getRoleMenuIdForCRUD(state) {
        return state.roleMenuIdForCRUD;
    },
    getRoleMenuIdClickShow(state) {
        return state.roleMenuIdClickShow;
    },

    // PENGELOLAAN ROLE API
    getRoleApis(state) {
        return state.roleMenuApis;
    },
}