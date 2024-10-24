export default {
    resetRoles(state) {
        state.roles = [];
    },
    addRoleInFirst(state, payload) {
        state.roles.unshift(payload);
    },
    addRole(state, payload) {
        state.roles.push(payload);
    },
    editRole(state, payload) {
        const id = payload.id;
        const data = payload;

        const roles = state.roles;
        const index = roles.findIndex(ex => ex.id === id);
        state.roles[index] = data;
    },
    deleteRole(state, payload) {
        const id = payload;
        const index = state.roles.findIndex(ex => ex.id === id);
        state.roles.splice(index, 1);
    },

    setRoleIdForCRUD(state, payload) {
        state.roleIdForCRUD = payload;
    },

    setContextModalFormRole(state, payload) {
        state.contextModalFormRole = payload;
    },

    setRoleIdSelected(state, payload) {
        state.roleIdSelected = payload;
    },

    resetRoleIdSelected(state) {
        state.roleIdSelected = [];
    },

    setRoleIdClickShow(state, payload) {
        state.roleIdClickShow = payload;
    },

    // PENGELOLAAN LIST MENU
    resetRoleMenus(state) {
        state.roleMenus = [];
    },
    addRoleMenus(state, payload) {
        state.roleMenus.push(payload);
    },
    deleteRoleMenus(state, payload) {
        const id = payload;
        const index = state.roles.findIndex(ex => ex.id === id);
        state.roleMenus.splice(index, 1);
    },
    setRoleMenuIdForCRUD(state, payload) {
        state.roleMenuIdForCRUD = payload;
    },
    setRoleMenuIdClickShow(state, payload) {
        state.roleMenuIdClickShow = payload;
    },

    // PENGELOLAAN LIST API
    resetRoleMenuApis(state) {
        state.roleMenuApis = [];
    },
    addRoleMenuApi(state, payload) {
        state.roleMenuApis.push(payload);
    },
}