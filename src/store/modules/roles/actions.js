export default {
    resetRoles(context) {
        context.commit('resetRoles');
    },
    addRoleInFirst(context, role) {
        role.key = Math.floor(Math.random() * 100000);
        context.commit('addRoleInFirst', role);
    },
    addRole(context, role) {
        role.key = Math.floor(Math.random() * 100000);
        context.commit('addRole', role);
    },
    editRole(context, role) {
        role.key = Math.floor(Math.random() * 100000);
        context.commit('editRole', role);
    },
    deleteRole(context, roleId) {
        context.commit('deleteRole', roleId);
    },

    setRoleIdForCRUD(context, roleId) {
        context.commit('setRoleIdForCRUD', roleId);
    },

    setContextModalFormRole(context, ctx) {
        context.commit('setContextModalFormRole', ctx);
    },

    setRoleIdSelected(context, roles) {
        context.commit('setRoleIdSelected', roles);
    },

    resetRoleIdSelected(context) {
        context.commit('resetRoleIdSelected');
    },

    setRoleIdClickShow(context, roleId) {
        context.commit('setRoleIdClickShow', roleId);
    },

    // PENGELOLAA ROLE MENU
    resetRoleMenus(context) {
        context.commit('resetRoleMenus');
    },
    addRoleMenus(context, roleMenus) {
        roleMenus.key = Math.floor(Math.random() * 100000);
        context.commit('addRoleMenus', roleMenus);
    },
    deleteRoleMenu(context, roleMenuId) {
        context.commit('deleteRoleMenus', roleMenuId);
    },
    setRoleMenuIdForCRUD(context, roleMenuId) {
        context.commit('setRoleMenuIdForCRUD', roleMenuId);
    },
    setRoleMenuIdClickShow(context, roleMenuId) {
        context.commit('setRoleMenuIdClickShow', roleMenuId);
    },


    // PENGELOLAAN ROLE API
    resetRoleMenuApis(context) {
        context.commit('resetRoleMenuApis');
    },
    addRoleMenuApi(context, roleApi) {
        roleApi.key = Math.floor(Math.random() * 100000);
        context.commit('addRoleMenuApi', roleApi);
    },
}